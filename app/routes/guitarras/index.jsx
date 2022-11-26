import { useLoaderData } from "@remix-run/react";
import { ListadoGuitarras } from "~/components/listado-guitarras";
import { getGuitarras } from "~/models/guitarras.server";

export function meta() {
  return {
    title: "GuitarLA - Tienda",
  };
}

// NO ES NECESARIO MANDAR A LLAMAR EL loader
export async function loader() {
  const guitarras = await getGuitarras();

  return guitarras.data;
}

const Tienda = () => {
  const guitarras = useLoaderData(); // ACCEDER AL RETURN DE loader

  return <ListadoGuitarras guitarras={guitarras} />;
};

export default Tienda;
