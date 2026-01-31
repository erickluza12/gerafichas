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

// Nota: o fluxo de upload e definição da imagem agora é gerenciado pelo cropper
// (setupCropper) que abre o modal, permite recorte e então define preview-foto.

// ==============================
// LIGA E TIME
// ==============================
const ligaSelect = document.getElementById("liga-select");
const timeSelect = document.getElementById("time-select");
const ligaIcone = document.getElementById("liga-icone");
const timeIcone = document.getElementById("time-icone");

if (timeSelect) timeSelect.disabled = true;

if (ligaSelect) {
  ligaSelect.addEventListener("change", () => {
    const ligaKey = ligaSelect.value;

    if (timeSelect) timeSelect.innerHTML = "";
    if (timeIcone) timeIcone.innerHTML = "";

    if (!ligaKey) {
      if (ligaIcone) ligaIcone.innerHTML = "";
      if (timeSelect) timeSelect.disabled = true;
      return;
    }

    const liga = (window.ligas || ligas)[ligaKey];

    if (!liga) {
      console.error("Liga não encontrada:", ligaKey);
      if (timeSelect) timeSelect.disabled = true;
      return;
    }

    // popula select nativo de times
    if (timeSelect) {
      liga.times.forEach((time, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = time.nome;
        timeSelect.appendChild(option);
      });

      timeSelect.disabled = false;
    }
  });
} else {
  console.warn('liga-select não encontrado no DOM durante a inicialização.');
}

if (timeSelect) {
  timeSelect.addEventListener("change", () => {
    // intencionalmente leve; custom select lida com a exibição
  });
}

// ==============================
// IDENTIDADE
// ==============================
const camposIdentidade = ["nome", "posicao", "idade", "altura", "peso"];

camposIdentidade.forEach((campo) => {
  const input = document.getElementById(campo);
  if (!input) return;

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
  if (nome && nome.toLowerCase() === "Marco Afonso") {
    return { tipo: "Barco Odontos é Reserva", casas: 3 };
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
  if (!input) return;

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
    if (span) span.textContent = `d30 + ${novoValor * 2}`;

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
  if (!gridBadges) return;
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
  const timeCustom = document.getElementById("time-custom");

  // Proteção: se os elementos principais não existem, não tenta inicializar o select custom
  if (!ligaCustom || !timeCustom) {
    console.warn('Init custom selects: elementos do custom select não encontrados.');
    return false;
  }

  const ligaSelected = ligaCustom.querySelector(".selected span");
  const ligaOptions = ligaCustom.querySelector(".options");

  const timeSelected = timeCustom.querySelector(".selected span");
  const timeOptions = timeCustom.querySelector(".options");

  // obtém referência segura ao objeto `ligas` (pode estar definido como const no escopo global)
  const ligasObj = (typeof ligas !== 'undefined') ? ligas : (window.ligas || null);

  if (!ligasObj) {
    console.error("Objeto `ligas` não encontrado.");
    return false;
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
    const willOpen = !ligaCustom.classList.contains('open');
    ligaCustom.classList.toggle("open");
    if (willOpen) bringToFront(ligaCustom);
  });

  timeCustom.addEventListener("click", () => {
    if (!timeCustom.classList.contains("disabled")) {
      const willOpen = !timeCustom.classList.contains('open');
      timeCustom.classList.toggle("open");
      if (willOpen) bringToFront(timeCustom);
    }
  });

  return true;
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
    // restaura z-index para evitar stacking permanente
    custom.style.zIndex = '';
    if (options) options.style.zIndex = '';
  };
  options.addEventListener('transitionend', onEnd);
}

// helper: traz um custom-select para frente (ajusta z-index dinamicamente)
function bringToFront(custom) {
  const all = document.querySelectorAll('.custom-select');
  all.forEach(el => {
    if (el === custom) {
      el.style.zIndex = 20000;
      // também garante que as options tenham z-index alto
      const opts = el.querySelector('.options'); if (opts) opts.style.zIndex = 20001;
    } else {
      el.style.zIndex = 'auto';
      const opts = el.querySelector('.options'); if (opts) opts.style.zIndex = '';
    }
  });
}

