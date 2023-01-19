import { Accordion, Divider, ListRow, ToggleButton } from '@dudoong/ui';

interface OptionFormProps {
  toggle: boolean;
  setToggle: () => void;
}

const OptionForm = ({ toggle, setToggle }: OptionFormProps) => {
  return (
    <>
      <ListRow
        text={'모든 티켓에 옵션 한번에 적용하기'}
        subText={'또는, 티켓마다 개별 옵션 선택하기'}
        rightElement={
          <ToggleButton toggle={toggle} onToggleClick={setToggle} />
        }
      />
      <Divider />
      <Accordion content={<div></div>} title={'뒷풀이 조사'} />
    </>
  );
};

export default OptionForm;
