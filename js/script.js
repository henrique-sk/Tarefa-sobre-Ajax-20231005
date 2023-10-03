var pagina = 1; // número da página a ser carregada
var carregando = false; // indica se uma requisição Ajax está em andamento

// função para carregar mais imagens
function carregarImagens() {
  if (carregando) {
    return;
  }
  carregando = true;
  // var url = "carregar-imagens.php?pagina=" + pagina;
  var url = "./assets/images.json";
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  ajax.onreadystatechange = function() {
    if (ajax.readyState == 4 && ajax.status == 200) {

      var divImagens = document.getElementById("imagens");
      // divImagens.innerHTML += ajax.responseText;
      var images = JSON.parse(ajax.responseText);
      
      images.animals = shuffleArray(images.animals);

      for (const image of images.animals) {
        var img = document.createElement("img");
        img.src = image.imagemUrl;
        img.alt = image.name;
        divImagens.appendChild(img);
      }
      carregando = false;
      pagina++;
    }
  };
  ajax.send();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// detecta quando o usuário chegou no final da página e carrega mais imagens
window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    carregarImagens();
  }
};

carregarImagens();