// Inicialização protegida: se ocorrer um erro, mostramos uma barra visível e não deixamos o JS quebrar a UI
function showInitError(message) {
  console.error(message);
  let existing = document.getElementById('app-error');
  if (!existing) {
    existing = document.createElement('div');
    existing.id = 'app-error';
    existing.style.position = 'fixed';
    existing.style.left = '12px';
    existing.style.right = '12px';
    existing.style.top = '12px';
    existing.style.background = '#ff4d4f';
    existing.style.color = '#fff';
    existing.style.padding = '8px 14px';
    existing.style.zIndex = 999999;
    existing.style.fontFamily = 'Arial, Helvetica, sans-serif';
    existing.style.fontSize = '13px';
    existing.style.boxShadow = '0 6px 18px rgba(0,0,0,0.4)';
    existing.style.borderRadius = '6px';
    existing.style.display = 'flex';
    existing.style.alignItems = 'center';
    existing.style.justifyContent = 'space-between';

    const msg = document.createElement('div');
    msg.id = 'app-error-msg';
    msg.style.flex = '1';
    msg.style.marginRight = '12px';
    existing.appendChild(msg);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.title = 'Fechar';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.color = '#fff';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', () => existing.remove());
    existing.appendChild(closeBtn);

    document.body.appendChild(existing);
  }
  const msg = existing.querySelector('#app-error-msg');
  if (msg) msg.textContent = 'Erro na inicialização da ficha: ' + message;
}

