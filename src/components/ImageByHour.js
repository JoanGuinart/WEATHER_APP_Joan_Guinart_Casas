import React from "react";

const ImageByHour = () => {
  let fecha = new Date();
  let hora = fecha.getHours();
  let imagen = "";
  let clase = "";

  if (hora >= 7 && hora < 12) {
    imagen =
      "https://thumbs.dreamstime.com/b/imagen-vertical-hermosa-de-campo-grano-en-india-un-d%C3%ADa-soleado-una-foto-188478231.jpg";
    clase = "img-fluid rounded-start";
  } else if (hora >= 12 && hora < 20) {
    imagen =
      "https://www.fotorevista.com.ar/SFotos/14/09/11/140911000341g.jpg"; /* ready */
    clase = "img-fluid rounded-start";
  } else if ((hora >= 20 && hora <= 24) || (hora >= 0 && hora < 7)) {
    imagen =
      "https://images.fineartamerica.com/images-medium-large-5/galaxies-reflection-toby-harriman.jpg";
    clase = "img-fluid rounded-start";
  }

  console.log(imagen);
  return <img className={clase} alt="imagen_fondo" src={imagen} />;
};

export default ImageByHour;
