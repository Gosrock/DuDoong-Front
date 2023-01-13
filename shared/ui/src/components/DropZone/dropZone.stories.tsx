import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DropZone } from '.';
import styled from '@emotion/styled';

export default {
  title: 'DropZone',
  component: DropZone,
  argTypes: {},
} as ComponentMeta<typeof DropZone>;

const Template: ComponentStory<typeof DropZone> = (args) => {
  const uploadFileHandler = (file: any) => {
    console.log(file);
  };
  const fileTypeErrorHandler = (err: Error) => {
    console.log(err);
  };
  const fileNumErrorHandler = () => {
    console.log('file num err');
  };
  return (
    <Wrapper>
      <DropZone
        {...args}
        uploadFileHandler={uploadFileHandler}
        fileTypeErrorHandler={fileTypeErrorHandler}
        fileNumErrorHandler={fileNumErrorHandler}
      />
    </Wrapper>
  );
};
export const bigPoster = Template.bind({});
bigPoster.args = {};
export const miniPoster = Template.bind({});
miniPoster.args = { type: 'miniPoster' };
export const profile = Template.bind({});
profile.args = { type: 'profile' };

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${({ theme }) => theme.palette.gray_300};
`;