function runInit() {
  try {
    // inicializa selects custom uma vez ao carregar o script
    if (initCustomSelects()) window._customInited = true;

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

    // re-bind handlers seguros e adiciona botão de reinicialização
    try { safeBind(); } catch(e){ console.warn('safeBind failed in runInit', e); }
    try { addReinitButton(); } catch(e){ console.warn('addReinitButton failed', e); }
    try { addDebugPanel(); } catch(e){ console.warn('addDebugPanel failed', e); }
    // carrega passivas salvas
    try { loadPassivas(); } catch(e){ console.warn('loadPassivas failed', e); }
  } catch (err) {
    // mostra erro visível para o usuário e log no console
    showInitError((err && err.message) ? err.message : String(err));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}

// remove qualquer wrapper temporário de PDF que tenha ficado preso (limpeza de segurança)
const _oldWrap = document.getElementById('pdf-wrapper-temp');
if (_oldWrap && _oldWrap.parentNode) _oldWrap.parentNode.removeChild(_oldWrap);

// ==============================
// PASSIVAS (persistência simples)
// ==============================
const passivasText = document.getElementById('passivas-text');
const passivasSave = document.getElementById('passivas-save');
const passivasClear = document.getElementById('passivas-clear');
const passivasStatus = document.getElementById('passivas-status');

function loadPassivas() {
  try {
    const v = localStorage.getItem('ficha_passivas');
    if (v) passivasText.value = v;
  } catch (e) {
    console.warn('Não foi possível carregar passivas:', e);
  }
}

function savePassivas() {
  try {
    // salva as passivas em localStorage
    localStorage.setItem('ficha_passivas', passivasText.value);
    passivasStatus.textContent = 'Salvo';
    setTimeout(() => passivasStatus.textContent = '', 1200);
  } catch (e) {
    passivasStatus.textContent = 'Erro ao salvar';
  }
}

function clearPassivas() {
  try {
    if (passivasText) passivasText.value = '';
    localStorage.removeItem('ficha_passivas');
    if (passivasStatus) passivasStatus.textContent = 'Limpo';
    setTimeout(() => { if (passivasStatus) passivasStatus.textContent = ''; }, 1200);
  } catch (e) {
    console.warn('clearPassivas error', e);
  }
}

// gera PDF da ficha usando html2pdf; versão robusta que monta um layout limpo a partir dos valores atuais
function generatePDF() {
  return new Promise((resolve, reject) => {
    const exportBtn = document.getElementById('export-pdf-btn');
    try {
      if (exportBtn) { exportBtn.disabled = true; exportBtn.textContent = 'Gerando...'; }
      if (typeof html2canvas === 'undefined') throw new Error('html2canvas não carregado');

      const fichaEl = document.getElementById('ficha');
      if (!fichaEl) throw new Error('#ficha não encontrado para captura');

      const nome = (document.getElementById('nome') && document.getElementById('nome').value.trim()) || 'ficha';
      const filename = `${nome.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.pdf`;

      document.querySelectorAll('.custom-select.open').forEach(cs => cs.classList.remove('open'));
      const fichaStyle = getComputedStyle(fichaEl);
      const bg = fichaStyle.backgroundColor || getComputedStyle(document.body).backgroundColor || '#ffffff';

      const imgs = fichaEl.querySelectorAll('img');
      const waitForImages = new Promise((res) => {
        if (!imgs || imgs.length === 0) return res();
        let remaining = imgs.length;
        const onFinish = () => { remaining--; if (remaining <= 0) res(); };
        const onErr = () => { remaining--; if (remaining <= 0) res(); };
        imgs.forEach((img) => {
          if (img.complete && img.naturalWidth !== 0) return onFinish();
          img.addEventListener('load', onFinish);
          img.addEventListener('error', onErr);
        });
        setTimeout(res, 2000);
      });

      waitForImages.then(() => {
        // Para evitar erro de canvas com largura/altura 0 (e problemas com elementos ocultos),
        // clonamos o elemento `#ficha`, anexamos fora da viewport com tamanho fixo e
        // capturamos o clone com html2canvas. Depois removemos o clone.
        try {
          // Oculta temporariamente canvases e imagens problemáticas na página inteira
          const hiddenCanvases = Array.from(document.querySelectorAll('canvas')).map(c => {
            const prev = c.style.display || '';
            c.dataset._pdf_prev_display = prev;
            c.style.display = 'none';
            return c;
          });
          const hiddenImgs = Array.from(document.querySelectorAll('img')).filter(img => !img.src || img.naturalWidth === 0).map(img => {
            const prev = img.style.display || '';
            img.dataset._pdf_prev_display = prev;
            img.style.display = 'none';
            return img;
          });

           const rect = fichaEl.getBoundingClientRect();
           const clone = fichaEl.cloneNode(true);
           clone.id = 'pdf-clone-temp';
           // garante que o clone seja renderizado com o mesmo tamanho
           clone.style.position = 'absolute';
           clone.style.left = '-9999px';
           clone.style.top = '0px';
           // fallback para casos onde rect.width/height seja 0
           const fallbackWidth = rect.width || fichaEl.offsetWidth || fichaEl.scrollWidth || 900;
           const fallbackHeight = rect.height || fichaEl.offsetHeight || fichaEl.scrollHeight || 1100;
           clone.style.width = (fallbackWidth) + 'px';
           clone.style.height = (fallbackHeight) + 'px';
           // força background sólido caso gradientes não sejam aplicados ao clone
           clone.style.background = fichaStyle.backgroundColor || bg;
          // remove dropdowns/menus abertos dentro do clone para não atrapalhar
          clone.querySelectorAll('.options').forEach(o => { o.style.display = 'none'; });
          // remove quaisquer <canvas> dentro do clone (evita erro createPattern com canvases 0x0)
          clone.querySelectorAll('canvas').forEach(c => c.parentNode && c.parentNode.removeChild(c));
          // também remove imagens com src vazio para evitar elementos com naturalWidth 0
          clone.querySelectorAll('img').forEach(img => { if (!img.src) img.remove(); });
           document.body.appendChild(clone);

          // espera imagens internas do clone carregarem
          const cloneImgs = clone.querySelectorAll('img');
          const waitCloneImgs = new Promise((res) => {
            if (!cloneImgs || cloneImgs.length === 0) return res();
            let remaining = cloneImgs.length;
            const onFinish = () => { remaining--; if (remaining <= 0) res(); };
            const onErr = () => { remaining--; if (remaining <= 0) res(); };
            cloneImgs.forEach((img) => {
              if (img.complete && img.naturalWidth !== 0) return onFinish();
              img.addEventListener('load', onFinish);
              img.addEventListener('error', onErr);
            });
            setTimeout(res, 2000);
          });

          waitCloneImgs.then(() => {
            html2canvas(clone, { scale: 2, useCORS: true, backgroundColor: bg }).then(canvas => {
              // attempt multiple strategies with detailed error reporting
              (async () => {
                try {
                  const imgData = canvas.toDataURL('image/png');

                  // 1) Try jsPDF (scale to A4 and keep aspect ratio)
                  const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF ? window.jsPDF : null);
                  if (jsPDFClass) {
                    try {
                      const pdf = new jsPDFClass('p', 'pt', 'a4');
                      const pageWidth = pdf.internal.pageSize.getWidth();
                      const pageHeight = pdf.internal.pageSize.getHeight();
                      // leave small margins
                      const margin = 20;
                      const availableWidth = pageWidth - margin * 2;
                      const availableHeight = pageHeight - margin * 2;
                      const imgWidth = canvas.width;
                      const imgHeight = canvas.height;
                      const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
                      const renderWidth = imgWidth * ratio;
                      const renderHeight = imgHeight * ratio;
                      let cursorY = margin;
                      // if image fits on one page, add and finish
                      pdf.addImage(imgData, 'PNG', margin, cursorY, renderWidth, renderHeight);
                      pdf.save(filename);
                      if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
                      resolve();
                      return;
                    } catch (err) {
                      console.warn('jsPDF falhou ao adicionar imagem:', err);
                      // continue to fallbacks
                    }
                  }

                  // 2) Try html2pdf fallback if available
                  if (typeof html2pdf !== 'undefined') {
                    try {
                      const opt = {
                        margin: 10,
                        filename: filename,
                        image: { type: 'png', quality: 0.98 },
                        html2canvas: { scale: 2, useCORS: true, backgroundColor: bg },
                        jsPDF: { unit: 'pt', format: 'a4', orientation: (canvas.width > canvas.height ? 'landscape' : 'portrait') }
                      };
                      await html2pdf().set(opt).from(fichaEl).save();
                      if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
                      resolve();
                      return;
                    } catch (err) {
                      console.warn('html2pdf fallback falhou:', err);
                    }
                  }

                  // 3) Final fallback: download PNG from canvas
                  try {
                    if (canvas.toBlob) {
                      canvas.toBlob((blob) => {
                        if (!blob) {
                          throw new Error('canvas.toBlob retornou null');
                        }
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = filename.replace(/\.pdf$/, '.png');
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        URL.revokeObjectURL(url);
                        if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
                        resolve();
                      }, 'image/png', 0.98);
                      return;
                    } else {
                      // no toBlob support: open data URL in new tab
                      const w = window.open('', '_blank');
                      w.document.write('<img src="' + imgData + '"/>');
                      if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
                      resolve();
                      return;
                    }
                  } catch (err) {
                    console.error('Fallback PNG download falhou:', err);
                    throw err;
                  }

                } catch (err) {
                  if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
                  console.error('Erro interno ao gerar PDF:', err);
                  reject(err);
                }
              })();
              // limpeza do clone
              try { if (clone && clone.parentNode) clone.parentNode.removeChild(clone); } catch(e){/* ignore */}
              // restaura canvases/imagens previamente ocultos
              try { hiddenCanvases.forEach(c => { if (c && c.dataset && c.dataset._pdf_prev_display !== undefined) { c.style.display = c.dataset._pdf_prev_display; delete c.dataset._pdf_prev_display; } }); } catch(e){}
              try { hiddenImgs.forEach(i => { if (i && i.dataset && i.dataset._pdf_prev_display !== undefined) { i.style.display = i.dataset._pdf_prev_display; delete i.dataset._pdf_prev_display; } }); } catch(e){}
            }).catch(err => {
              try { if (clone && clone.parentNode) clone.parentNode.removeChild(clone); } catch(e){/* ignore */}
              if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
              // restaura canvases/imagens previamente ocultos
              try { hiddenCanvases.forEach(c => { if (c && c.dataset && c.dataset._pdf_prev_display !== undefined) { c.style.display = c.dataset._pdf_prev_display; delete c.dataset._pdf_prev_display; } }); } catch(e){}
              try { hiddenImgs.forEach(i => { if (i && i.dataset && i.dataset._pdf_prev_display !== undefined) { i.style.display = i.dataset._pdf_prev_display; delete i.dataset._pdf_prev_display; } }); } catch(e){}
              console.error('html2canvas falhou (clone):', err);
              reject(err);
            });
          }).catch(err => {
            try { if (clone && clone.parentNode) clone.parentNode.removeChild(clone); } catch(e){/* ignore */}
            if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
            // restaura canvases/imagens previamente ocultos
            try { hiddenCanvases.forEach(c => { if (c && c.dataset && c.dataset._pdf_prev_display !== undefined) { c.style.display = c.dataset._pdf_prev_display; delete c.dataset._pdf_prev_display; } }); } catch(e){}
            try { hiddenImgs.forEach(i => { if (i && i.dataset && i.dataset._pdf_prev_display !== undefined) { i.style.display = i.dataset._pdf_prev_display; delete i.dataset._pdf_prev_display; } }); } catch(e){}
            console.error('waitCloneImgs falhou:', err);
            reject(err);
          });
        } catch (err) {
          // restaura canvases/imagens previamente ocultos (caso tenham sido definidos)
          try { if (typeof hiddenCanvases !== 'undefined') hiddenCanvases.forEach(c => { if (c && c.dataset && c.dataset._pdf_prev_display !== undefined) { c.style.display = c.dataset._pdf_prev_display; delete c.dataset._pdf_prev_display; } }); } catch(e){}
          try { if (typeof hiddenImgs !== 'undefined') hiddenImgs.forEach(i => { if (i && i.dataset && i.dataset._pdf_prev_display !== undefined) { i.style.display = i.dataset._pdf_prev_display; delete i.dataset._pdf_prev_display; } }); } catch(e){}
          if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
          console.error('Erro ao preparar clone para PDF:', err);
          reject(err);
        }
      }).catch(err => {
         if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
         console.error('waitForImages falhou:', err);
         reject(err);
       });
    } catch (err) {
      if (exportBtn) { exportBtn.disabled = false; exportBtn.textContent = 'Exportar PDF'; }
      console.error('generatePDF falhou rapidamente:', err);
      reject(err);
    }
  });
}

