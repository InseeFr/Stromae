import React, { useContext } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { interpret } from '@inseefr/lunatic';
import { ExpandMore } from '@material-ui/icons';
import { welcomePageDictionary } from 'i18n';
import { MarkdownTypo } from 'components/designSystem';
import { OrchestratorContext } from 'components/orchestrator/collector';
import { buildBuidings, buildDefaultBindings } from 'utils/personalization';

const useStyles = makeStyles(theme => ({
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
    interpret(['VTL'])({
      ...buildDefaultBindings(bindingDependencies),
      ...buildBuidings(variables),
      ...buildBuidings(personalization),
    })(myBody);

  const getFinalLabel = label =>
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
              aria-controls="panel1a-content"
              id="panel1a-header"
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
