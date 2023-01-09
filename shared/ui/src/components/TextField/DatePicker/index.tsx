import styled from '@emotion/styled';
import { InputHTMLAttributes, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { theme } from '../../../theme';
import { calcRem } from '../../../theme/typo';
import { Input } from '../Input';
import { ReactComponent as Calender } from '../../../assets/icons/calender.svg';
import { ko } from 'date-fns/esm/locale';
export interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  placeholder?: string;
}

/**
 * @param width: number (기본값: 100%)
 * @param placeholder: string
 */

export const DatePicker = ({ width, placeholder }: DatePickerProps) => {
  const [startDate, setStartDate] = useState();

  return (
    <DatePickerStyles>
      <ReactDatePicker
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        disabledKeyboardNavigation
        dateFormat="yyyy년 MM월 dd일"
        locale={ko}
        placeholderText={placeholder}
        customInput={
          <Input width={width} value={startDate} rightIcon={<Calender />} />
        }
      />
    </DatePickerStyles>
  );
};

const DatePickerStyles = styled.div`
  .react-datepicker {
    background-color: ${theme.palette.white};

    ${theme.typo.Text_18};

    border: 0;
    border-radius: 10px;

    box-shadow: 0px 0px 16px 0px rgba(14, 14, 14, 0.08);
    padding: 24px 16px 24px 16px;

    display: inline-block;
    position: relative;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__navigation {
    margin: 24px 16px 0px 16px;
    width: 18px;
    height: 14px;
    overflow: visible;
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${theme.palette.gray_300} !important;
    border-width: 1.71px 1.71px 0 0;
    top: 6px;
  }

  .react-datepicker-popper {
    z-index: 1;
  }
  .react-datepicker-popper[data-placement^='bottom'] {
    margin-top: 0;
    padding: 0;
  }

  .react-datepicker__month-container {
    width: 100%;
    height: 100%;
  }

  .react-datepicker__header {
    text-align: center;

    background-color: ${theme.palette.white};
    border-bottom: 1px solid ${theme.palette.gray_100};
    padding: 0 0 16px 0;
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    ${theme.typo.Header_20}
    color: ${theme.palette.black};

    height: ${calcRem(18)};
    position: relative;
    display: inline-block;

    margin: 0;
    padding: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-datepicker__day-names {
    padding-top: 24px;
    gap: 6px !important;
    margin: 0 !important;

    display: flex;
    justify-content: space-between;
  }

  .react-datepicker__day-name {
    width: 38px !important;
    height: 22px !important;
    margin: 0 !important;

    color: ${theme.palette.main_400} !important;
  }

  .react-datepicker__month {
    padding-top: 16px !important;
    margin: 0 !important;

    text-align: center;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 16px !important;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 6px !important;
  }

  .react-datepicker__day {
    color: ${theme.palette.gray_500};

    display: inline-block;
    text-align: center;
    line-height: 0.75rem;

    width: 38px;
    height: 22px;

    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover {
    border-radius: 4px;
    background-color: ${theme.palette.gray_100} !important;
  }
  .react-datepicker__day--today,
  .react-datepicker__month-text--today,
  .react-datepicker__quarter-text--today,
  .react-datepicker__year-text--today {
    font-weight: normal;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    border-radius: 4px;
    background-color: ${theme.palette.main_200} !important;
    color: ${theme.palette.black}!important;
  }

  .react-datepicker__day--outside-month {
    color: ${theme.palette.gray_200}!important;
  }
`;
