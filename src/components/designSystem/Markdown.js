import { Link as MuiLink, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
  header: {
    marginTop: theme.spacing(2),
  },
});

function MarkdownParagraph(props) {
  return <Typography>{props.children}</Typography>;
}

const MarkdownHeading = withStyles(styles)(({ classes, ...props }) => {
  let variant;
  switch (props.level) {
    case 1:
      variant = 'h5';
      break;
    case 2:
      variant = 'h6';
      break;
    case 3:
      variant = 'subtitle1';
      break;
    case 4:
      variant = 'subtitle2';
      break;
    default:
      variant = 'h6';
      break;
  }
  return (
    <Typography className={classes.header} gutterBottom variant={variant}>
      {props.children}
    </Typography>
  );
});

const Link = props => <MuiLink target="_blank" {...props} />;

const MarkdownListItem = withStyles(styles)(({ classes, ...props }) => {
  return (
    <li className={classes.listItem}>
      <Typography component="span">{props.children}</Typography>
    </li>
  );
});

const renderers = {
  heading: MarkdownHeading,
  paragraph: MarkdownParagraph,
  link: Link,
  listItem: MarkdownListItem,
};

export const MarkdownTypo = props => (
  <ReactMarkdown skipHtml={false} renderers={renderers} {...props} />
);