// Export simplified card as PNG (drawn manually onto a canvas)
async function exportCardAsPNG() {
  return new Promise((resolve, reject) => {
    try {
      const nome = (document.getElementById('nome') && document.getElementById('nome').value.trim()) || 'Jogador';
      const idade = (document.getElementById('idade') && document.getElementById('idade').value) || '';
      const altura = (document.getElementById('altura') && document.getElementById('altura').value) || '';
      const peso = (document.getElementById('peso') && document.getElementById('peso').value) || '';
      const biotipo = (document.getElementById('biotipo') && document.getElementById('biotipo').textContent) || '';
      const casas = (document.getElementById('casas') && document.getElementById('casas').textContent) || '';
      // categoria: mostra rótulo amigável e pontos da categoria
      const categoriaSel = (document.getElementById('categoria-select') && document.getElementById('categoria-select').value) || '';
      const categoriaLabels = {
        base: '🍼 Base / Novato',
        reserva: '🧑‍🎓 Reserva',
        titular: '🎯 Titular Regular',
        destaque: '🦾 Destaque do Time',
        selecao: '🌍 Seleção',
        top10: '🏆 Top 10 do Mundo',
        melhor: '🥇 Melhor do Mundo'
      };
      const pontosCat = (categorias && categorias[categoriaSel]) ? categorias[categoriaSel] : 0;
             // liga/time: try custom select first
             const ligaName = (document.querySelector('#liga-custom .selected .name') && document.querySelector('#liga-custom .selected .name').textContent) || ((typeof ligaSelect !== 'undefined' && ligaSelect.value && (window.ligas || ligas)[ligaSelect.value]) ? (window.ligas || ligas)[ligaSelect.value].nome : '');
             const timeName = (document.querySelector('#time-custom .selected .name') && document.querySelector('#time-custom .selected .name').textContent) || ((typeof timeSelect !== 'undefined' && timeSelect.value && ligaSelect.value) ? ((window.ligas || ligas)[ligaSelect.value].times[timeSelect.value] && (window.ligas || ligas)[ligaSelect.value].times[timeSelect.value].nome) : '');
      // atributos: use atributosEstado
      const attrOrder = ['agilidade','tatico','forca','finalizacao','defesa','interceptacao'];
      const attrs = attrOrder.map(a => ({ key: a, value: atributosEstado[a] || 0 }));
      // badges: selectedBadges set -> array
      const selBadges = Array.from(selectedBadges || []);
      // passivas
      const passivas = (document.getElementById('passivas-text') && document.getElementById('passivas-text').value) || '';
      // image
      const preview = document.getElementById('preview-foto');
      const imgSrc = preview && preview.src ? preview.src : null;

      // canvas dimensions (card-like)
      const W = 1200; const H = 700;
      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');

      // background gradient
      const g = ctx.createLinearGradient(0,0,0,H);
      g.addColorStop(0, '#0f1115'); g.addColorStop(1, '#14171a');
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

      // card frame
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fillRect(20,20,W-40,H-40);
      // title
      ctx.fillStyle = '#e9f8ef'; ctx.font = 'bold 36px Arial';
      ctx.fillText('FICHA DE JOGADOR', 40, 70);

      // player image area (left)
      const imgX = 40; const imgY = 100; const imgW = 360; const imgH = 460;
      ctx.fillStyle = '#0b0b0b'; ctx.fillRect(imgX-6,imgY-6,imgW+12,imgH+12);
      ctx.fillStyle = '#111'; ctx.fillRect(imgX,imgY,imgW,imgH);
      if (imgSrc) {
        const pi = new Image();
        // try to avoid taint: most images are dataURL or local
        pi.crossOrigin = 'anonymous';
        pi.onload = () => {
          // draw cover-fit
          const ratio = Math.max(imgW / pi.naturalWidth, imgH / pi.naturalHeight);
          const dw = pi.naturalWidth * ratio; const dh = pi.naturalHeight * ratio;
          const dx = imgX + (imgW - dw) / 2; const dy = imgY + (imgH - dh) / 2;
          ctx.drawImage(pi, dx, dy, dw, dh);
          drawTextAndExtras();
        };
        pi.onerror = () => { drawTextAndExtras(); };
        pi.src = imgSrc;
      } else {
        // placeholder silhouette
        ctx.fillStyle = '#222'; ctx.fillRect(imgX,imgY,imgW,imgH);
        ctx.fillStyle = '#666'; ctx.font = 'bold 20px Arial'; ctx.fillText('Sem imagem', imgX + 20, imgY + 30);
        drawTextAndExtras();
      }

      function drawTextAndExtras(){
        // right side: main info box (moved further to the right to avoid overlay on image)
        const rx = imgX + imgW + 60; const ry = imgY; const rw = W - rx - 40; const rh = imgH;
        // name and basic info
        ctx.fillStyle = '#fff'; ctx.font = 'bold 30px Arial'; ctx.fillText(nome, rx, ry + 36);
        // draw category tag just under the name
        const catLabel = categoriaLabels[categoriaSel] || (categoriaSel ? categoriaSel : 'Teste Livre');
        const catText = `${catLabel} • ${pontosCat} pts`;
        ctx.font = 'bold 13px Arial';
        // small palette for categories
        const catColors = {
          base: '#6c6c6c',
          reserva: '#4da6ff',
          titular: '#2ecc71',
          destaque: '#ff9f1a',
          selecao: '#8e44ad',
          top10: '#f4d03f',
          melhor: '#f39c12'
        };
        const catColor = catColors[categoriaSel] || '#6c6c6c';
        const catPadding = 12;
        const catH = 26;
        const catW = ctx.measureText(catText).width + catPadding * 2;
        // rounded rect background
        const rxBox = rx; const ryBox = ry + 46;
        ctx.fillStyle = catColor;
        // draw rounded rect (simple) using path
        const radius = 6;
        ctx.beginPath();
        ctx.moveTo(rxBox + radius, ryBox);
        ctx.lineTo(rxBox + catW - radius, ryBox);
        ctx.quadraticCurveTo(rxBox + catW, ryBox, rxBox + catW, ryBox + radius);
        ctx.lineTo(rxBox + catW, ryBox + catH - radius);
        ctx.quadraticCurveTo(rxBox + catW, ryBox + catH, rxBox + catW - radius, ryBox + catH);
        ctx.lineTo(rxBox + radius, ryBox + catH);
        ctx.quadraticCurveTo(rxBox, ryBox + catH, rxBox, ryBox + catH - radius);
        ctx.lineTo(rxBox, ryBox + radius);
        ctx.quadraticCurveTo(rxBox, ryBox, rxBox + radius, ryBox);
        ctx.closePath();
        ctx.fill();
        // category text
        ctx.fillStyle = '#07100a';
        ctx.font = 'bold 13px Arial';
        ctx.fillText(catText, rxBox + catPadding, ryBox + 17);

        // attributes block
        ctx.fillStyle = '#dfeee0'; ctx.font = '18px Arial';
        ctx.fillText('Atributos:', rx, ry + 204);
        let ay = ry + 236; const lineH = 30;
        attrs.forEach(a => {
          const label = a.key.charAt(0).toUpperCase() + a.key.slice(1);
          ctx.fillStyle = '#bfecc0'; ctx.font = '16px Arial';
          ctx.fillText(`${label}: ${a.value}`, rx, ay);
          ay += lineH;
        });

        // badges
        ctx.fillStyle = '#dfeee0'; ctx.font = '18px Arial'; ctx.fillText('Badges selecionadas:', rx, ay + 6);
        let bx = rx; let by = ay + 36; const badgeH = 32; const badgeGap = 10; let badgeX = bx;
        selBadges.forEach((bname, idx) => {
          const text = bname;
          const pad = 12;
          ctx.font = '14px Arial';
          // colored background
          ctx.fillStyle = '#ffd166';
          // compute text width
          const tw = ctx.measureText(text).width + pad * 2;
          ctx.fillRect(badgeX, by, tw, badgeH);
          ctx.fillStyle = '#111'; ctx.fillText(text, badgeX + pad, by + 22);
          badgeX += tw + badgeGap;
          // wrap to next line
          if (badgeX > rx + rw - 60) { badgeX = bx; by += badgeH + 8; }
        });

        // passivas block at bottom area (preserve manual line breaks and wrap each paragraph)
        const passX = 40; const passY = imgY + imgH + 20; const passW = W - 80; const passH = 120;
        ctx.fillStyle = 'rgba(255,255,255,0.02)'; ctx.fillRect(passX, passY, passW, passH);
        ctx.fillStyle = '#dfeee0'; ctx.font = '18px Arial'; ctx.fillText('Passivas:', passX + 10, passY + 28);
        ctx.fillStyle = '#cfe6d4'; ctx.font = '14px Arial';
        // wrap passivas text preserving manual newlines
        const maxLineWidth = passW - 20;
        const paragraphs = passivas.split(/\r?\n/);
        let ly = passY + 52;
        paragraphs.forEach((para, pidx) => {
          const words = para.trim() ? para.split(/\s+/g) : [];
          let line = '';
          for (let i=0;i<words.length;i++){
            const test = (line ? line + ' ' : '') + words[i];
            const m = ctx.measureText(test).width;
            if (m > maxLineWidth) { ctx.fillText(line, passX + 10, ly); line = words[i]; ly += 20; }
            else { line = test; }
          }
          if (line) { ctx.fillText(line, passX + 10, ly); ly += 20; }
          // add a small gap between paragraphs
          ly += 6;
        });

        // footer small print
        ctx.fillStyle = '#9bbf9a'; ctx.font = '12px Arial';
        ctx.fillText('GeraFichas – cartão gerado localmente', W - 320, H - 20);

        // finally download
        try {
          if (canvas.toBlob) {
            canvas.toBlob((blob) => {
              if (!blob) { reject(new Error('Erro ao criar PNG')); return; }
              const filename = `${nome.replace(/\s+/g,'_')}_card.png`;
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
              resolve();
            }, 'image/png', 0.95);
          } else {
            const data = canvas.toDataURL('image/png');
            const a = document.createElement('a'); a.href = data; a.download = `${nome.replace(/\s+/g,'_')}_card.png`; document.body.appendChild(a); a.click(); a.remove();
            resolve();
          }
        } catch (err) { reject(err); }
      }

    } catch (err) {
      reject(err);
    }
  });
}

