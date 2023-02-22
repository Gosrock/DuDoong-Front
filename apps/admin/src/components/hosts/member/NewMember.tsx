import NewPerson from '@components/shared/component/NewPerson';

const NewMember = () => {
  const newMemberHandler = () => {
    console.log('뉴멤버');
  };

  return <NewPerson type="member" size="sm" onClick={newMemberHandler} />;
};

export default NewMember;
