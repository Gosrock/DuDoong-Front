import { ListHeader, Text } from '@dudoong/ui';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { UpdateEventDetailRequest } from '@lib/apis/event/eventType';

interface EventDetailInfoProps {
  content: string;
  setForm: Dispatch<SetStateAction<UpdateEventDetailRequest>>;
}

const EventDetailInfo = ({ content, setForm }: EventDetailInfoProps) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['quote'],
    ['ul', 'ol'],
  ];
  const editorRef = useRef<Editor>(null);
  const onChange = () => {
    if (editorRef.current)
      setForm((prev) => {
        return {
          ...prev,
          content: editorRef.current!.getInstance().getMarkdown(),
        };
      });
  };
  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, [content]);
  return (
    <div>
      <ListHeader
        title={'공연 상세 내용'}
        size={'listHeader_18'}
        padding={[32, 0, 12, 0]}
        description={<TitleDescription />}
      />
      <EditorWrapper>
        <Editor
          ref={editorRef}
          onChange={onChange}
          placeholder="내용을 입력해주세요."
          previewStyle="tab" // 미리보기 스타일 지정
          hideModeSwitch={true}
          previewHighlight={true}
          height="300px" // 에디터 창 높이
          initialEditType="wysiwyg" // 초기 입력모드 설정
          toolbarItems={toolbarItems}
          autofocus
        />
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
