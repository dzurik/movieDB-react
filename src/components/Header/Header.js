import classes from './Header.module.scss';
import Logo from '../Logo/Logo';

const Header = (props) => {
  return (
    <div className={classes.Header}>
      <Logo />
    </div>
  );
};

export default Header;
