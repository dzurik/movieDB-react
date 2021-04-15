import classes from './Logo.module.scss';
import LogoImage from '../../assets/images/logo.png';

const Logo = (props) => {
  return <img className={classes.Logo} src={LogoImage} alt="Logo" />;
};

export default Logo;
