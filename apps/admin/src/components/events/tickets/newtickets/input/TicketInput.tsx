/* eslint-disable react/display-name */
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
import { forwardRef } from 'react';

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

const TicketInput = forwardRef<HTMLInputElement, TicketInputProps>(
  (
    {
      title,
      description,
      placeholder,
      titleTypo = 'listHeader_18',
      descriptionTypo = 'P_Text_16_M',
      ...props
    }: TicketInputProps,
    ref,
  ) => {
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
        <Input placeholder={placeholder} ref={ref} {...props} />
      </FlexBox>
    );
  },
);

export default TicketInput;
