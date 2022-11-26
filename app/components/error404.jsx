import { useNavigate } from "@remix-run/react";

export const Error404 = ({ status, text }) => {
  const navigate = useNavigate();

  return (
    <main className="contenedor error">
      <h2 className="heading">{status}</h2>
      <p className="text">{text}</p>

      <img
        className="gif"
        src="https://res.cloudinary.com/dtgud76wz/image/upload/v1668581897/gif_izqgyj.gif"
        alt="No encontramos nada por aqui"
      />

      <button onClick={() => navigate(-1)}>Volver</button>
    </main>
  );
};
