/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { PaddingSize, } from '../../layout';
import { KeyOfPalette, KeyOfTypo } from '../../theme';
import { Padding, FlexBox } from '../../layout';
import { CSSProperties } from 'react';
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { Text } from '../Text';
import { TextPropsKey } from '../Text';
import { TextProps } from './../Text/index';
import { typo } from '../../theme/typo';
import { theme } from '../../theme';

export interface ListHeaderProps {
    title:string,
    description: string;
    varient?: ListHeaderVarient;
}

type ListHeaderVarient =
  | 'listHeader_18'
  | 'listHeader_20'
  | 'listHeader_24'
  | 'listHeader_28';

type ListHeaderPaddingType = {
    [key in ListHeaderVarient]: 
        [number,number,number,number];
}

type ListHeaderTextType = {
    [key in ListHeaderVarient]: {
        [key in TextPropsKey]: any;
    };
};

const listHeaderText: ListHeaderTextType = {
    'listHeader_18' : {
        typo : 'Text_18_SB',
        color : 'black',
    },
    'listHeader_20' : {
        typo : 'Header_20',
        color : 'black',
    },
    'listHeader_24' : {
        typo : 'Header_24',
        color : 'black',
    },
    'listHeader_28' : {
        typo : 'Header_28',
        color : 'black',
    },
}


const listHeaderPadding: ListHeaderPaddingType = {
    'listHeader_18' : [32, 24, 12, 24],
    'listHeader_20': [32, 24, 16, 24],
    'listHeader_24': [32, 24, 16, 24],
    'listHeader_28' : [32, 24, 20, 24],
}


export const TagBtnStyle = styled.button`
  height: 26px;
  width: 45px;
  background: #EBECF0;
  padding: 2px 0px;
  align-items: right;
`;


export const ListHeader = ({
    description = '제목에 대한 설명이 들어가는 자리입니다. 이런식으로 두줄로 쓸 수 있습니다.',
    varient = 'listHeader_24',
    title='큰 제목',
}: ListHeaderProps) => {
    return (
        <Wrapper>
            <Padding size = {listHeaderPadding[varient]}>
                <FlexBox align='left'
                     gap={description ? '10' : '0'}
                     justify='center'
                     direction='column'>
                    <Text typo = {listHeaderText[varient].typo} color = {listHeaderText[varient].color}>{title}</Text>
                    {description ? <Text typo = 'Text_16' color = 'gray_500'>{description}</Text> : <></>}
                </FlexBox>
            </Padding>
        </Wrapper>
    );
};


const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.gradient.linear_white};
`;