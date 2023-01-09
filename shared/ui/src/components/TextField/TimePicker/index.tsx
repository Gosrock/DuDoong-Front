import styled from '@emotion/styled';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { theme } from '../../../theme';
import { calcRem } from '../../../theme/typo';
import { Input } from '../Input';
import { ReactComponent as Clock } from '../../../assets/icons/clock.svg';
import { DatePicker, DatePickerProps } from '../DatePicker';

/**
 * @param width: number (기본값: 100%)
 * @param placeholder: string
 */

export const TimePicker = ({ width, placeholder }: DatePickerProps) => {
  const [startTime, setStartTime] = useState();

  return (
    <TimePickerStyles>
      <ReactDatePicker
        selected={startTime}
        onChange={(time: any) => setStartTime(time)}
        disabledKeyboardNavigation
        showTimeSelect
        showTimeSelectOnly
        dateFormat="hh:mm aa"
        timeIntervals={30}
        timeCaption="Time"
        placeholderText={placeholder}
        customInput={
          <Input width={width} value={startTime} rightIcon={<Clock />} />
        }
      />
    </TimePickerStyles>
  );
};

const TimePickerStyles = styled.div`
  .react-datepicker {
    background-color: ${theme.palette.white};
    color: ${theme.palette.gray_500};

    ${theme.typo.Text_18};

    border: 0;
    border-radius: 10px;

    box-shadow: 0px 0px 16px 0px rgba(14, 14, 14, 0.08);
    padding: 24px 16px 24px 16px;

    display: inline-block;
    position: relative;

    width: 160px !important;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker-popper {
    z-index: 1;
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

  .react-datepicker__time-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 150px !important;
  }

  .react-datepicker__time {
    width: 150px !important;
    margin: 0 !important;
    display: flex;
    justify-content: center;
  }
  .react-datepicker__time-box {
    margin: 0 !important;
    width: 100% !important;

    display: flex;
    justify-content: center;
  }

  .react-datepicker__time-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0px 15px !important;
  }

  .react-datepicker__time-list::-webkit-scrollbar {
    width: 5px; /* 스크롤바의 너비 */
  }

  .react-datepicker__time-list::-webkit-scrollbar-thumb {
    height: 30%;
    background: ${theme.palette.gray_200};

    border-radius: 16px;
  }
  .react-datepicker__time-list-item {
    border-radius: 8px;

    display: flex;
    text-align: center;
    justify-content: center;
  }
  .react-datepicker__time-list-item--selected {
    border-radius: 8px;
    background-color: ${theme.palette.main_200} !important;
    color: ${theme.palette.black}!important;
    padding: 7px 20px 7px 20px !important;
  }

  .react-datepicker__time-list-item:hover {
    border-radius: 8px;
    padding: 7px 20px 7px 20px !important;

    display: flex;
    text-align: center;
    justify-content: center;
  }
`;
