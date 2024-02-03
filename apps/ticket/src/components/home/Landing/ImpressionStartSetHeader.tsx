import { useHeaderColorContext } from '@dudoong/ui';
import { ImpressionArea } from '@toss/impression-area';
import { ReactNode } from 'react';

export const ImpressionStartSetHeader = ({
  children,
  color,
}: {
  children: ReactNode;
  color: 'black' | 'white';
}) => {
  const { setHeaderColor } = useHeaderColorContext();
  return (
    <ImpressionArea onImpressionStart={() => setHeaderColor(color)}>
      {children}
    </ImpressionArea>
  );
};
