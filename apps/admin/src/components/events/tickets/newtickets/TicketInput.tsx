import { Input, InputProps, ListHeader, Spacing, Text } from '@dudoong/ui';
import { InputHTMLAttributes } from 'react';

export interface TicketInputProps extends InputProps {
  title: string;
  description: string;
  placeholder: string;
}

/**
 * @default: Input 컴포넌트
 *
 * @param title: string
 * @param description: string
 * @param placeholder: string
 */

const TicketInput = ({
  title,
  description,
  placeholder,
  ...props
}: TicketInputProps) => {
  return (
    <>
      <ListHeader
        padding={0}
        size="listHeader_18"
        title={title}
        description={
          <Text typo="P_Text_16_M" color="gray_400">
            {description}
          </Text>
        }
      />
      <Spacing size={12} />
      <Input placeholder={placeholder} {...props} />
    </>
  );
};
export default TicketInput;
