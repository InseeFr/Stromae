import React, { useContext } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { interpret } from '@inseefr/trevas';
import { welcomePageDictionary } from 'i18n';
import { MarkdownTypo } from 'components/designSystem';
import { OrchestratorContext } from 'components/orchestrator/collector';
import { buildBuidings, buildDefaultBindings } from 'utils/personalization';

const useStyles = makeStyles((theme) => ({
  card: { marginLeft: '1em', marginRight: '1em' },
  accordionDetails: {
    display: 'block',
  },
  accordion: { backgroundColor: '#b9b9b969' },
  legalTermsTitle: { fontWeight: 'bold' },
}));

const WelcomePage = () => {
  const classes = useStyles();
  const {
    metadata: { inseeContext, variables, genericPages },
    personalization,
  } = useContext(OrchestratorContext);
  const { title, body, legalTermsTitle, legalTermsDetails } =
    genericPages?.welcome || welcomePageDictionary(inseeContext);

  const getBodyWithVariables = (myBody, bindingDependencies) =>
    interpret(myBody, {
      ...buildDefaultBindings(bindingDependencies),
      ...buildBuidings(variables),
      ...buildBuidings(personalization),
    });

  const getFinalLabel = (label) =>
    label || `Not yet Implemented for ${inseeContext}`;

  return (
    <Card className={classes.card}>
      <CardHeader title={getFinalLabel(title)} />
      <Divider />
      <CardContent>
        {body?.value?.map((line, i) => (
          <React.Fragment key={`line-${i}`}>
            <MarkdownTypo>
              {getBodyWithVariables(
                getFinalLabel(line),
                body?.bindingDependencies
              )}
            </MarkdownTypo>
            {i !== body?.value?.length - 1 && <br />}
          </React.Fragment>
        ))}
        {legalTermsTitle && (
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.legalTermsTitle}>
                {legalTermsTitle}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              {legalTermsDetails?.value?.map((line, i) => (
                <React.Fragment key={`line-${i}`}>
                  <MarkdownTypo>
                    {getBodyWithVariables(
                      line,
                      legalTermsDetails?.bindingDependencies
                    )}
                  </MarkdownTypo>
                  {i !== legalTermsDetails.length - 1 && <br />}
                </React.Fragment>
              ))}
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};
export default WelcomePage;
