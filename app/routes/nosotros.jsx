import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";

export function meta() {
  return {
    title: "GuitarLA - Nosotros",
    description:
      "Venta de guitarras, Tips de musica, Blogs y consejos sobre guitarras",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preload",
      href: imagen,
      as: "image",
    },
  ];
}

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />

        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lectus sem, fringilla sed bibendum quis, fringilla in augue. Proin
            mattis fermentum felis. Praesent leo tellus, dapibus vel tristique
            tristique, condimentum in dui. Proin ac sapien efficitur, posuere
            tellus eget, malesuada quam. Vivamus lorem mi, suscipit id risus ac,
            scelerisque imperdiet arcu. Ut varius porta blandit. Donec quis
            molestie dui. Nunc ac nisi sed libero pulvinar vulputate. Morbi quis
            turpis non tortor iaculis fringilla et nec orci. Morbi semper
            pellentesque venenatis. Phasellus justo metus, tincidunt vel laoreet
            eget, fermentum id purus. Phasellus auctor vel arcu ac lobortis.
            Nunc id maximus leo. Sed eros est, tempus in placerat vitae,
            consequat tristique dolor. Pellentesque eget ultricies odio.
            Praesent finibus eu nisi vitae imperdiet. Sed vitae venenatis
            lectus. Sed maximus non nunc rhoncus tempus.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
