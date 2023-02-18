import {
  FlexBox,
  Input,
  InputProps,
  KeyOfTypo,
  ListHeader,
  ListHeaderVariantKey,
  Spacing,
  Text,
} from '@dudoong/ui';
import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';

export interface TicketInputProps extends InputProps {
  title: string;
  description: string;
  placeholder: string;
  titleTypo?: ListHeaderVariantKey;
  descriptionTypo?: KeyOfTypo;
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
  titleTypo = 'listHeader_18',
  descriptionTypo = 'P_Text_16_M',
  ...props
}: TicketInputProps) => {
  return (
    <FlexBox direction="column" align="flex-start" style={{ width: '100%' }}>
      <ListHeader
        padding={0}
        size={titleTypo}
        title={title}
        description={
          <Text typo={descriptionTypo} color="gray_400">
            {description}
          </Text>
        }
      />
      <Spacing size={12} />
      <Input placeholder={placeholder} {...props} />
    </FlexBox>
  );
};
export default TicketInput;
