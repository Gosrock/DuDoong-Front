import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

const MdViewer = ({ content }: { content: string }) => {
  return (
    <>
      <Viewer initialValue={content} />
    </>
  );
};
export default MdViewer;
