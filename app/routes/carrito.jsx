import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils";
import styles from "~/styles/carrito.css";

export function meta() {
  return {
    title: "GuitarLA - Carrito",
    description:
      "Las mejores promociones y guitarras con la meyor calidad de materiales",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

const Carrito = () => {
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sumaTotal = carrito.reduce(
      (acum, producto) => acum + producto.cantidad * producto.precio,
      0
    );

    setTotal(sumaTotal);
  }, [carrito]);

  return (
    <ClientOnly fallback={"cargando..."}>
      {/* CLIENT ONLY SE USA PARA EJECURA EL CÓDIGO UNICAMENTE DEL LADO DEL CLIENTE Y EVITAR EL ERROR DE HIDRATACIÓN CUANDO LA INFORMACIÓN ES DISTINTA */}
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>

          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>

              {carrito?.length ? (
                carrito?.map((producto) => (
                  <div key={producto.id} className="producto">
                    <div>
                      <img
                        src={producto.imagen}
                        alt={`Imagen de ${producto.nombre}`}
                      />
                    </div>

                    <div>
                      <p className="nombre">{producto.nombre}</p>

                      <p>Cantidad:</p>

                      <select
                        value={producto.cantidad}
                        className="select"
                        onChange={(e) =>
                          actualizarCantidad({
                            cantidad: +e.target.value,
                            id: producto.id,
                          })
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      <p className="precio">
                        $<span>{producto.precio}</span>
                      </p>

                      <p className="subtotal">
                        Subtotal: ${producto.cantidad * producto.precio}
                      </p>
                    </div>

                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarGuitarra(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              ) : (
                <p>Tu Carrito Esta Vacio</p>
              )}
            </div>

            <aside className="resumen">
              <h3>Resumen del pedido</h3>

              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
};

export default Carrito;
