import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { lunaticVersion, stromaeVersion } from '../../utils/app';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    padding: '2px 0 2px 0',
  },
});

export const AppVersion = ({ className }) => {
  const classes = useStyles();
  return (
    <Typography className={`${className} ${classes.root}`}>
      {`Stromae : ${stromaeVersion} | Lunatic : ${lunaticVersion}`}
    </Typography>
  );
};