// Simple image upload -> preview behavior (restored per user request)
(function setupSimpleUpload(){
  const upload = document.getElementById('upload-foto');
  const preview = document.getElementById('preview-foto');
  const uploadBox = document.querySelector('.upload-box');
  const fotoContainer = document.querySelector('.foto');
  if (!upload || !preview || !fotoContainer) return;

  // reflect current state based on whether preview has a src
  try {
    const hasSrc = !!preview.src;
    fotoContainer.classList.toggle('has-photo', hasSrc);
    if (hasSrc) { preview.style.display = 'block'; }
    else { preview.style.display = 'none'; }
    if (uploadBox) uploadBox.style.display = hasSrc ? 'none' : 'flex';
  } catch(e){ console.debug('setupSimpleUpload:init', e); }

  upload.addEventListener('change', (e) => {
    const f = upload.files && upload.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        preview.src = reader.result;
        preview.alt = 'Foto do jogador';
        preview.style.display = 'block';
        fotoContainer.classList.add('has-photo');
        if (uploadBox) uploadBox.style.display = 'none';
      } catch(err) { console.error('Erro ao setar preview:', err); }
    };
    reader.readAsDataURL(f);
  });

  // clicking on the preview should allow changing the image
  preview.addEventListener('click', () => {
    if (upload) upload.click();
  });
})();

