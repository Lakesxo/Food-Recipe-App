import Logo from "../../images/logo.png";
import "./Header.scss";
import { Link } from "react-router-dom";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <header>
      <Link to="/">
        <img className="logo" src={Logo} alt="logo" />
      </Link>
      <Link to="/">
        <p className="bdHead">Home</p>
      </Link>
      <Link to="/favorites">
        <p className="bdHead">Favorites</p>
      </Link>
    </header>
  );
};

export default Header;
