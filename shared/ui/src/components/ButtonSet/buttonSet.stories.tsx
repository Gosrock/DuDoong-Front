/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonSet } from '.';
import { theme } from '../../theme';
import { Button } from '../Button';

export default {
  title: 'ButtonSet',
  component: ButtonSet,
  argTypes: {},
} as ComponentMeta<typeof ButtonSet>;

const Template: ComponentStory<typeof ButtonSet> = (args) => (
  <ButtonSet {...args} />
);

export const mono = Template.bind({});
mono.args = {
  children: (
    <>
      <Button>다음</Button>
    </>
  ),
};

export const sub = Template.bind({});
sub.args = {
  children: (
    <>
      <Button>다음</Button>
      <button
        css={css`
          ${theme.typo.Text.Text_16}
          color : ${theme.palette.mono.gray_300};
          &:hover {
            text-decoration: underline;
          }
        `}
      >
        다음에 할래요
      </button>
    </>
  ),
  varient: 'sub',
};

export const vertical = Template.bind({});
vertical.args = {
  children: (
    <>
      <Button>다음</Button>
      <Button varient="secondary">두번째 버튼</Button>
    </>
  ),
  varient: 'vertical',
};

export const horizontal = Template.bind({});
horizontal.args = {
  children: (
    <>
      <Button varient="secondary">취소</Button>
      <Button varient="alert">삭제</Button>
    </>
  ),
  varient: 'horizontal',
};

export const description = Template.bind({});
description.args = {
  children: (
    <>
      <Button varient="secondary">취소</Button>
      <p
        css={css`
          ${theme.typo.Text.Text_14}
          color : ${theme.palette.mono.gray_300};
        `}
      >
        어쩌구저쩌구 설명
      </p>
    </>
  ),
  varient: 'description',
};