// ==============================
// SAFE BIND — re-ativa handlers se algo falhar
// ==============================
function safeBind() {
  try {
    // liga/time selects (nativo) — usado para sincronizar quando initCustomSelects usa nativo
    const lsel = document.getElementById('liga-select');
    const tsel = document.getElementById('time-select');
    if (lsel && lsel.dataset.bound !== '1') {
      lsel.addEventListener('change', () => {
        const ligaKey = lsel.value;
        if (!tsel) return;
        tsel.innerHTML = '';
        if (!ligaKey) { tsel.disabled = true; return; }
        const liga = (window.ligas || ligas)[ligaKey];
        if (!liga) { tsel.disabled = true; return; }
        liga.times.forEach((time, index) => {
          const opt = document.createElement('option'); opt.value = index; opt.textContent = time.nome; tsel.appendChild(opt);
        });
        tsel.disabled = false;
      });
      lsel.dataset.bound = '1';
    }

    if (tsel && tsel.dataset.bound !== '1') {
      tsel.addEventListener('change', () => {
        // nothing heavy here; custom select handles visible display
      });
      tsel.dataset.bound = '1';
    }

    // atributos inputs
    ['agilidade','tatico','forca','finalizacao','defesa','interceptacao'].forEach((atributo) => {
      const el = document.getElementById(atributo);
      if (el && el.dataset.bound !== '1') {
        el.addEventListener('input', () => {
          const novoValor = Number(el.value) || 0;
          atributosEstado[atributo] = novoValor;
          const span = document.getElementById(`${atributo}-dado`);
          if (span) span.textContent = `d30 + ${novoValor * 2}`;
          atualizarPontos();
          atualizarBadges();
        });
        el.dataset.bound = '1';
      }
    });

    // categoria select
    const cat = document.getElementById('categoria-select');
    if (cat && cat.dataset.bound !== '1') {
      cat.addEventListener('change', () => {
        const categoria = cat.value; pontosTotaisCategoria = categoria ? categorias[categoria] : 0; pontosSpan.textContent = categoria ? pontosTotaisCategoria : '—';
        atualizarPontos();
        const permitido = badgesPorCategoria[categoria] || 0;
        if (selectedBadges.size > permitido) {
          const atuais = Array.from(selectedBadges); const manter = atuais.slice(0, permitido); selectedBadges.clear(); manter.forEach(n => selectedBadges.add(n));
        }
        atualizarBadges();
      });
      cat.dataset.bound = '1';
    }

    // passivas buttons
    const saveBtn = document.getElementById('passivas-save');
    const clearBtn = document.getElementById('passivas-clear');
    const exportBtn = document.getElementById('export-pdf-btn');
    if (saveBtn && saveBtn.dataset.bound !== '1') { saveBtn.addEventListener('click', savePassivas); saveBtn.dataset.bound = '1'; }
    if (clearBtn && clearBtn.dataset.bound !== '1') { clearBtn.addEventListener('click', clearPassivas); clearBtn.dataset.bound = '1'; }
    if (exportBtn && exportBtn.dataset.bound !== '1') {
      exportBtn.addEventListener('click', () => {
        if (passivasStatus) passivasStatus.textContent = 'Gerando imagem...';
        exportCardAsPNG().then(()=>{
          if (passivasStatus) passivasStatus.textContent = 'Imagem gerada';
          setTimeout(()=>passivasStatus.textContent='',1400);
        }).catch(err=>{
          console.error(err);
          const msg = (err && err.message) ? err.message : String(err);
          if (passivasStatus) passivasStatus.textContent = 'Erro ao gerar imagem: ' + msg;
          alert('Erro ao gerar imagem: ' + msg + '\nVeja o console para mais detalhes.');
          setTimeout(()=>{ if (passivasStatus) passivasStatus.textContent = ''; },4000);
        });
      });
       exportBtn.dataset.bound = '1';
     }

    // init custom selects if not already
    if (!window._customInited) { try { initCustomSelects(); window._customInited = true; } catch(e){ console.warn('initCustomSelects falhou no safeBind', e); } }

    // document click to close dropdowns
    if (!document.body.dataset.closeBound) {
      document.addEventListener('click', (e) => {
        document.querySelectorAll('.custom-select.open').forEach((cs) => { if (!cs.contains(e.target)) closeCustom(cs); });
      });
      document.body.dataset.closeBound = '1';
    }

    console.log('safeBind executed');
    return true;
  } catch (err) {
    console.error('safeBind error', err);
    showInitError(err && err.message ? err.message : String(err));
    return false;
  }
}

