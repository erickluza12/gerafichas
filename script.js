// javascript
// (conteúdo de `script.js` com a inicialização do select custom movida para fora de atualizarBadges)

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
// FOTO DO JOGADOR
// ==============================
const uploadFoto = document.getElementById("upload-foto");
const previewFoto = document.getElementById("preview-foto");

uploadFoto.addEventListener("change", () => {
  const arquivo = uploadFoto.files[0];
  if (!arquivo) return;

  const reader = new FileReader();
  reader.onload = () => {
    previewFoto.src = reader.result;
  };
  reader.readAsDataURL(arquivo);
});

// ==============================
// LIGA E TIME
// ==============================
const ligaSelect = document.getElementById("liga-select");
const timeSelect = document.getElementById("time-select");
const ligaIcone = document.getElementById("liga-icone");
const timeIcone = document.getElementById("time-icone");

timeSelect.disabled = true;

ligaSelect.addEventListener("change", () => {
  const ligaKey = ligaSelect.value;

  timeSelect.innerHTML = "";
  if (timeIcone) timeIcone.innerHTML = "";

  if (!ligaKey) {
    if (ligaIcone) ligaIcone.innerHTML = "";
    timeSelect.disabled = true;
    return;
  }

  const liga = ligas[ligaKey];

  if (!liga) {
    console.error("Liga não encontrada:", ligaKey);
    timeSelect.disabled = true;
    return;
  }

  // não exibimos ícone/emoji separado; emojis aparecem apenas nas opções

  liga.times.forEach((time, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = time.nome;
    timeSelect.appendChild(option);
  });

  timeSelect.disabled = false;
  // se quiser selecionar automaticamente o primeiro time:
  // timeSelect.value = 0;
  // timeSelect.dispatchEvent(new Event('change'));
});

timeSelect.addEventListener("change", () => {
  const liga = ligas[ligaSelect.value];
  const time = liga && liga.times[timeSelect.value];

  // não exibimos ícone/emoji separado; emojis aparecem apenas nas opções
});

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
  // quando a categoria muda, garantir que o número de badges selecionadas
  // não exceda o limite da nova categoria
  const permitido = badgesPorCategoria[categoria] || 0;
  if (selectedBadges.size > permitido) {
    // remove as mais recentes (mantém ordem de inserção do Set)
    const atuais = Array.from(selectedBadges);
    const manter = atuais.slice(0, permitido);
    selectedBadges.clear();
    manter.forEach(n => selectedBadges.add(n));
  }
  // re-renderiza as badges para aplicar mudanças visuais
  atualizarBadges();
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
// mapa para lembrar o estado anterior das badges e animar transições
const prevBadgeStates = new Map();
// conjunto das badges que o jogador já escolheu (selecionadas)
const selectedBadges = new Set();

// limites de badges por categoria
const badgesPorCategoria = {
  base: 0,
  reserva: 1,
  titular: 2,
  destaque: 3,
  selecao: 4,
  top10: 5,
  melhor: 6
};

function podeUsarBadge(badge) {
  const r = badge.requisitos;

  if (r.agilidade && atributosEstado.agilidade < r.agilidade) return false;
  if (r.tatico && atributosEstado.tatico < r.tatico) return false;
  if (r.forca && atributosEstado.forca < r.forca) return false;
  if (r.finalizacao && atributosEstado.finalizacao < r.finalizacao) return false;
  if (r.defesa && atributosEstado.defesa < r.defesa) return false;
  if (r.interceptacao && atributosEstado.interceptacao < r.interceptacao) return false;

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

  const categoriaAtual = categoriaSelect.value;
  const limite = badgesPorCategoria[categoriaAtual] || 0;

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

    // wrapper para o texto + tooltip (mantemos estrutura)
    div.appendChild(tooltip);

    // se esta badge estava selecionada mas agora não é mais ativa, remove seleção
    if (selectedBadges.has(badge.nome) && !ativa) {
      selectedBadges.delete(badge.nome);
    }

    // aplicar marcação visual caso esteja selecionada
    if (selectedBadges.has(badge.nome)) {
      div.classList.add('selected');
    }

    // click handler: só permite selecionar/desselecionar se badge estiver ativa
    div.addEventListener('click', () => {
      if (!ativa) return; // não faz nada se não disponível

      if (selectedBadges.has(badge.nome)) {
        // desselciona
        selectedBadges.delete(badge.nome);
        div.classList.remove('selected');
        return;
      }

      // se ainda houver espaço, seleciona
      if (selectedBadges.size < limite) {
        selectedBadges.add(badge.nome);
        div.classList.add('selected');
      } else {
        // animação de aviso (shake)
        div.classList.add('shake');
        setTimeout(() => div.classList.remove('shake'), 300);
      }
    });

    gridBadges.appendChild(div);

    // animação quando a badge acaba de ficar ativa
    const wasActive = prevBadgeStates.get(badge.nome) || false;
    if (ativa && !wasActive) {
      div.classList.add('pop');
      setTimeout(() => div.classList.remove('pop'), 350);
    }
    prevBadgeStates.set(badge.nome, ativa);
  });
}

