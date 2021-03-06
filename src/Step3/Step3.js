import React from 'react';
import { MainContainer } from '../ComponentStyles/MainContainer';
import { Typography } from '@material-ui/core';
import { Form } from '../ComponentStyles/Form';
import { FileInput } from '../ComponentStyles/FileInput';
import { useForm } from 'react-hook-form';
import { PrimaryButton } from '../ComponentStyles/PrimaryButton';
import { useHistory } from 'react-router-dom';

import { useData } from '../DataContext/DataContext';

export const Step3 = () => {
  const history = useHistory();

  const { data, setValues } = useData();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files,
    },
  });

  const onSubmit = (data) => {
    history.push('/result');
    setValues(data);
  };

  return (
    <>
      <MainContainer>
        <Typography component="h2" variant="h5">
          Step 3
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FileInput name="files" control={control} />
          <PrimaryButton>Next</PrimaryButton>
        </Form>
      </MainContainer>
    </>
  );
};
