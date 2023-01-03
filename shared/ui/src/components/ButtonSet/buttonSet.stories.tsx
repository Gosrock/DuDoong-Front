/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonSet } from '.';
import { theme } from '../../theme';
import { Button } from '../Button';
import { Text } from '../Text';

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
          color: ${theme.palette.gray_300};
          &:hover {
            text-decoration: underline;
          }
        `}
      >
        <Text typo={'Text_16'}>두번째 버튼</Text>
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
      <Text
        typo="Text_14"
        css={css`
          color: ${theme.palette.gray_300};
        `}
      >
        어쩌구저쩌구 설명
      </Text>
    </>
  ),
  varient: 'description',
};
