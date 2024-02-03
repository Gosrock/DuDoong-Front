import { ReactNode } from 'react';
import { Spacing as BaseSpacing, media } from '@dudoong/ui';
import { Padding as BasePadding, PaddingProps, PaddingSize } from '@dudoong/ui';
import { Text as BaseTxt, TextProps, typo } from '@dudoong/ui';
import { css } from '@emotion/react';

const Mobile = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={css`
        ${media.pc} {
          display: none;
        }
      `}
    >
      {children}
    </div>
  );
};

const PC = ({ children }: { children: ReactNode }) => {
  return (
    <div
      css={css`
        ${media.mobile} {
          display: none;
        }
      `}
    >
      {children}
    </div>
  );
};

const Spacing = ({ mobile, pc }: { mobile: number; pc: number }) => {
  return (
    <>
      <PC>
        <BaseSpacing size={pc} />
      </PC>
      <Mobile>
        <BaseSpacing size={mobile} />
      </Mobile>
    </>
  );
};

const Padding = ({
  mobile,
  pc,
  children,
  ...rest
}: PaddingProps & { mobile: PaddingSize; pc: PaddingSize }) => {
  return (
    <>
      <PC>
        <BasePadding size={pc} {...rest}>
          {children}
        </BasePadding>
      </PC>
      <Mobile>
        <BasePadding size={mobile} {...rest}>
          {children}
        </BasePadding>
      </Mobile>
    </>
  );
};

const Txt = ({
  mobile,
  pc,
  children,
  ...rest
}: Omit<TextProps, 'typo'> & {
  mobile: keyof typeof typo;
  pc: keyof typeof typo;
}) => {
  return (
    <>
      <PC>
        <BaseTxt typo={pc} {...rest}>
          {children}
        </BaseTxt>
      </PC>
      <Mobile>
        <BaseTxt typo={mobile} {...rest}>
          {children}
        </BaseTxt>
      </Mobile>
    </>
  );
};

export default { Mobile, PC, Spacing, Padding, Txt };
