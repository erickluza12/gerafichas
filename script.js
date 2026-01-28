// ==============================
// ESTADO DO JOGADOR
// ==============================
const jogador = {
  nome: "",
  posicao: "",
  idade: 0,
  altura: 0,
  peso: 0
};

// ==============================
// CAPTURA DOS CAMPOS DE IDENTIDADE
// ==============================
const campos = ["nome", "posicao", "idade", "altura", "peso"];

campos.forEach((campo) => {
  const input = document.getElementById(campo);

  input.addEventListener("input", (e) => {
    jogador[campo] = e.target.value;
    atualizarBiotipo();
  });
});

// ==============================
// BIOTIPO E DESLOCAMENTO
// ==============================
const biotipoSpan = document.getElementById("biotipo");
const casasSpan = document.getElementById("casas");

function calcularBiotipo(jogador) {
  const { nome, peso, altura, idade } = jogador;

  // PIADA CANÔNICA
  if (nome.toLowerCase() === "luiz") {
    return { tipo: "BagreKKKKKKKK", casas: 3 };
  }

  if (!peso || !altura) return null;

  if (idade >= 33) {
    return { tipo: "Velho / Fora de forma", casas: 3 };
  }

  const indice = peso / (altura * altura);

  if (indice >= 28) {
    return { tipo: "Pesado", casas: 4 };
  }

  if (indice >= 23) {
    return { tipo: "Normal", casas: 5 };
  }

  if (indice >= 20) {
    return { tipo: "Leve", casas: 6 };
  }

  return { tipo: "Extraleve", casas: 7 };
}


function atualizarBiotipo() {
  const resultado = calcularBiotipo(jogador);

  if (!resultado) {
    biotipoSpan.textContent = "—";
    casasSpan.textContent = "—";
    return;
  }

  biotipoSpan.textContent = resultado.tipo;
  casasSpan.textContent = resultado.casas;
}

// ==============================
// CATEGORIAS E PONTOS
// ==============================
const categorias = {
  base: 9,
  reserva: 11,
  titular: 14,
  destaque: 17,
  selecao: 25,
  top10: 30,
  melhor: 40
};

const categoriaSelect = document.getElementById("categoria-select");
const pontosSpan = document.getElementById("pontos-disponiveis");

categoriaSelect.addEventListener("change", () => {
  const categoria = categoriaSelect.value;

  if (!categoria) {
    pontosSpan.textContent = "—";
    return;
  }

  pontosSpan.textContent = categorias[categoria];
});

// ==============================
// ATRIBUTOS
// ==============================
const atributos = [
  "agilidade",
  "tatico",
  "forca",
  "finalizacao",
  "defesa",
  "interceptacao"
];

atributos.forEach((atributo) => {
  const input = document.getElementById(atributo);
  const span = document.getElementById(`${atributo}-dado`);

  input.addEventListener("input", () => {
    const valor = Number(input.value) || 0;
    const bonus = valor * 2;

    span.textContent = `d30 + ${bonus}`;
  });
});

