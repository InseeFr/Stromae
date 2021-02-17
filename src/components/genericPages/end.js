import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@material-ui/core';
import { Button as InseeButton } from 'components/designSystem/Button';
import PDFimg from 'img/pdf.png';
import { GetApp } from '@material-ui/icons';
import { useAPI, useAuth } from 'utils/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { formatDistance, format } from 'date-fns';
import { getEndPage } from 'utils/content';

import { fr } from 'date-fns/locale';
import { OrchestratorContext } from 'components/orchestrator/collector';

const EndPage = () => {
  const {
    metadata: { inseeContext },
  } = useContext(OrchestratorContext);
  const { logout, oidcUser } = useAuth();
  const { pathname } = useLocation();

  const { idQ, idSU } = useParams();
  const { getPDF } = useAPI(idSU, idQ);

  const { title, thanks, depositProof, logout: logoutEnabled } = getEndPage(
    inseeContext
  );

  const download = async () => {
    const id = oidcUser?.profile?.preferred_username || idSU;
    const filename = `${idQ}-${id}.pdf`;
    const { error, status } = await getPDF(filename);
    console.log(status + error);
  };

  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        <Typography>
          {`Votre questionnaire a bien été expédié ${formatDistance(
            new Date(),
            new Date(),
            { addSuffix: true, locale: fr }
          )} (le ${format(new Date(), 'dd/MM/yyyy à HH:mm')})`}
        </Typography>
        <Typography>{thanks}</Typography>
        <br />
        {depositProof && !pathname.includes('visualize') && (
          <>
            <Typography>
              {`Télécharger la preuve de votre participation à l'enquête `}
            </Typography>
            <img src={PDFimg} alt="PDF"></img>

            <Button
              variant="contained"
              color="primary"
              endIcon={<GetApp />}
              onClick={download}
            >
              Télécharger
            </Button>

            <br />
          </>
        )}
        {logoutEnabled && (
          <Typography>{`Vous pouvez à présent vous déconnecter`}</Typography>
        )}
      </CardContent>
      {logoutEnabled && (
        <CardActions>
          <InseeButton onClick={logout}>Se déconnecter et quitter</InseeButton>
        </CardActions>
      )}
    </Card>
  );
};
export default EndPage;
