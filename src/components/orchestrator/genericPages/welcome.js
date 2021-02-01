import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const WelcomePage = () => {
  return (
    <Card>
      <CardHeader title="Accueil" />
      <Divider />
      <CardContent>
        <Typography>
          Bienvenue sur le questionnaire de réponse à l'enquête
        </Typography>
        <Typography>Qui doit répondre à ce questionnaire ?</Typography>
        <Typography>Blabla</Typography>
        <br />

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Connaître le cadre légal de l'enquête ?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Vu l'avis favorable du Conseil national de l'information
              statistique, cette enquête est reconnue d’intérêt général et de
              qualité statistique sans avoir de caractère obligatoire, en
              application de la loi n° 51-711 du 7 juin 1951 sur l’obligation,
              la coordination et le secret en matière de statistiques.
              <br />
              <br />
              Visa n° valable pour l'année - Arrêté en cours de parution.
              <br />
              <br />
              Les réponses à ce questionnaire sont protégées par le secret
              statistique et destinées à . Le règlement général 2016/679 du 27
              avril 2016 sur la protection des données (RGPD) ainsi que la loi
              n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers
              et aux libertés, s'appliquent à la présente enquête. Les droits
              des personnes, rappelés dans la lettre-avis, peuvent être exercés
              auprès de .
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};
export default WelcomePage;
