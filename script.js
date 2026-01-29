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
// IDENTIDADE
// ==============================
const camposIdentidade = ["nome", "posicao", "idade", "altura", "peso"];

camposIdentidade.forEach((campo) => {
  const input = document.getElementById(campo);

  input.addEventListener("input", (e) => {
    jogador[campo] = e.target.value;
    atualizarBiotipo();
    atualizarBadges();
  });
});

// ==============================
// BIOTIPO
// ==============================
const biotipoSpan = document.getElementById("biotipo");
const casasSpan = document.getElementById("casas");

function calcularBiotipo({ nome, peso, altura, idade }) {
  if (nome && nome.toLowerCase() === "luiz") {
    return { tipo: "BagreKKKKKKKK", casas: 3 };
  }

  if (!peso || !altura) return null;

  if (idade >= 33) {
    return { tipo: "Velho / Fora de forma", casas: 3 };
  }

  const indice = peso / (altura * altura);

  if (indice >= 28) return { tipo: "Pesado", casas: 4 };
  if (indice >= 23) return { tipo: "Normal", casas: 5 };
  if (indice >= 20) return { tipo: "Leve", casas: 6 };

  return { tipo: "Extraleve", casas: 7 };
}

function atualizarBiotipo() {
  const r = calcularBiotipo(jogador);

  if (!r) {
    biotipoSpan.textContent = "—";
    casasSpan.textContent = "—";
    return;
  }

  biotipoSpan.textContent = r.tipo;
  casasSpan.textContent = r.casas;
}

// ==============================
// CATEGORIA
// ==============================
let pontosTotaisCategoria = 0;

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

  pontosTotaisCategoria = categoria ? categorias[categoria] : 0;
  pontosSpan.textContent = categoria ? pontosTotaisCategoria : "—";

  atualizarPontos();
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

const atributosEstado = {
  agilidade: 0,
  tatico: 0,
  forca: 0,
  finalizacao: 0,
  defesa: 0,
  interceptacao: 0
};

function somaAtributos() {
  return Object.values(atributosEstado).reduce((a, b) => a + b, 0);
}

atributos.forEach((atributo) => {
  const input = document.getElementById(atributo);
  const span = document.getElementById(`${atributo}-dado`);

  input.addEventListener("input", () => {
    const novoValor = Number(input.value) || 0;
    const valorAnterior = atributosEstado[atributo];

    const somaSimulada =
      somaAtributos() - valorAnterior + novoValor;

    if (pontosTotaisCategoria && somaSimulada > pontosTotaisCategoria) {
      input.value = valorAnterior;
      return;
    }

    atributosEstado[atributo] = novoValor;
    span.textContent = `d30 + ${novoValor * 2}`;

    atualizarPontos();
    atualizarBadges();
  });
});

// ==============================
// PONTOS
// ==============================
const pontosUsadosSpan = document.getElementById("pontos-usados");
const pontosRestantesSpan = document.getElementById("pontos-restantes");

function atualizarPontos() {
  const usados = somaAtributos();
  const restantes = pontosTotaisCategoria - usados;

  pontosUsadosSpan.textContent = usados;
  pontosRestantesSpan.textContent =
    pontosTotaisCategoria ? restantes : "—";
}

// ==============================
// BADGES
// ==============================

const gridBadges = document.getElementById("grid-badges");

function podeUsarBadge(badge) {
  const r = badge.requisitos;

  if (r.agilidade && atributosEstado.agilidade < r.agilidade) return false;
  if (r.forca && atributosEstado.forca < r.forca) return false;
  if (r.finalizacao && atributosEstado.finalizacao < r.finalizacao) return false;
  if (r.defesa && atributosEstado.defesa < r.defesa) return false;

  if (r.idade && jogador.idade < r.idade) return false;
  if (r.pesoMin && jogador.peso < r.pesoMin) return false;
  if (r.pesoMax && jogador.peso > r.pesoMax) return false;
  if (r.alturaMin && jogador.altura < r.alturaMin) return false;
  if (r.alturaMax && jogador.altura > r.alturaMax) return false;

  return true;
}

function formatarRequisitos(requisitos) {
  return Object.entries(requisitos)
    .map(([k, v]) => {
      if (k.endsWith("Min")) return `${k.replace("Min", "")} ≥ ${v}`;
      if (k.endsWith("Max")) return `${k.replace("Max", "")} ≤ ${v}`;
      return `${k} ≥ ${v}`;
    })
    .join("<br>");
}

function atualizarBadges() {
  gridBadges.innerHTML = "";

  badges.forEach((badge) => {
    const ativa = podeUsarBadge(badge);

    const div = document.createElement("div");
    div.className = `badge ${ativa ? "ativa" : "inativa"}`;
    div.textContent = badge.nome;

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = `
      <strong>${badge.nome}</strong><br><br>
      ${badge.descricao}<br><br>
      <em>Requisitos:</em><br>
      ${formatarRequisitos(badge.requisitos)}
    `;

    div.appendChild(tooltip);
    gridBadges.appendChild(div);
  });
}
