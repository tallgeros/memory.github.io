document.addEventListener("DOMContentLoaded", function () {
  const themes = [
    "marvel",
    "dc",
    "disney",
    "family",
    "señorAnillos",
    "harryPotter",
    "starwars",
  ];

  const themeMusic = {
    marvel: "audio/avengers.mp3",
    dc: "audio/dc.mp3",
    disney: "audio/disney.mp3",
    family: "audio/family.mp3",
    señorAnillos: "audio/señorAnillos.mp3",
    harryPotter: "audio/harryPotter.mp3",
    starwars: "audio/starwars.mp3",
  };

  themes.forEach((theme) => {
    document.getElementById(theme).addEventListener("click", () => {
      cargarTema(theme);
      cerrarModal();
      ready();
    });
  });

  function cerrarModal() {
    document.getElementById("primer-modal").style.visibility = "hidden";
    document.querySelector(".game-container").style.visibility = "visible";
    document.querySelector(".overlay-text").style.visibility = "visible";
  }

  function cargarTema(theme) {
    let themeCards = obtenerCartasPorTema(theme);
    pairedCards = themeCards.concat(themeCards);
    generarCartas(pairedCards);
    const audiomusic = themeMusic[theme];
    music = audiomusic;
    const audioController = new AudioController(music);
  }

  function obtenerCartasPorTema(theme) {
    switch (theme) {
      case "marvel":
        return marvelCards;
      case "dc":
        return dcCards;
      case "disney":
        return disneyCards;
      case "family":
        return familyCards;
      case "señorAnillos":
        return señorAnillosCards;
      case "starwars":
        return starwarsCards;
      case "harryPotter":
        return harryPotterCards;
      default:
        return marvelCards;
    }
  }

  function generarCartas(cardsArray) {
    const contenedorJuego = document.querySelector(".contenedor-juego");
    contenedorJuego.innerHTML = "";
    cardsArray.forEach((card) => {
      const cardHTML = `
              <div class="card"> 
                  <div class="card-back card-face">
                      <img loading="lazy" class="cartel" src="${card.posterImage}">
                  </div>
                  <div class="card-front card-face">
                      <img loading="lazy" class="figure" src="${card.characterImage}">
                  </div>
              </div>`;
      contenedorJuego.innerHTML += cardHTML;
    });
  }
  setTimeout(() => {
    document.querySelectorAll(".carta-container").forEach((carta) => {
      carta.classList.add("visible");
    });
  }, 100);
});
