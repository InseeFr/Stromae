import { Link as MuiLink, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles(theme => ({
  header: {
    marginTop: theme.spacing(2),
  },
}));

const MarkdownParagraph = props => {
  return <Typography>{props.children}</Typography>;
};

const MarkdownHeading = props => {
  const classes = useStyles();
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
};

const Link = props => <MuiLink target="_blank" {...props} />;

const MarkdownListItem = props => {
  return (
    <li>
      <Typography component="span">{props.children}</Typography>
    </li>
  );
};

const renderers = {
  heading: MarkdownHeading,
  paragraph: MarkdownParagraph,
  link: Link,
  listItem: MarkdownListItem,
};

export const MarkdownTypo = props => (
  <ReactMarkdown
    className="stromae-md"
    skipHtml={false}
    renderers={renderers}
    {...props}
  />
);
