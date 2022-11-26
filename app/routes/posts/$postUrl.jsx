import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatearFecha } from "~/utils/helpers";

export async function loader({ params }) {
  const post = await getPost(params.postUrl);

  if (!post.data.length) {
    throw new Response("", {
      status: 404,
      statusText: "Lo sentimos, no encontramos posts por aqui",
    });
  }

  return post.data[0].attributes;
}

export function meta({ data }) {
  if (!data) {
    return {
      title: "Post no Encontrada",
    };
  }

  return {
    title: data.titulo,
  };
}

export default function Post() {
  const post = useLoaderData();
  const { titulo, contenido, imagen, publishedAt } = post;

  return (
    <article className="post">
      <img
        className="imagen mt-3"
        src={imagen.data[0].attributes.url}
        alt={`Imagen blog ${titulo}`}
      />

      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatearFecha(publishedAt)}</p>

        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
}
