import styled from '@emotion/styled';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { HTMLAttributes } from 'react';

export interface MdViewerProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

const MdViewer = ({ content, ...props }: MdViewerProps) => {
  return (
    <Wrapper {...props}>
      <Viewer initialValue={content} />
    </Wrapper>
  );
};
export default MdViewer;

const Wrapper = styled.div`
  p {
    font-size: 14px;
  }
`;
