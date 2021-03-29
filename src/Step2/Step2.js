import React from 'react';
import { MainContainer } from '../ComponentStyles/MainContainer';
import parsePhoneNumberFromString from 'libphonenumber-js';
import { FormControlLabel, Typography } from '@material-ui/core';
import { Form } from '../ComponentStyles/Form';
import { Input } from '../ComponentStyles/Input';
import { PrimaryButton } from '../ComponentStyles/PrimaryButton';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useData } from '../DataContext/DataContext';

import Checkbox from '@material-ui/core/Checkbox';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const scheme = yup.object().shape({
  email: yup
    .string()
    .email('Email should have correct format')
    .required('Email is a required field'),
  phoneNumber: yup
    .string()
    .matches(/^([^a-z]*)$/, 'Phone number should contain numbers')
    .required('Phone number field is required'),
});

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value);

  if (!phoneNumber) {
    return value
  }

  return phoneNumber.formatInternational()
}

export const Step2 = () => {
  const history = useHistory();

  const { data, setValues } = useData();

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {
      email: data.email,
      phoneNumber: data.phoneNumber,
      hasPhone: data.hasPhone,
    },

    mode: 'onBlur',
    resolver: yupResolver(scheme),
  });

  const hasPhone = watch("hasPhone")

  const onSubmit = (data) => {
    history.push('/step3');
    setValues(data);
  };
  
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          ref={register}
          id="email"
          type="email"
          label="Email"
          name="email"
          required
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <FormControlLabel
          label="Do you have a phone"
          control={
            <Checkbox
              defaultValue={data.hasPhone}
              defaultChecked={data.hasPhone}
              name="hasPhone"
              inputRef={register}
              color="primary"
            />
          }
        />

        {hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone number"
            name="phoneNumber"
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            onChange={(event) => {
              event.target.value = normalizePhoneNumber(event.target.value);
            }}
          />
        )}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}
