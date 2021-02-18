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
import { buildBuidings } from 'utils/personalization';

const useStyles = makeStyles(theme => ({
  accordionDetails: {
    display: 'block',
  },
}));

const WelcomePage = () => {
  const {
    metadata: { inseeContext, variables },
    personalization,
  } = useContext(OrchestratorContext);
  const {
    title,
    body,
    legalTermsTitle,
    legalTermsDetails,
  } = welcomePageDictionary(inseeContext);

  const getBodyWithVariables = myBody =>
    interpret(['VTL'])({
      ...buildBuidings(variables),
      ...buildBuidings(personalization),
    })(myBody);

  const getFinalLabel = label =>
    label || `Not yet Implemented for ${inseeContext}`;

  const classes = useStyles();

  return (
    <Card>
      <CardHeader title={getFinalLabel(title)} />
      <Divider />
      <CardContent>
        {body.map((line, i) => (
          <React.Fragment key={`line-${i}`}>
            <MarkdownTypo>
              {getBodyWithVariables(getFinalLabel(line))}
            </MarkdownTypo>
            <br />
          </React.Fragment>
        ))}
        {legalTermsTitle && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{legalTermsTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              {legalTermsDetails.map((line, i) => (
                <React.Fragment key={`line-${i}`}>
                  <MarkdownTypo>{getBodyWithVariables(line)}</MarkdownTypo>
                  <br />
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
