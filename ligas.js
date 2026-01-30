// ligas.js
const ligas = {
  brasileirao: {
    nome: "Brasileirão",
    // emoji representando a liga (fallback para uso no UI)
    emoji: "⛱️",
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

// adiciona Premier League e La Liga
ligas.premier = {
  nome: "Premier League",
  emoji: "💂🏻",
  icone: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
  times: [
    { nome: "Arsenal", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
    { nome: "Manchester City", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/e/ee/Manchester_City_FC_badge.svg" },
    { nome: "Manchester United", emoji: "🔴⚫", icone: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg" },
    { nome: "Chelsea", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg" },
    { nome: "Liverpool", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
    { nome: "Tottenham Hotspur", emoji: "⚪🔵", icone: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg" },
    { nome: "Newcastle United", emoji: "⚫⚪", icone: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg" },
    { nome: "Aston Villa", emoji: "🟣⚪", icone: "https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_Logo.svg" },
    { nome: "West Ham United", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg" },
    { nome: "Brighton & Hove Albion", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/5/57/Brighton_%26_Hove_Albion_logo.svg" },
    { nome: "Brentford", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/0/0c/Brentford_FC_logo.svg" },
    { nome: "Fulham", emoji: "⚪⚫", icone: "https://upload.wikimedia.org/wikipedia/en/7/7a/Fulham_FC_%28shield%29.svg" },
    { nome: "Crystal Palace", emoji: "🔴🔵", icone: "https://upload.wikimedia.org/wikipedia/en/0/0c/Crystal_Palace_FC_logo.svg" },
    { nome: "Wolverhampton Wanderers", emoji: "🟠⚫", icone: "https://upload.wikimedia.org/wikipedia/en/6/6f/Wolverhampton_Wanderers.svg" },
    { nome: "Everton", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg" },
    { nome: "Nottingham Forest", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/6b/Nottingham_Forest_logo.svg" },
    { nome: "Bournemouth", emoji: "🔬🔴", icone: "https://upload.wikimedia.org/wikipedia/en/0/0c/AFC_Bournemouth_%28logo%29.svg" },
    { nome: "Luton Town", emoji: "🟠⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/67/Luton_Town_FC_badge.svg" },
    { nome: "Burnley", emoji: "🔵🔴", icone: "https://upload.wikimedia.org/wikipedia/en/7/73/Burnley_FC_badge.svg" },
    { nome: "Sheffield United", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/1/1b/Sheffield_United_FC_logo.svg" }
  ]
};

ligas.laliga = {
  nome: "La Liga",
  emoji: "🐂",
  icone: "https://upload.wikimedia.org/wikipedia/en/7/76/LaLiga_Santander_logo.svg",
  times: [
    { nome: "Real Madrid", emoji: "⚪🟡", icone: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
    { nome: "FC Barcelona", emoji: "🔵🔴", icone: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },
    { nome: "Atlético de Madrid", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg" },
    { nome: "Sevilla", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/7/75/Sevilla_FC_logo.svg" },
    { nome: "Real Sociedad", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/5/51/Real_Sociedad_logo.svg" },
    { nome: "Villarreal", emoji: "🟡🔵", icone: "https://upload.wikimedia.org/wikipedia/en/e/e2/Villarreal_CF_logo.svg" },
    { nome: "Valencia", emoji: "⚫⚪", icone: "https://upload.wikimedia.org/wikipedia/en/7/7f/Valencia_CF_logo.svg" },
    { nome: "Athletic Club (Bilbao)", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/9/9a/Athletic_Club_logo.svg" },
    { nome: "Real Betis", emoji: "🟢⚪", icone: "https://upload.wikimedia.org/wikipedia/en/3/3f/Real_Betis_logo.svg" },
    { nome: "Mallorca", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/2/28/RCD_Mallorca.svg" },
    { nome: "Osasuna", emoji: "🔴🔵", icone: "https://upload.wikimedia.org/wikipedia/en/0/08/CA_Osasuna_logo.svg" },
    { nome: "Celta Vigo", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/2/2b/RC_Celta_de_Vigo.svg" },
    { nome: "Girona", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/60/Girona_FC_logo.svg" },
    { nome: "Rayo Vallecano", emoji: "⚪🔴", icone: "https://upload.wikimedia.org/wikipedia/en/2/29/Rayo_Vallecano_logo.svg" },
    { nome: "Getafe", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/5/5e/Getafe_CF_logo.svg" },
    { nome: "Alavés", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/5/57/Deportivo_Alaves_logo.svg" },
    { nome: "Granada", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/0/02/Granada_CF_logo.svg" },
    { nome: "Cádiz", emoji: "🟡🔵", icone: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cadiz_CF_logo.svg" },
    { nome: "Las Palmas", emoji: "🟡🔵", icone: "https://upload.wikimedia.org/wikipedia/en/2/2e/UD_Las_Palmas.png" },
    { nome: "Real Valladolid", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/8/86/Real_Valladolid_crest.svg" }
  ]
};

// adiciona Ligue 1 (França)
ligas.ligue1 = {
  nome: "Ligue 1",
  emoji: "🥐",
  icone: "https://upload.wikimedia.org/wikipedia/en/7/7f/Ligue1_Logo.svg",
  times: [
    { nome: "Paris Saint-Germain", emoji: "🔵🔴", icone: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
    { nome: "Olympique de Marseille", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/2/2e/Olympique_Marseille_logo.svg" },
    { nome: "Olympique Lyonnais", emoji: "🔵🔴", icone: "https://upload.wikimedia.org/wikipedia/en/c/ce/Olympique_Lyonnais.svg" },
    { nome: "AS Monaco", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/9/98/AS_Monaco_FC.svg" },
    { nome: "RC Lens", emoji: "🔴🟡", icone: "https://upload.wikimedia.org/wikipedia/en/4/4f/RCLens.png" },
    { nome: "Stade Rennais", emoji: "🔴⚫", icone: "https://upload.wikimedia.org/wikipedia/en/9/9f/Stade_Rennais_FC.svg" },
    { nome: "OGC Nice", emoji: "⚫🔴", icone: "https://upload.wikimedia.org/wikipedia/en/7/73/OGC_Nice_logo.svg" },
    { nome: "LOSC Lille", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/4/4f/LOSC_Lille_logo.svg" },
    { nome: "FC Nantes", emoji: "🟢⚪", icone: "https://upload.wikimedia.org/wikipedia/en/5/5b/FC_Nantes_logo.svg" },
    { nome: "RC Strasbourg", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/69/RC_Strasbourg_logo.svg" },
    { nome: "Montpellier HSC", emoji: "🔵🟠", icone: "https://upload.wikimedia.org/wikipedia/en/2/2f/Montpellier_HSC_logo.svg" },
    { nome: "Toulouse FC", emoji: "🟣⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/63/Toulouse_FC_logo.svg" },
    { nome: "Stade de Reims", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/65/Stade_de_Reims_logo.svg" },
    { nome: "Stade Brestois 29", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/7/79/Stade_Brestois_29_logo.svg" },
    { nome: "FC Lorient", emoji: "🟠⚫", icone: "https://upload.wikimedia.org/wikipedia/en/7/7c/FC_Lorient_logo.svg" },
    { nome: "Angers SCO", emoji: "⚫⚪", icone: "https://upload.wikimedia.org/wikipedia/en/3/3b/Angers_SCO_logo.svg" },
    { nome: "Clermont Foot", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/4/4e/Clermont_Foot_63_logo.svg" },
    { nome: "RC Strasbourg Alsace", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/69/RC_Strasbourg_logo.svg" },
    { nome: "FC Metz", emoji: "🔴🔵", icone: "https://upload.wikimedia.org/wikipedia/en/1/1a/FC_Metz_logo.svg" }
  ]
};

// adiciona Eredivisie (Países Baixos)
ligas.eredivisie = {
  nome: "Eredivisie",
  emoji: "🌷",
  icone: "https://upload.wikimedia.org/wikipedia/en/2/29/Eredivisie_logo.svg",
  times: [
    { nome: "Ajax", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_Amsterdam.svg" },
    { nome: "PSV Eindhoven", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/1/1b/PSV_Eindhoven.svg" },
    { nome: "Feyenoord", emoji: "🔴⚫", icone: "https://upload.wikimedia.org/wikipedia/en/2/2f/Feyenoord.svg" },
    { nome: "AZ Alkmaar", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/8/8b/AZ_Alkmaar_logo.svg" },
    { nome: "Twente", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/3/3c/FC_Twente_Enschede_logo.svg" },
    { nome: "SC Heerenveen", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/2/22/SC_Heerenveen_logo.svg" },
    { nome: "Vitesse", emoji: "⚫🟡", icone: "https://upload.wikimedia.org/wikipedia/en/5/54/Vitesse_Arnhem.svg" },
    { nome: "Utrecht", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/6a/FC_Utrecht.svg" },
    { nome: "Groningen", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/6c/FC_Groningen_logo.svg" },
    { nome: "SC Cambuur", emoji: "🟡🔵", icone: "https://upload.wikimedia.org/wikipedia/en/6/6b/SC_Cambuur_logo.svg" },
    { nome: "Fortuna Sittard", emoji: "🟡🟢", icone: "https://upload.wikimedia.org/wikipedia/en/7/76/Fortuna_Sittard_logo.svg" },
    { nome: "NEC", emoji: "🔴🔵", icone: "https://upload.wikimedia.org/wikipedia/en/3/3d/NEC_Nijmegen.svg" },
    { nome: "Go Ahead Eagles", emoji: "🟠⚪", icone: "https://upload.wikimedia.org/wikipedia/en/3/30/Go_Ahead_Eagles.svg" },
    { nome: "Sparta Rotterdam", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/2/24/Sparta_Rotterdam.svg" },
    { nome: "Heracles Almelo", emoji: "🔴⚫", icone: "https://upload.wikimedia.org/wikipedia/en/5/5b/Heracles_Almelo_logo.svg" },
    { nome: "Excelsior", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/6a/Excelsior_Rotterdam.svg" },
    { nome: "RKC Waalwijk", emoji: "🟡🔵", icone: "https://upload.wikimedia.org/wikipedia/en/5/5d/RKC_Waalwijk_logo.svg" },
    { nome: "PEC Zwolle", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/9/9e/PEC_Zwolle.svg" }
  ]
};

// adiciona Liga Portugal (Primeira Liga)
ligas.ligaportugal = {
  nome: "Liga Portugal",
  emoji: "🟢",
  icone: "https://upload.wikimedia.org/wikipedia/en/2/2e/Primeira_Liga_logo.svg",
  times: [
    { nome: "SL Benfica", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/2/20/SL_Benfica_logo.svg" },
    { nome: "FC Porto", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/2/2f/FC_Porto.svg" },
    { nome: "Sporting CP", emoji: "🟢⚪", icone: "https://upload.wikimedia.org/wikipedia/en/3/39/Sporting_CP.svg" },
    { nome: "SC Braga", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/62/SC_Braga_logo.svg" },
    { nome: "Famalicão", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/4/4b/F.C._Famalic%C3%A3o_logo.svg" },
    { nome: "Vitória SC", emoji: "🟢⚪", icone: "https://upload.wikimedia.org/wikipedia/en/9/94/Vitoria_SC.svg" },
    { nome: "Gil Vicente", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/7/7a/Gil_Vicente_FC.svg" },
    { nome: "Santa Clara", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/2/21/C.D._Santa_Clara_logo.svg" },
    { nome: "Boavista", emoji: "⚫⚪", icone: "https://upload.wikimedia.org/wikipedia/en/3/30/Boavista_FC_logo.svg" },
    { nome: "Belenenses", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/8/80/C.F._Os_Belenenses_logo.svg" },
    { nome: "Moreirense", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/2/2b/Moreirense_F.C.svg" },
    { nome: "Estoril", emoji: "🟡⚫", icone: "https://upload.wikimedia.org/wikipedia/en/2/2e/Estoril_Praia.svg" },
    { nome: "Paços de Ferreira", emoji: "🟢⚪", icone: "https://upload.wikimedia.org/wikipedia/en/4/44/Pa%C3%A7os_de_Ferreira_logo.svg" },
    { nome: "Tondela", emoji: "🟢⚪", icone: "https://upload.wikimedia.org/wikipedia/en/0/0a/C.D._Tondela.svg" },
    { nome: "Arouca", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/5/56/F.C._Arouca.svg" },
    { nome: "Marítimo", emoji: "🔴🟢", icone: "https://upload.wikimedia.org/wikipedia/en/3/38/C.S._Mar%C3%ADtimo_logo.svg" },
    { nome: "Portimonense", emoji: "⚪⚫", icone: "https://upload.wikimedia.org/wikipedia/en/f/f6/Portimonense_SC_logo.svg" },
    { nome: "Nacional", emoji: "🔴⚫", icone: "https://upload.wikimedia.org/wikipedia/en/3/32/C.D._Nacional_logo.svg" },
    { nome: "Rio Ave", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/8/80/Rio_Ave_FC.svg" }
  ]
};

// adiciona Bundesliga (Alemanha)
ligas.bundesliga = {
  nome: "Bundesliga",
  emoji: "🍺",
  icone: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg",
  times: [
    { nome: "Bayern Munich", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/1/1f/FC_Bayern_Munich_logo_%282017%29.svg" },
    { nome: "Borussia Dortmund", emoji: "🟡⚫", icone: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
    { nome: "RB Leipzig", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg" },
    { nome: "Bayer Leverkusen", emoji: "🔴⚫", icone: "https://upload.wikimedia.org/wikipedia/en/0/0b/Bayer_Leverkusen_logo.svg" },
    { nome: "Borussia M'gladbach", emoji: "⚪⚫", icone: "https://upload.wikimedia.org/wikipedia/en/0/01/Borussia_Moenchengladbach_logo.svg" },
    { nome: "Eintracht Frankfurt", emoji: "🔴⚫", icone: "https://upload.wikimedia.org/wikipedia/en/0/04/Eintracht_Frankfurt_2018_logo.svg" },
    { nome: "VfL Wolfsburg", emoji: "🟢⚪", icone: "https://upload.wikimedia.org/wikipedia/en/4/44/VfL_Wolfsburg_logo.svg" },
    { nome: "TSG Hoffenheim", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/67/TSG_Hoffenheim_Logo.svg" },
    { nome: "VfB Stuttgart", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/9/9f/VfB_Stuttgart_logo_2019.svg" },
    { nome: "FC Köln", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/7/76/1._FC_K%C3%B6ln_Logo.svg" },
    { nome: "Hertha BSC", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/6/66/Hertha_BSC_logo.svg" },
    { nome: "Werder Bremen", emoji: "🟢⚪", icone: "https://upload.wikimedia.org/wikipedia/en/3/3b/Werder_Bremen_logo.svg" },
    { nome: "FC Augsburg", emoji: "🔵🔴", icone: "https://upload.wikimedia.org/wikipedia/en/2/2f/FC_Augsburg_logo.svg" },
    { nome: "1. FSV Mainz 05", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/7/7d/1._FSV_Mainz_05_logo.svg" },
    { nome: "Schalke 04", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/8/86/Schalke_04_Logo.svg" },
    { nome: "Union Berlin", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/8/89/1._FC_Union_Berlin_logo.svg" },
    { nome: "Heidenheim", emoji: "🔵⚪", icone: "https://upload.wikimedia.org/wikipedia/en/5/59/1._FC_Heidenheim_logo.svg" },
    { nome: "Hannover 96", emoji: "🔴⚪", icone: "https://upload.wikimedia.org/wikipedia/en/8/8f/Hannover_96_logo.svg" }
  ]
};
