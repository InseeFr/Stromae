import React, { useState, useEffect } from 'react';
import { visualizeDictionary, buttonDictionary } from 'i18n';
import {
  QUESTIONNAIRE_EXAMPLE_URL,
  METADATA_EXAMPLE_URL,
  DATA_EXAMPLE_URL,
  SIMPSONS,
  DEFAULT_DATA_URL,
  DEFAULT_NOMENCLATURE_URL,
  DEFAULT_METADATA_URL,
} from 'utils/constants';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Button } from 'components/designSystem';
import Helper from './helper';
import Examples from './examples';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  title: {
    textAlign: 'center',
  },
  selectionParent: {
    display: 'flex',
    alignItems: 'baseLine',
  },
  selection: {
    marginLeft: theme.spacing(3),
  },
  buttonParent: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },
}));

const QuestionnaireForm = () => {
  const classes = useStyles();
  const [questionnaire, setQuestionnaire] = useState('');
  const [metadata, setMetadata] = useState('');
  const [data, setData] = useState('');
  const [nomenclature, setNomenclature] = useState('');
  const [readonly, setReadonly] = useState(false);

  const [selected, setSelected] = useState('');

  useEffect(() => {
    setQuestionnaire(selected ? QUESTIONNAIRE_EXAMPLE_URL(selected) : selected);
    setMetadata(selected ? METADATA_EXAMPLE_URL(selected) : selected);
    setData(selected ? DATA_EXAMPLE_URL(selected) : selected);
  }, [selected]);

  const history = useHistory();

  const goToQuestionnaire = (e) => {
    history.push({
      pathname: '/visualize',
      search: `?questionnaire=${encodeURIComponent(questionnaire)}
      ${metadata ? `&metadata=${encodeURIComponent(metadata)}` : ''}${
        data ? `&data=${encodeURIComponent(data)}` : ''
      }${
        nomenclature ? `&nomenclature=${encodeURIComponent(nomenclature)}` : ''
      }
      ${readonly ? `&readonly=${readonly}` : ''}`,
    });
    e.preventDefault();
  };

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Typography variant='h3' className={classes.title}>
        {visualizeDictionary.visualizationTitlePage}
      </Typography>
      <form onSubmit={goToQuestionnaire}>
        <TextField
          id='questionnaire-url-form'
          required
          label={visualizeDictionary.labelQuest}
          placeholder={QUESTIONNAIRE_EXAMPLE_URL(SIMPSONS)}
          helperText={visualizeDictionary.helperTextQuest}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          value={questionnaire}
          onChange={({ target: { value: v } }) => {
            setQuestionnaire(v);
          }}
          variant='outlined'
        />
        <TextField
          id='metadata-url-form'
          label={visualizeDictionary.labelMetadata}
          placeholder={DEFAULT_METADATA_URL}
          helperText={visualizeDictionary.helperTextMetadata}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          value={metadata}
          onChange={({ target: { value: v } }) => {
            setMetadata(v);
          }}
          variant='outlined'
        />
        <TextField
          id='data-url-form'
          label={visualizeDictionary.labelData}
          placeholder={DEFAULT_DATA_URL}
          helperText={visualizeDictionary.helperTextData}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          value={data}
          onChange={({ target: { value: v } }) => {
            setData(v);
          }}
          variant='outlined'
        />
        <TextField
          id='nomenclature-url-form'
          label={visualizeDictionary.labelNomenclature}
          placeholder={JSON.stringify(DEFAULT_NOMENCLATURE_URL)}
          helperText={visualizeDictionary.helperTextNomenclature}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          value={nomenclature}
          onChange={({ target: { value: v } }) => {
            setNomenclature(v);
          }}
          variant='outlined'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={readonly}
              onChange={({ target: { checked } }) => setReadonly(checked)}
              name='readonly'
              color='primary'
            />
          }
          label={visualizeDictionary.labelReadonly}
        />
        <div className={classes.selectionParent}>
          <Typography>{visualizeDictionary.chooseExamples}</Typography>
          <Examples
            className={classes.selection}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className={classes.buttonParent}>
          <Button type='submit' className={classes.button}>
            {buttonDictionary.visualize}
          </Button>
        </div>
      </form>
      <br />
      <Helper />
    </Container>
  );
};

export default QuestionnaireForm;
