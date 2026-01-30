// ligas.js
const ligas = {
  brasileirao: {
    nome: "Brasileirão",
    // emoji representando a liga (fallback para uso no UI)
    emoji: "🏆",
    icone: "https://upload.wikimedia.org/wikipedia/pt/4/42/Brasileirao_Serie_A_logo.png",
    times: [
      {
        nome: "Flamengo",
        // exemplo pedido: Flamengo 🔴 ⚫
        emoji: "🔴⚫",
        icone: "https://upload.wikimedia.org/wikipedia/pt/2/2e/Flamengo_brasao.png"
      },
      {
        nome: "Palmeiras",
        // exemplo pedido: Palmeiras (esfera verde) e ⚪
        emoji: "🟢⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/0/0a/Palmeiras_logo.png"
      },
      {
        nome: "Corinthians",
        // Corinthians preto e branco
        emoji: "⚫⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/5/5d/Corinthians.png"
      },
      {
        nome: "São Paulo",
        emoji: "⚪🔴⚫",
        icone: "https://upload.wikimedia.org/wikipedia/pt/8/8f/Sao_Paulo_FC.png"
      },
      {
        nome: "Santos",
        emoji: "⚪⚫",
        icone: "https://upload.wikimedia.org/wikipedia/pt/5/5c/SantosFC.png"
      },
      {
        nome: "Fluminense",
        emoji: "🟢🔴⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/1/13/Fluminense_FC.png"
      },
      {
        nome: "Botafogo",
        emoji: "⚫⭐",
        icone: "https://upload.wikimedia.org/wikipedia/pt/4/4f/Botafogo.png"
      },
      {
        nome: "Vasco da Gama",
        emoji: "⚫⚪✝",
        icone: "https://upload.wikimedia.org/wikipedia/pt/8/89/Vasco.svg"
      },
      {
        nome: "Atlético Mineiro",
        emoji: "⚫⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/7/7a/Atletico_MG.png"
      },
      {
        nome: "Internacional",
        emoji: "🔴⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/1/11/SC_Internacional.png"
      },
      {
        nome: "Grêmio",
        emoji: "🔵⚫⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/6/6d/Gremio.png"
      },
      {
        nome: "Cruzeiro",
        emoji: "🔵⭐",
        icone: "https://upload.wikimedia.org/wikipedia/pt/5/5f/Cruzeiro.png"
      },
      {
        nome: "Athletico Paranaense",
        emoji: "🔴⚫",
        icone: "https://upload.wikimedia.org/wikipedia/pt/0/05/Club_Athletico_Paranaense.png"
      },
      {
        nome: "Bragantino",
        emoji: "🔴⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/6/6f/Red_Bull_Bragantino.png"
      },
      {
        nome: "Fortaleza",
        emoji: "🔴🔵",
        icone: "https://upload.wikimedia.org/wikipedia/pt/0/05/Fortaleza_EC.png"
      },
      {
        nome: "Ceará",
        emoji: "⚫⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/9/9a/Ceara_SC.png"
      },
      {
        nome: "Bahia",
        emoji: "🔴🔵⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/2/23/Esporte_Clube_Bahia.png"
      },
      {
        nome: "Goiás",
        emoji: "🟢⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/6/6e/Goi%C3%A1s_Esporte_Clube.png"
      },
      {
        nome: "Coritiba",
        emoji: "🟢⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/3/35/Coritiba.png"
      },
      {
        nome: "América Mineiro",
        emoji: "🟢⚪",
        icone: "https://upload.wikimedia.org/wikipedia/pt/5/59/America_MG.png"
      }
    ]
  }
};