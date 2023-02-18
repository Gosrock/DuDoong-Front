import { payType } from '@lib/apis/ticket/ticketType';
import React from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import DudoongTicketForm from './DudoongTicketForm';
import FreeTicketForm from './FreeTicketForm';
import PaidTicketForm from './PaidTicketForm';

export interface TicketFormProps {
  select: payType;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const TicketForm = ({ select, ...props }: TicketFormProps) => {
  if (select === '두둥티켓') {
    return <DudoongTicketForm {...props} />;
  } else if (select === '무료티켓') {
    return <FreeTicketForm />;
  } else {
    // select === '유료티켓'
    return <PaidTicketForm />;
  }
};

export default TicketForm;
