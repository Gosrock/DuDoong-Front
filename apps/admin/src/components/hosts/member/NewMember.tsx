import NewPerson from '@components/shared/component/NewPerson';
import useGlobalOverlay from '@lib/hooks/useGlobalOverlay';

const NewMember = () => {
  const { openOverlay } = useGlobalOverlay();
  const newMemberHandler = () => {
    openOverlay({
      content: 'invitation',
    });
  };

  return <NewPerson type="member" size="sm" onClick={newMemberHandler} />;
};

export default NewMember;
