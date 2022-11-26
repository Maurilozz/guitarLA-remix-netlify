import { Link } from "react-router-dom";

export const Guitarra = ({ guitarra }) => {
  const { descripcion, precio, nombre, disponible, imagen, url } = guitarra;

  return (
    <div className="guitarra">
      <img
        src={imagen.data.attributes.formats.medium.url}
        alt={`Imagen de guitarra ${nombre}`}
      />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="descripcion">{descripcion}</p>
        <p className="precio">${precio}</p>

        <Link className="enlace" to={`/guitarras/${url}`}>
          Ver Producto
        </Link>
      </div>
    </div>
  );
};