// ==============================
// SELECT CUSTOM - LIGA (inicializa uma vez)
// ==============================
function initCustomSelects() {
  const ligaCustom = document.getElementById("liga-custom");
  const ligaSelected = ligaCustom.querySelector(".selected span");
  const ligaOptions = ligaCustom.querySelector(".options");

  const timeCustom = document.getElementById("time-custom");
  const timeSelected = timeCustom.querySelector(".selected span");
  const timeOptions = timeCustom.querySelector(".options");

  // obtém referência segura ao objeto `ligas` (pode estar definido como const no escopo global)
  const ligasObj = (typeof ligas !== 'undefined') ? ligas : (window.ligas || null);

  if (!ligasObj) {
    console.error("Objeto `ligas` não encontrado.");
    return;
  }

  // limpa antes de preencher (evita duplicação)
  ligaOptions.innerHTML = "";

  // também popula o select nativo de ligas (usado pelos handlers existentes)
  if (typeof ligaSelect !== 'undefined' && ligaSelect) {
    ligaSelect.innerHTML = "";
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Selecione';
    ligaSelect.appendChild(placeholder);
  }

  // Preenche ligas
  Object.entries(ligasObj).forEach(([key, liga]) => {
    const div = document.createElement("div");
    div.className = "option";
    // separa emoji e nome em spans (emoji visível somente dentro das opções)
    div.innerHTML = `
      <span class="emoji">${liga.emoji ? liga.emoji : ''}</span>
      <span class="name">${liga.nome}</span>
    `;

    div.addEventListener("click", (e) => {
      // evitar que o clique suba para o container e reabra/feche o dropdown
      e.stopPropagation();

      // remove seleção anterior e marca esta opção
      ligaOptions.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
      div.classList.add('selected');

      // atualiza visual do custom select (somente o nome — emoji fica só nas opções)
      // substitui todo o conteúdo de `.selected` para evitar restos
      ligaCustom.querySelector('.selected').innerHTML = `<span class="name">${liga.nome}</span>`;
      // fechar com animação
      closeCustom(ligaCustom);

      // animação rápida no campo selected
      const sel = ligaCustom.querySelector('.selected');
      sel.classList.add('pulse');
      setTimeout(() => sel.classList.remove('pulse'), 250);

      // sincroniza com select nativo e dispara evento para popular times e mostrar ícone
      if (typeof ligaSelect !== 'undefined' && ligaSelect) {
        ligaSelect.value = key;
        ligaSelect.dispatchEvent(new Event("change"));
      } else {
        // se não houver select nativo, chama manualmente a lógica de mudança
        // (mantido por compatibilidade)
        const evt = new Event('change');
        document.dispatchEvent(evt);
      }

      // limpa time custom quando liga muda
      timeOptions.innerHTML = "";
      timeSelected.textContent = "Selecione o time";
      timeCustom.classList.remove("disabled");

      // popula times no custom select também
      liga.times.forEach((time, index) => {
        const tdiv = document.createElement("div");
        tdiv.className = "option";
        tdiv.innerHTML = `
          <span class="emoji">${time.emoji ? time.emoji : ''}</span>
          <span class="name">${time.nome}</span>
        `;

        tdiv.addEventListener("click", (e) => {
          e.stopPropagation();

          // remove seleção anterior e marca esta opção
          timeOptions.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
          tdiv.classList.add('selected');

          // mostra o nome com emoji no campo selecionado
          timeCustom.querySelector('.selected').innerHTML = `
            <span class="emoji">${time.emoji ? time.emoji : ''}</span>
            <span class="name">${time.nome}</span>
          `;
          // fechar com animação
          closeCustom(timeCustom);

          // animação rápida no campo selected
          const tsel = timeCustom.querySelector('.selected');
          tsel.classList.add('pulse');
          setTimeout(() => tsel.classList.remove('pulse'), 250);

          // sincroniza com select nativo e dispara evento
          if (typeof timeSelect !== 'undefined' && timeSelect) {
            timeSelect.value = index;
            timeSelect.dispatchEvent(new Event("change"));
          }
        });

        timeOptions.appendChild(tdiv);
      });
    });

    ligaOptions.appendChild(div);

    // também cria opção correspondente no select nativo
    if (typeof ligaSelect !== 'undefined' && ligaSelect) {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = liga.nome;
      ligaSelect.appendChild(opt);
    }
  });

  ligaCustom.addEventListener("click", () => {
    ligaCustom.classList.toggle("open");
  });

  timeCustom.addEventListener("click", () => {
    if (!timeCustom.classList.contains("disabled")) {
      timeCustom.classList.toggle("open");
    }
  });
}

// helper para fechar dropdown com animação (adiciona classe 'closing' e espera transitionend)
function closeCustom(custom) {
  const options = custom.querySelector('.options');
  // se já está fechado, nada a fazer
  if (!custom.classList.contains('open')) return;
  custom.classList.add('closing');
  // remove a classe open para iniciar a transição de fechamento
  custom.classList.remove('open');
  const onEnd = (e) => {
    if (e.target !== options) return;
    // só reage à transição do max-height/opacity
    options.removeEventListener('transitionend', onEnd);
    custom.classList.remove('closing');
  };
  options.addEventListener('transitionend', onEnd);
}

// inicializa selects custom uma vez ao carregar o script
initCustomSelects();

// fecha dropdowns abertos ao clicar fora
document.addEventListener('click', (e) => {
  document.querySelectorAll('.custom-select.open').forEach((cs) => {
    if (!cs.contains(e.target)) {
      closeCustom(cs);
    }
  });
});

// chamada inicial para mostrar pontos / biotipo / badges corretos na inicialização
atualizarBiotipo();
atualizarPontos();
atualizarBadges();
