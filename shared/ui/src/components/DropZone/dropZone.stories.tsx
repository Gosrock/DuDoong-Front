import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import { DropZone } from '.';

export default {
  title: 'DropZone',
  component: DropZone,
  argTypes: {},
} as ComponentMeta<typeof DropZone>;

const Template: ComponentStory<typeof DropZone> = (args) => {
  const uploadFileHandler = (file: File) => {
    console.log(file);
  };
  const fileTypeErrorHandler = (err: Error) => {
    console.log(err);
  };
  return (
    <>
      <DropZone
        {...args}
        uploadFileHandler={uploadFileHandler}
        fileTypeErrorHandler={fileTypeErrorHandler}
      />
    </>
  );
};
export const bigPoster = Template.bind({});
bigPoster.args = {};
export const miniPoster = Template.bind({});
miniPoster.args = { type: 'miniPoster' };
export const profile = Template.bind({});
profile.args = { type: 'profile' };
