import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../../img/Logo-Insee.jpg';
import './loader.css';

const Loader = ({ info }) => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }));

  return (
    <Backdrop open className={`${useStyles().backdrop} loading`}>
      <figure>
        <img src={logo} alt="Logo de l'Insee" />
        <figcaption>{`Chargement ... ${info || ''}`}</figcaption>
      </figure>
    </Backdrop>
  );
};

export default Loader;
