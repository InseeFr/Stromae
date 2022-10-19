import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { visualizeDictionary } from 'i18n';
import { MarkdownTypo } from 'components/designSystem';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '4em',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  accordionDetails: {
    display: 'block',
  },
}));

const Helper = () => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <MarkdownTypo className={classes.heading}>
          {visualizeDictionary.accordionHelperTitle}
        </MarkdownTypo>
        <MarkdownTypo className={classes.secondaryHeading}>
          {visualizeDictionary.accordionHelperSubtitle}
        </MarkdownTypo>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <MarkdownTypo>{visualizeDictionary.accordionHelperBody}</MarkdownTypo>
      </AccordionDetails>
    </Accordion>
  );
};
export default Helper;
