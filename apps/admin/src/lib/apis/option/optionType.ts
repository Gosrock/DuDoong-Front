
export interface OptionItemProps {
    name: string;
    description: string;
    type: OptionGroupType;
}

export type OptionGroupType =  'Y/N' | '주관식';


export interface Option {
    optionId: number;
    answer: string;
    additionalPrice?: number;
}


export interface CreateOptionRequest {
    type: OptionGroupType;
    name: string;
    description: string;
    additionalPrice?: number;
}

export interface AllOptionResponse {
    optionGroupId: number;
    type: OptionGroupType;
    name: string;
    description: string;
    options: Option[];
}