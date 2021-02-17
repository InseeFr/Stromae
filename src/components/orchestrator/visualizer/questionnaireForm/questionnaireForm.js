import React, { useState } from 'react';
import { visualizeDictionary, buttonDictionary } from 'i18n';
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
      <Typography variant="h3">
        {visualizeDictionary.visualizationTitlePage}
      </Typography>
      <form onSubmit={goToQuestionnaire}>
        <TextField
          label={visualizeDictionary.labelQuest}
          placeholder={QUESTIONNAIRE_EXAMPLE_URL}
          helperText={visualizeDictionary.helperTextQuest}
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
          label={visualizeDictionary.labelMetadata}
          placeholder={METADATA_EXAMPLE_URL}
          helperText={visualizeDictionary.helperTextMetadata}
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
          label={visualizeDictionary.labelData}
          placeholder={DATA_EXAMPLE_URL}
          helperText={visualizeDictionary.helperTextData}
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
        <Button type="submit">{buttonDictionary.visualize}</Button>
      </form>
      <br />
      <Helper />
    </Container>
  );
};

export default QuestionnaireForm;
