const badges = [

  {
    nome: "Mão de Aço",
    descricao: "O goleiro não gera rebotes em defesas.",
    requisitos: { defesa: 6, forca: 4, pesoMin: 82 }
  },
  {
    nome: "Felino",
    descricao: "Não se intimida em finalizações à queima-roupa ou 1x2.",
    requisitos: { agilidade: 7, alturaMax: 1.9 }
  },
  {
    nome: "Dono da Área",
    descricao: "Cruzamentos na pequena área sofrem penalidade ofensiva.",
    requisitos: { alturaMin: 1.88, forca: 5, defesa: 6 }
  },
  {
    nome: "Leitura de Pênalti",
    descricao: "O cobrador não pode fechar canto.",
    requisitos: { tatico: 6, idade: 25 }
  },
  {
    nome: "Goleiro Gelado",
    descricao: "Fecha ângulo antes do chute em situações 1x1.",
    requisitos: { tatico: 5, idade: 24 }
  },
  {
    nome: "Saída Corajosa",
    descricao: "Pode sair do gol para fechar o ângulo.",
    requisitos: { forca: 4, agilidade: 5, alturaMin: 1.85 }
  },
  {
    nome: "Calma sob Pressão",
    descricao: "Ignora efeitos de estádio e pressão psicológica.",
    requisitos: { idade: 25 }
  },
  {
    nome: "Batedor de Pênaltis",
    descricao: "Pode escolher até 4 cantos na cobrança.",
    requisitos: { finalizacao: 5, idade: 20 }
  },
  {
    nome: "Batedor de Falta",
    descricao: "Pode chutar direto ao gol com DT reduzida.",
    requisitos: { tatico: 4, finalizacao: 5 }
  },
  {
    nome: "Ambidestria",
    descricao: "Não sofre penalidade por ângulo ou troca de lado.",
    requisitos: { agilidade: 4, tatico: 4 }
  },
  {
    nome: "Lateral Longo",
    descricao: "Pode cobrar lateral até a primeira trave.",
    requisitos: { forca: 4, alturaMin: 1.78, pesoMin: 72 }
  },
  {
    nome: "Firula",
    descricao: "Dribles difíceis têm DT reduzida.",
    requisitos: { agilidade: 6 }
  },
  {
    nome: "Chute Colocado",
    descricao: "Finalização colocada com goleiro em desvantagem.",
    requisitos: { tatico: 5, finalizacao: 4 }
  },
  {
    nome: "Chute Poderoso",
    descricao: "Finalizações longas usam atributo puro.",
    requisitos: { finalizacao: 6, forca: 3, pesoMin: 70 }
  },
  {
    nome: "Escanteio Limpo",
    descricao: "Escolhe o alvo do escanteio.",
    requisitos: { tatico: 5 }
  },
  {
    nome: "Acrobata",
    descricao: "Pode finalizar bolas difíceis com DT reduzida.",
    requisitos: { agilidade: 5, finalizacao: 5, pesoMax: 78 }
  },
  {
    nome: "Carrinho Limpo",
    descricao: "Carrinhos por trás têm DT reduzida.",
    requisitos: { defesa: 5, forca: 3, pesoMin: 75 }
  },
  {
    nome: "Pé em Enxada",
    descricao: "Finaliza mesmo com o goleiro fechando.",
    requisitos: { finalizacao: 7, tatico: 4, idade: 22 }
  },
  {
    nome: "Ator",
    descricao: "Pode cavar faltas usando tático.",
    requisitos: { tatico: 5, agilidade: 4 }
  },
  {
    nome: "Veloz",
    descricao: "Força disputa de corrida paralela.",
    requisitos: { agilidade: 6, pesoMax: 74 }
  },
  {
    nome: "Pesadão",
    descricao: "Jogo de corpo aplica penalidade ao adversário.",
    requisitos: { forca: 5, pesoMin: 85 }
  },
  {
    nome: "Líder em Campo",
    descricao: "Pode conceder bônus a companheiros.",
    requisitos: { tatico: 6, idade: 25 }
  },
  {
    nome: "Saltador",
    descricao: "Vantagem extrema em disputas aéreas.",
    requisitos: { agilidade: 4, forca: 4, alturaMin: 1.85 }
  },
  {
    nome: "Raçudo",
    descricao: "Pode desfazer desastres em campo.",
    requisitos: { forca: 3, defesa: 3 }
  },
  {
    nome: "Pressão Alta",
    descricao: "Roubo no ataque gera bônus imediato.",
    requisitos: { agilidade: 5, tatico: 4 }
  },
  {
    nome: "Puxão",
    descricao: "Pode puxar a camisa para reduzir deslocamento.",
    requisitos: { forca: 4, defesa: 3 }
  },
  {
    nome: "Fatiada de Mestre",
    descricao: "Virar o jogo tem DT reduzida.",
    requisitos: { tatico: 5 }
  },
  {
    nome: "Trivela Passe",
    descricao: "Passe com curva que altera a rota da bola.",
    requisitos: { tatico: 8, agilidade: 2 }
  },
  {
    nome: "Trivela Chute",
    descricao: "Chute com curva que altera a rota.",
    requisitos: { finalizacao: 8, tatico: 2 }
  },
  {
    nome: "Finalização Relâmpago",
    descricao: "Finalizações de primeiro toque têm vantagem.",
    requisitos: { agilidade: 6, finalizacao: 6 }
  },
  {
    nome: "Pivô",
    descricao: "Vence no corpo e libera passes diagonais.",
    requisitos: { forca: 5, pesoMin: 80 }
  },
  {
    nome: "Faro de Gol",
    descricao: "Movimento extra em rebotes.",
    requisitos: { finalizacao: 6, tatico: 4 }
  },
  {
    nome: "Muralha Central",
    descricao: "Atacantes sofrem penalidade física na área.",
    requisitos: { defesa: 7, forca: 6, alturaMin: 1.85 }
  },
  {
    nome: "Cara a Cara",
    descricao: "Goleiro sofre penalidade em 1x1.",
    requisitos: { finalizacao: 6, agilidade: 4, tatico: 4 }
  },
  {
    nome: "Bote Limpo",
    descricao: "Desarmes por trás garantem posse.",
    requisitos: { defesa: 5, tatico: 4 }
  },
  {
    nome: "Perseguidor",
    descricao: "Ganha deslocamento extra na marcação.",
    requisitos: { agilidade: 5, defesa: 5 }
  },
  {
    nome: "Leitura Antecipada",
    descricao: "Pode antecipar dribles com vantagem.",
    requisitos: { tatico: 6, defesa: 4 }
  },
  {
    nome: "Impedimento Safado",
    descricao: "Pode forçar adversário ao impedimento.",
    requisitos: { tatico: 5, defesa: 5 }
  },
  {
    nome: "Cabeceio Forte",
    descricao: "Cabeceios usam força ou defesa.",
    requisitos: { forca: 4, pesoMin: 85, alturaMin: 1.88 }
  },
  {
    nome: "Último Homem",
    descricao: "Ganha bônus sendo o último defensor.",
    requisitos: { defesa: 6, idade: 23 }
  },
  {
    nome: "Envergadura",
    descricao: "Pode marcar dois atletas ao mesmo tempo.",
    requisitos: { defesa: 7, alturaMin: 1.9 }
  },
  {
    nome: "Wolverine",
    descricao: "Recuperação acelerada de lesões.",
    requisitos: { forca: 6 }
  },
  {
    nome: "Transferidor",
    descricao: "Finaliza bem mesmo sem ângulo.",
    requisitos: { finalizacao: 6, tatico: 4 }
  },
  {
    nome: "Transição Mortal",
    descricao: "Pode usar todo deslocamento após roubo.",
    requisitos: { agilidade: 5, tatico: 5 }
  },
  {
    nome: "Malícia",
    descricao: "Pode cavar falta sem bola.",
    requisitos: { tatico: 4, defesa: 4, idade: 23 }
  },
  {
    nome: "Sede de Bola",
    descricao: "Vantagem em bolas soltas.",
    requisitos: { agilidade: 5 }
  },
  {
    nome: "Trash Talk",
    descricao: "Provoca adversários aumentando DT de desastre.",
    requisitos: { defesa: 6, idade: 23 }
  },
  {
    nome: "Sangue Frio",
    descricao: "Ignora pressão mental e provocações.",
    requisitos: { idade: 26 }
  },
  {
    nome: "Primeiro Toque",
    descricao: "DT mínima no primeiro toque.",
    requisitos: { agilidade: 5, tatico: 5 }
  },
  {
    nome: "Pressão Magnética",
    descricao: "Dificulta saída do adversário da marcação.",
    requisitos: { defesa: 6, agilidade: 4 }
  }

];
