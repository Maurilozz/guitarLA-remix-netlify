import { Link, useLocation } from "@remix-run/react";
import carritoImagen from "../../public/img/carrito.png";

export const Navegacion = () => {
  const location = useLocation();

  const nowLocation = (root) => {
    if (root === location.pathname) {
      return "active";
    } else {
      return "";
    }
  };
  return (
    <nav className="navegacion">
      <Link to="/" className={nowLocation("/")}>
        Inicio
      </Link>

      <Link to="/nosotros" className={nowLocation("/nosotros")}>
        Nosotros
      </Link>

      <Link to="/guitarras" className={nowLocation("/guitarras")}>
        Tienda
      </Link>

      <Link to="/posts" className={nowLocation("/posts")}>
        Blog
      </Link>

      <Link to="/carrito">
        <img src={carritoImagen} alt="Carrito de compras" />
      </Link>
    </nav>
  );
};
