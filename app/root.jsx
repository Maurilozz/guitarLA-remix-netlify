import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useCatch,
} from "@remix-run/react";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import styles from "~/styles/index.css";
import { Error404 } from "~/components/error404";
import { useEffect, useState } from "react";

export function meta() {
  // VALORES QUE TENDRA LA ETIQURTA head
  return {
    charset: "utf8",
    title: "GuitarLA - Remix",
    viewport: "width=device-width, initial-scale=1",
  };
}

export function links() {
  // TIENE QUE RETORNAR UN ARRAY
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet", // TIPO DE ARCHIVO
      href: styles, // LINK
    },
  ];
}

export default function App() {
  // MANERA EFICIENTE DE EJECUTAR ESTE CÓDIGO DEL LADO DEL CLIENTE Y NO EL EL SERVIDOR
  const carritoLs =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("carrito")) ?? []
      : null;
  const [carrito, setCarrito] = useState(carritoLs);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarCarrito = (guitarra) => {
    if (carrito.some((guitarraState) => guitarraState.id === guitarra.id)) {
      // CREAR NUEVO ARREGLO
      const carritoActualizado = carrito.map((guitarraState) => {
        // SI HAY DUPLICADO REESCRIBIRA LA CANTIDAD
        if (guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad;
        }

        return guitarraState;
      });

      setCarrito(carritoActualizado);
    } else {
      // SI NO HAY DUPLICADO LO AÑADIRA AL STATE
      setCarrito([...carrito, guitarra]);
    }
  };

  const actualizarCantidad = ({ id, cantidad }) => {
    const carritoActualizado = carrito.map((producto) => {
      if (id === producto.id) {
        producto.cantidad = cantidad;
      }

      return producto;
    });

    setCarrito(carritoActualizado);
  };

  const eliminarGuitarra = (id) => {
    const carritoActualizado = carrito.filter((producto) => producto.id !== id);

    setCarrito(carritoActualizado);
  };

  return (
    <Document>
      {/* SE USA PARA CREAR EL CONTENIDO DE routes */}
      <Outlet
        // context SIEMPRE TIENE QUE TENER UN VALOR COMO OBJETO Y PUEDE SER DE CUALQUIER TIPO Y SE PODRA USAR DE MANERA GLOBAL
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra,
        }}
      />
    </Document>
  );
}

// ES IMPORTANTE INSERTAR children
function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta /> {/* Meta INYECTARA TODO DE LA FUNCIÓN meta */}
        <Links /> {/* Links INYECTARA TODO DE LA FUNCIÓN links */}
      </head>

      <body>
        <Header /> {/* SE AÑADIRA DE FORMA GLOBAL */}
        {children}
        <Footer />
        <Scripts /> {/* OPTIMIZA EL CARGADO ENTRE PAGINAS */}
        <LiveReload /> {/* HACE RECARGADO AUTOMATICO */}
      </body>
    </html>
  );
}

// MANEJO DE ERRORES
export function CatchBoundary() {
  const error = useCatch(); // SE USA PARA IBTENER EL ERROR

  return (
    <Document>
      <Error404 status={error.status} text={error.statusText} />
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <p className="error">
        {error.status} {error.statusText}
      </p>
    </Document>
  );
}
