import { Link } from "react-router-dom";
import logo from "./../../public/img/logo.svg";
import { Navegacion } from "./navegacion";

export const Header = () => {
  return (
    <header className="header">
      <div className="contenedor barra">
        <Link to="/">
          <img className="logo" src={logo} alt="Logotipo GuitarLA" />
        </Link>

        <Navegacion />
      </div>
    </header>
  );
};
