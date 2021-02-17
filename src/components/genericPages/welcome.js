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
} from '@material-ui/core';
import { interpret } from '@inseefr/lunatic';
import { ExpandMore } from '@material-ui/icons';
import { getWelcomePage } from 'utils/content';
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
  const { title, body, legalTerms } = getWelcomePage(inseeContext);

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
        <MarkdownTypo>{getBodyWithVariables(getFinalLabel(body))}</MarkdownTypo>
        {legalTerms && (
          <>
            <br />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <MarkdownTypo>{legalTerms.title}</MarkdownTypo>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                {legalTerms.details.map((term, i) => (
                  <React.Fragment key={`term-${i}`}>
                    <MarkdownTypo>{getBodyWithVariables(term)}</MarkdownTypo>
                    <br />
                  </React.Fragment>
                ))}
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default WelcomePage;
