import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ListHeader } from '.';

export default {
    title: "listHeader",
    component: ListHeader,
    argTypes: {},
} as ComponentMeta<typeof ListHeader>;

const Template: ComponentStory<typeof ListHeader> = (args) => (
    <ListHeader {...args} />
);


export const listHeader_18 = Template.bind({});
listHeader_18.args = {
};

export const listHeader_20 = Template.bind({});
listHeader_20.args = {
};

export const listHeader_24 = Template.bind({});
listHeader_24.args = {
};

export const listHeader_28 = Template.bind({});
listHeader_28.args = {
};

// export const headerWithDescript = Template.bind({});
// headerWithDescript.args = {
//   children: (
//     <>
//         <Padding size = {[20, 0]}>
//             <Text 
//                 typo="Text_16"
//                 color = "gray_500"
//             >
//                 제목에 대한 설명이 들어가는 자리입니다. 두 줄로 작성이 가능합니다.
//             </Text>
//       </Padding>
//     </>
//   ),
//   varient: 'headerWithDescript',
// };


