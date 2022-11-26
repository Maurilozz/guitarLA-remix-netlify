import { useState } from "react";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getGuitarra } from "~/models/guitarras.server";
import { Error } from "~/components/error";

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  if (!guitarra.data.length) {
    throw new Response("", {
      status: 404,
      statusText: "Lo sentimos, no encontramos guitarras por aqui",
    });
  }

  return guitarra.data[0];
}

// data EXISTE POR loader Y ESTA DISPONIBLE PARA TODO EL COMPONENTE
export function meta({ data }) {
  // SI NO HAY RESULTADOS
  if (!data) {
    return {
      title: "Guitarra no Encontrada",
    };
  }

  const { nombre, descripcion } = data;

  return {
    title: `GuitarLA - ${nombre}`,
    description: descripcion,
  };
}

const Guitarra = () => {
  const { agregarCarrito } = useOutletContext(); // SE USA PARA ACCEDER AL context

  const [cantidad, setCantidad] = useState(0);
  const [error, setError] = useState("");

  const guitarra = useLoaderData();
  const { descripcion, nombre, precio, imagen, disponible } =
    guitarra.attributes;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cantidad < 1) {
      setError("Seleccione una cantidad");

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    const guitarraSeleccionada = {
      id: guitarra.id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad,
      disponible,
    };

    agregarCarrito(guitarraSeleccionada);
  };

  return (
    <div className="guitarra producto">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`Imagen de ${nombre}`}
      />

      <div className="contenido">
        <h3>{nombre}</h3>

        <p className="texto">{descripcion}</p>

        <p className="precio">${precio}</p>

        <form className="formulario" onSubmit={handleSubmit}>
          <label htmlFor="cantidad">Cantidad</label>

          <select
            name="cantidad"
            id="cantidad"
            onChange={(e) => setCantidad(+e.target.value)}
          >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>

      {error && <Error mensaje={error} />}
    </div>
  );
};

export default Guitarra;
