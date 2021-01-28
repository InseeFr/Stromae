import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@material-ui/core';
import PDFimg from 'img/pdf.png';
import { GetApp } from '@material-ui/icons';
import { useAPI, useAuth } from 'utils/hooks';
import { useParams } from 'react-router-dom';

const EndPage = ({ setWaiting }) => {
  const { logout, oidcUser } = useAuth();
  const { idQ, idSU } = useParams();
  const { getPDF } = useAPI(idSU, idQ);

  const download = async () => {
    const id = oidcUser?.profile?.preferred_username || idSU;
    const filename = `${idQ}-${id}.pdf`;
    setWaiting(true);
    const { error, status } = await getPDF(filename);
    console.log(status);

    setWaiting(false);
  };

  return (
    <Card>
      <CardHeader title="Fin" />
      <Divider />
      <CardContent>
        <Typography>
          {`Votre questionnaire a bien été expédié le ${new Date()}`}
        </Typography>
        <Typography>{`L'Insee vous remercie de votre collaboration à cette enquête.`}</Typography>
        <br />
        <Typography>
          {`Télécharger la preuve de votre participation à l'enquête `}
          <img src={PDFimg} alt="PDF"></img>
        </Typography>

        <Button
          variant="contained"
          color="primary"
          endIcon={<GetApp />}
          onClick={download}
        >
          Télécharger
        </Button>
        <Typography>{`Vous pouvez à présent vous déconnecter`}</Typography>
        <br />
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={logout}>
          Se déconnecter et quitter
        </Button>
      </CardActions>
    </Card>
  );
};
export default EndPage;
