import React, { useState } from 'react';
import Dictionary from 'i18n';
import {
  QUESTIONNAIRE_EXAMPLE_URL,
  METADATA_EXAMPLE_URL,
  DATA_EXAMPLE_URL,
} from 'utils/constants';
import { useHistory } from 'react-router-dom';
import { Container, TextField, Typography } from '@material-ui/core';
import { Button } from 'components/designSystem';
import Helper from './helper';

const QuestionnaireForm = () => {
  const [questionnaire, setQuestionnaire] = useState('');
  const [metadata, setMetadata] = useState('');
  const [data, setData] = useState('');

  const history = useHistory();

  const goToQuestionnaire = e => {
    history.push({
      pathname: '/visualize',
      search: `?questionnaire=${encodeURIComponent(
        questionnaire || QUESTIONNAIRE_EXAMPLE_URL
      )}&metadata=${encodeURIComponent(
        metadata || METADATA_EXAMPLE_URL
      )}&data=${encodeURIComponent(data || DATA_EXAMPLE_URL)}`,
    });
    e.preventDefault();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3">{Dictionary.visualizationTitlePage}</Typography>
      <form onSubmit={goToQuestionnaire}>
        <TextField
          label={Dictionary.labelQuest}
          placeholder={QUESTIONNAIRE_EXAMPLE_URL}
          helperText={Dictionary.helperTextQuest}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={({ target: { value: v } }) => {
            setQuestionnaire(v);
          }}
          variant="outlined"
        />
        <TextField
          label={Dictionary.labelMetadata}
          placeholder={METADATA_EXAMPLE_URL}
          helperText={Dictionary.helperTextMetadata}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={({ target: { value: v } }) => {
            setMetadata(v);
          }}
          variant="outlined"
        />
        <TextField
          label={Dictionary.labelData}
          placeholder={DATA_EXAMPLE_URL}
          helperText={Dictionary.helperTextData}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={({ target: { value: v } }) => {
            setData(v);
          }}
          variant="outlined"
        />
        <Button type="submit">{Dictionary.visualize}</Button>
      </form>
      <br />
      <Helper />
    </Container>
  );
};

export default QuestionnaireForm;