// Botão visível para reiniciar UI manualmente
function addReinitButton(){
  if (document.getElementById('reinit-ui-btn')) return;
  const b = document.createElement('button');
  b.id = 'reinit-ui-btn';
  b.textContent = 'Reiniciar UI';
  b.title = 'Religa selects/badges e tenta reconstruir a UI';
  b.style.position = 'fixed';
  b.style.right = '12px';
  b.style.bottom = '12px';
  b.style.zIndex = 999999;
  b.style.padding = '8px 10px';
  b.style.borderRadius = '6px';
  b.style.border = 'none';
  b.style.background = '#1f6feb';
  b.style.color = '#fff';
  b.style.cursor = 'pointer';
  b.addEventListener('click', () => { safeBind(); });
  document.body.appendChild(b);
}

// painel de depuração para o usuário testar rapidamente o estado da aplicação
function addDebugPanel(){
  if (document.getElementById('debug-panel')) return;
  const p = document.createElement('div');
  p.id = 'debug-panel';
  p.style.position = 'fixed';
  p.style.left = '12px';
  p.style.bottom = '12px';
  p.style.zIndex = 999998;
  p.style.background = 'rgba(0,0,0,0.6)';
  p.style.color = '#fff';
  p.style.padding = '8px';
  p.style.borderRadius = '8px';
  p.style.fontFamily = 'Arial, Helvetica, sans-serif';
  p.style.fontSize = '13px';

  const libs = document.createElement('div'); libs.id = 'debug-libs'; libs.style.marginBottom = '6px';
  const info = () => {
    const h2c = Object.keys(window.ligas || {}).length || 0;
    const bcount = (window.badges && window.badges.length) ? window.badges.length : (typeof badges !== 'undefined' ? badges.length : 0);
    libs.innerHTML = `Ligas: ${h2c} — Badges: ${bcount}<br>html2canvas: ${typeof html2canvas !== 'undefined'} — jsPDF: ${((window.jspdf && window.jspdf.jsPDF) || window.jsPDF) ? true : false}`;
  };
  info();

  const btnRe = document.createElement('button'); btnRe.textContent = 'Reiniciar UI'; btnRe.style.marginRight = '6px'; btnRe.addEventListener('click', () => { runInit(); setTimeout(info,300); });
  const btnPDF = document.createElement('button'); btnPDF.textContent = 'Test PDF'; btnPDF.style.marginRight = '6px'; btnPDF.addEventListener('click', () => { generatePDF().then(()=>alert('PDF gerado OK')).catch(e => alert('Erro ao gerar PDF: '+(e&&e.message?e.message:e))); });
  const btnCheck = document.createElement('button'); btnCheck.textContent = 'Checar'; btnCheck.addEventListener('click', info);

  [btnRe, btnPDF, btnCheck].forEach(x => { x.style.background = '#333'; x.style.color = '#fff'; x.style.border = 'none'; x.style.padding = '6px 8px'; x.style.borderRadius = '4px'; x.style.cursor = 'pointer'; x.style.marginTop = '4px'; });

  p.appendChild(libs);
  p.appendChild(btnRe);
  p.appendChild(btnPDF);
  p.appendChild(btnCheck);
  document.body.appendChild(p);
}

// safeBind/adicionar botão serão executados dentro de runInit()

// keyboard activation for upload-box to open file dialog when Enter/Space pressed
(function bindUploadBoxKeyboard(){
  const uploadBox = document.querySelector('.upload-box');
  const uploadInput = document.getElementById('upload-foto');
  if (!uploadBox || !uploadInput) return;
  uploadBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      uploadInput.click();
    }
  });
})();
