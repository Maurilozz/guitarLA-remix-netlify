// ESTA PAGINA SOLO HACE LA FUNCIÓN DE UN TEMPLATE

import { Outlet, useOutletContext } from "@remix-run/react";
import styles from "~/styles/guitarras.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

const Tienda = () => {
  return (
    <main className="contenedor">
      {/* INYECTARA EL CONTENIDO DE LA RUTAS DINAMICAS */}
      <Outlet context={useOutletContext()} />
      {/* PASA EL CONTEXT GLOBAL A SU PAGINA ANIDADA */}
    </main>
  );
};

export default Tienda;
