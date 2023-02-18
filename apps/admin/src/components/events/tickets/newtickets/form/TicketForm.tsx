import { forwardRef } from 'react';
import { payType } from '@lib/apis/ticket/ticketType';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import DudoongTicketForm from './DudoongTicketForm';
import FreeTicketForm from './FreeTicketForm';
import PaidTicketForm from './PaidTicketForm';
import styled from '@emotion/styled';
import React from 'react';

export interface TicketFormProps {
  select?: payType;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
}

const TicketForm = ({ select, ...props }: TicketFormProps) => {
  return (
    <Wrapper>
      {select === '두둥티켓' ? (
        <div className="dudoong-ticket">
          <DudoongTicketForm {...props} />
        </div>
      ) : select === '무료티켓' ? (
        <div className="free-ticket">
          <FreeTicketForm {...props} />
        </div>
      ) : select === '유료티켓' ? (
        <div className="paid-ticket">
          <PaidTicketForm {...props} />
        </div>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};
TicketForm.displayName = 'TicktForm';

export default TicketForm;

const Wrapper = styled.div`
  // 각각 줘야만 먹는데 다른 방법이 없을까~...

  @keyframes fadeIn1 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn2 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn3 {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .dudoong-ticket {
    animation: 1s forwards fadeIn1 ease-out;
  }

  .free-ticket {
    animation: 1s forwards fadeIn2 ease-out;
  }

  .paid-ticket {
    animation: 1s forwards fadeIn3 ease-out;
  }
`;
