import React, { useState } from 'react';
import Confetti from 'react-confetti';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

import { MainContainer } from '../ComponentStyles/MainContainer';
import { useData } from '../DataContext/DataContext';
import Paper from '@material-ui/core/Paper';
import { TableContainer } from '@material-ui/core';
import { Link } from 'react-router-dom';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

import { PrimaryButton } from '../ComponentStyles/PrimaryButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
}));

export const Result = () => {
  const [success, setSuccess] = useState(false);
  const { data } = useData();
  const entries = Object.entries(data).filter((entry) => entry[0] !== 'files');
  const { files } = data;
  const styles = useStyles();

  const onSubmit = async () => {
    const formData = new FormData();

    if (data.files) {
      data.files.forEach(file => {
        formData.append("files", file, file.name)
      })
    }

    entries.forEach(entry => {
      formData.append(entry[0], entry[1])
    })

    const res = await fetch('http://localhost:3001/', {
      method: 'POST',
      body: formData,
    });

    if (res.status === 200) {
      Swal.fire('Great job!', 'success');
      setSuccess(true)
    }
  }

  if (success) {
    return <Confetti />;
  }

  return (
    <>
      <MainContainer>
        <Typography component="h2" variant="h5" align="center">
          Form Values
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {entries.map((entry) => {
                return (
                  <TableRow key={entry[0]}>
                    <TableCell>{entry[0]}</TableCell>
                    <TableCell align="right">{entry[1].toString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {files && (
          <>
            <Typography
              component="h2"
              variant="h5"
              align="center"
              className={styles.root}
            >
              Your uploaded files
            </Typography>
            <List>
              {files.map((file, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={file.name} secondary={file.size} />
                </ListItem>
              ))}
            </List>
          </>
        )}
        <PrimaryButton onClick={onSubmit}>Send data</PrimaryButton>
        <Link to="/" align="center">
          Start over
        </Link>
      </MainContainer>
    </>
  );
};
