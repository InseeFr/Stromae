import React, { useContext } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@material-ui/core';

import { validationPageDictionary, buttonDictionary } from 'i18n';
import { Send } from '@material-ui/icons';
import { OrchestratorContext } from 'components/orchestrator/collector';
import { MarkdownTypo } from 'components/designSystem';

const ValidationPage = ({ validate }) => {
  const {
    metadata: { inseeContext },
  } = useContext(OrchestratorContext);
  const { title, body } = validationPageDictionary(inseeContext);
  return (
    <Card>
      <CardHeader title={title} />
      <Divider />
      <CardContent>
        {body.map((line, i) => (
          <React.Fragment key={`line-${i}`}>
            <MarkdownTypo>{line}</MarkdownTypo>
            <br />
          </React.Fragment>
        ))}
        <Button
          variant="contained"
          color="primary"
          endIcon={<Send />}
          onClick={validate}
        >
          {buttonDictionary.send}
        </Button>
        <br />
      </CardContent>
    </Card>
  );
};
export default ValidationPage;
