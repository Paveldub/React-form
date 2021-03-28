import { Typography } from '@material-ui/core'
import { useForm } from 'react-hook-form';

import React from 'react';

import { MainContainer } from '../ComponentStyles/MainContainer';
import { Form } from '../ComponentStyles/Form';
import { Input } from '../ComponentStyles/Input';
import { PrimaryButton } from '../ComponentStyles/PrimaryButton';

export const Step1 = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur"
  });

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 1
      </Typography>
      <Form>
        <Input
          ref={register}
          id="firstName"
          type="text"
          label="First name"
          name="firstName"
        />
        <Input
          ref={register}
          id="lastName"
          type="text"
          label="Last name"
          name="lastName"
        />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
}


