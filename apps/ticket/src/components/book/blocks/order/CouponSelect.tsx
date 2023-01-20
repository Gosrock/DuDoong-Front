import { Dropdown, DropdownOption } from '@dudoong/ui';
import { useState } from 'react';

const CouponSelect = () => {
  const [value, setValue] = useState<DropdownOption>(initialOption);
  return (
    <Dropdown
      selectedOption={value}
      setSelectedOption={setValue}
      options={mockOptions}
    />
  );
};

export default CouponSelect;

const initialOption: DropdownOption = {
  title: '사용 가능한 쿠폰 (0)',
  id: 'null',
  description: '',
  disabled: false,
};

const mockOptions: DropdownOption[] = [
  /*   {
    title: '일반 티켓',
    id: 'asdf',
    description: '4000원',
    disabled: false,
  }, */
];
