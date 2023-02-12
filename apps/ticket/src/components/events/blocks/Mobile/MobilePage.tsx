import { DetailTemplateProps } from '@components/events';

const MobilePage = ({
  tickets,
  openOverlay,
  ...props
}: DetailTemplateProps) => {
  return <div {...props}>mobile</div>;
};

export default MobilePage;
