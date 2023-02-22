import { ListHeader, Text } from '@dudoong/ui';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import type {
  UpdateEventDetailRequest,
  ImageUrlResponse,
} from '@lib/apis/event/eventType';
import EventApi from '@lib/apis/event/EventApi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import getImageExtension from '@lib/utils/getImageExtension';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import chart from '@toast-ui/editor-plugin-chart';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import uml from '@toast-ui/editor-plugin-uml';
import { HookCallback } from '@toast-ui/editor/types/editor';
import '@toast-ui/editor/dist/i18n/ko-kr';

interface EventDetailInfoProps {
  content: string;
  setForm: Dispatch<SetStateAction<UpdateEventDetailRequest>>;
  eventId: string;
}

const EventDetailInfo = ({
  content,
  setForm,
  eventId,
}: EventDetailInfoProps) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
    ['scrollSync'],
  ];
  const editorRef = useRef<Editor>(null);

  // presigned 발급 api
  const postEventImageMutation = useMutation(EventApi.POST_EVENT_IMAGE, {
    onSuccess: async (data: ImageUrlResponse) => {
      console.log('postHostImageMutation : ', data);
    },
  });

  // editor image upload handler
  const uploadImageHandler = async (image: any, callback: HookCallback) => {
    postEventImageMutation.mutate(
      {
        eventId: eventId,
        imageFileExtension: getImageExtension(image.type),
      },
      {
        onSuccess: async (data: ImageUrlResponse) => {
          console.log('editor image upload: ', data, image);
          await axios.put(data.presignedUrl, image, {
            headers: {
              'Content-Type': image!.type,
            },
            baseURL: '',
          });
          callback(data.url, image.name);
        },
      },
    );
  };

  // 입력값 onChangeHandler
  const onChange = () => {
    if (editorRef.current)
      setForm((prev) => {
        return {
          ...prev,
          content: editorRef.current!.getInstance().getHTML(),
        };
      });
    console.log(editorRef.current!.getInstance().getHTML());
  };

  return (
    <div>
      <ListHeader
        title={'공연 상세 내용'}
        size={'listHeader_18'}
        padding={[56, 0, 12, 0]}
        description={<TitleDescription />}
      />
      <EditorWrapper>
        {content && (
          <Editor
            ref={editorRef}
            onChange={onChange}
            placeholder="공연 상세 내용을 입력해주세요."
            previewStyle="vertical" // 미리보기 스타일 지정
            initialValue={content}
            hideModeSwitch={true} // 모드 바꾸기 스위치 숨기기 여부
            previewHighlight={true}
            height="500px" // 에디터 창 높이
            initialEditType="wysiwyg" // 초기 입력모드 설정
            toolbarItems={toolbarItems}
            useCommandShortcut={false}
            language="ko-KR"
            autofocus
            hooks={{
              addImageBlobHook: uploadImageHandler,
            }}
            plugins={[
              chart,
              codeSyntaxHighlight,
              colorSyntax,
              tableMergedCell,
              uml,
            ]}
          />
        )}
      </EditorWrapper>
    </div>
  );
};

export default EventDetailInfo;

const TitleDescription = () => {
  return (
    <div>
      <Text typo={'P_Text_16_M'} color={'gray_400'}>
        공연 상세 내용을 적어주세요.
        <br />
      </Text>
      <Text typo={'P_Text_16_M'} color={'gray_400'}>
        이미지는 드래그 앤 드롭으로 첨부 가능해요.
      </Text>
    </div>
  );
};

const EditorWrapper = styled.div`
  width: 100%;
  background-color: #f7f9fc;
  border-radius: 4px;
  .toastui-editor-main-container {
    background-color: ${({ theme }) => theme.palette.white};
  }
  .toastui-editor-toolbar {
    .toastui-editor-defaultUI-toolbar {
      display: flex;
      direction: row;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
  }
  .toastui-editor-contents {
    padding: 15px;
    ${({ theme }) => theme.typo.P_Text_16_M}
  }
`;
