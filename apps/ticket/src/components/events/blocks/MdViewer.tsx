import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { HTMLAttributes } from 'react';

export interface MdViewerProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

const MdViewer = ({ content, ...props }: MdViewerProps) => {
  return (
    <div {...props}>
      <Viewer initialValue={content} />
    </div>
  );
};
export default MdViewer;
