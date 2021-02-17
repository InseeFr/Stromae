import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';

const ValidationPage = ({ validate }) => {
  return (
    <Card>
      <CardHeader title="Validation" />
      <Divider />
      <CardContent>
        <Typography>{`Vous êtes arrivé à la fin du questionnaire.`}</Typography>
        <Typography>{`Merci de cliquer sur le bouton "Envoyer" pour le transmettre à l'Insee.`}</Typography>
        <br />
        <Typography>
          {`Après envoi, vous ne pourrez plus modifier vos réponses en ligne.`}
        </Typography>
        <Typography>{`Pour toute modification, cliquer sur le bouton "Retour".`}</Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Send />}
          onClick={validate}
        >
          Envoyer
        </Button>
        <br />
      </CardContent>
    </Card>
  );
};
export default ValidationPage;
