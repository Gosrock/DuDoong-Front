import { Accordion, Divider, ListRow, ToggleButton } from '@dudoong/ui';
import { OptionGroupResponse } from '@lib/apis/ticket/ticketType';
import OptionGroups from './OptionGroups';

interface OptionFormProps {
  toggle: boolean;
  quantity: number;
  ticketName: string;
  setToggle: () => void;
  optionGroups: OptionGroupResponse[];
}

const OptionForm = ({
  toggle,
  quantity,
  ticketName,
  setToggle,
  optionGroups,
}: OptionFormProps) => {
  console.log(optionGroups, quantity, toggle);
  const contentHeight = optionGroups.reduce((acc, cur) => {
    return (acc += cur.type === '주관식' ? 240 : 168);
  }, 0);
  return (
    <>
      {quantity > 1 && (
        <>
          <ListRow
            text={'모든 티켓에 옵션 한번에 적용하기'}
            subText={'또는, 티켓마다 개별 옵션 선택하기'}
            rightElement={
              <ToggleButton toggle={toggle} onToggleClick={setToggle} />
            }
          />
          <Divider />
        </>
      )}
      {!toggle && quantity > 0 ? (
        <>
          {[...Array(quantity)].map((_, idx) => (
            <div key={idx}>
              <Accordion
                content={<OptionGroups optionGroups={optionGroups} />}
                title={`${ticketName} (${idx + 1}/${quantity})`}
                initialState={idx === 0 ? true : false}
                contentHeight={contentHeight}
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <OptionGroups optionGroups={optionGroups} />
        </>
      )}
    </>
  );
};

export default OptionForm;

// 240 168
