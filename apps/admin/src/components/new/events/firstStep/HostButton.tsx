import { Divider } from '@dudoong/ui';
import HostItem, { HostItemProps } from '@components/shared/component/HostItem';

interface HostButtonProps
  extends Pick<
    HostItemProps,
    | 'hostId'
    | 'name'
    | 'introduce'
    | 'profileImageUrl'
    | 'role'
    | 'selectedHostId'
  > {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const HostButton = (props: HostButtonProps) => {
  return (
    <>
      <Divider className="host-divider" height={28} line padding={16} />
      <div onClick={props.onClick}>
        <HostItem type="lg" selectedHostId={props.selectedHostId} {...props} />
      </div>
    </>
  );
};

export default HostButton;
