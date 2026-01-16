// Questões do ENEM e FUVEST

export interface QuestionData {
  id: number;
  exam: string;
  year: number;
  day: number;
  phase?: number;
  text: string;
  image: string | null;
  imageAfterText?: string;
  image2?: string;
  imageAfterText2?: string;
  alternatives: string[];
  correct: string;
  explanation: string;
  subject: string;
  topic: string;
}

// ============================================
// ENEM 2009 - DIA 1
// ============================================
export const ENEM_2009_DIA1: QuestionData[] = [
  {
    id: 1,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "A atmosfera terrestre é composta pelos gases nitrogênio (N₂) e oxigênio (O₂), que somam cerca de 99%, e por gases traços, entre eles o gás carbônico (CO₂), vapor de água (H₂O), metano (CH₄), ozônio (O₃) e o óxido nitroso (N₂O), que compõem o restante 1% do ar que respiramos. Os gases traços, por serem constituídos por pelo menos três átomos, conseguem absorver o calor irradiado pela Terra, aquecendo o planeta. Esse fenômeno, que acontece há bilhões de anos, é chamado de efeito estufa. A partir da Revolução Industrial (século XIX), a concentração de gases traços na atmosfera, em particular o CO₂, tem aumentado significativamente, o que resultou no aumento da temperatura em escala global. Mais recentemente, outro fator tornou-se diretamente envolvido no aumento da concentração de CO₂ na atmosfera: o desmatamento.\n\nBROWN, I. F.; ALECHANDRE, A. S. Conceitos básicos sobre clima, carbono, florestas e comunidades. A. G. Moreira & S. Schwartzman. As mudanças climáticas globais e os ecossistemas brasileiros. Brasília: Instituto de Pesquisa Ambiental da Amazônia, 2000 (adaptado).\n\nConsiderando o texto, uma alternativa viável para combater o efeito estufa é",
    image: null,
    alternatives: [
      "A) reduzir o calor irradiado pela Terra mediante a substituição da produção primária pela industrialização refrigerada.",
      "B) promover a queima da biomassa vegetal, responsável pelo aumento do efeito estufa devido à produção de CH₄.",
      "C) reduzir o desmatamento, mantendo-se, assim, o potencial da vegetação em absorver o CO₂ da atmosfera.",
      "D) aumentar a concentração atmosférica de H₂O, molécula capaz de absorver grande quantidade de calor.",
      "E) remover moléculas orgânicas polares da atmosfera, diminuindo a capacidade delas de reter calor"
    ],
    correct: "C",
    explanation: "Uma forma eficaz de minimizar o agravamento do efeito estufa é diminuir o ritmo do desmatamento. Ao preservar as áreas verdes, mantém-se a capacidade natural da vegetação de retirar CO₂ do ar por meio da fotossíntese, contribuindo para o equilíbrio climático.",
    subject: "bio",
    topic: "Ecologia"
  },
  {
    id: 2,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "Analise a figura.\n\nSupondo que seja necessário dar um título para essa figura, a alternativa que melhor traduziria o processo representado seria:",
    image: "https://i.postimg.cc/KYM8Qxjd/IMG-2813.jpg",
    alternatives: [
      "A) Concentração média de álcool no sangue ao longo do dia.",
      "B) Variação da frequência da ingestão de álcool ao longo das horas.",
      "C) Concentração mínima de álcool no sangue a partir de diferentes dosagens.",
      "D) Estimativa de tempo necessário para metabolizar diferentes quantidades de álcool.",
      "E) Representação gráfica da distribuição de frequência de álcool em determinada hora do dia."
    ],
    correct: "D",
    explanation: "A leitura do gráfico mostra que a concentração de álcool no sangue aumenta gradualmente até atingir um pico e, em seguida, diminui conforme o corpo metaboliza a substância. Quanto maior a quantidade ingerida, mais tempo o organismo leva para eliminar esse álcool da corrente sanguínea.",
    subject: "fis",
    topic: "Cinemática"
  },
  {
    id: 3,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "Em um experimento, preparou-se um conjunto de plantas por técnica de clonagem a partir de uma planta original que apresentava folhas verdes. Esse conjunto foi dividido em dois grupos, que foram tratados de maneira idêntica, com exceção das condições de iluminação, sendo um grupo exposto a ciclos de iluminação solar natural e outro mantido no escuro. Após alguns dias, observou-se que o grupo exposto à luz apresentava folhas verdes como a planta original e o grupo cultivado no escuro apresentava folhas amareladas.\n\nAo final do experimento, os dois grupos de plantas apresentaram",
    image: null,
    alternatives: [
      "A) os genótipos e os fenótipos idênticos.",
      "B) os genótipos idênticos e os fenótipos diferentes.",
      "C) diferenças nos genótipos e fenótipos.",
      "D) o mesmo fenótipo e apenas dois genótipos diferentes.",
      "E) o mesmo fenótipo e grande variedade de genótipos."
    ],
    correct: "B",
    explanation: "Plantas obtidas por clonagem mantêm o mesmo material genético do indivíduo original, porém podem apresentar características externas distintas, já que fatores ambientais — como presença de luz ou escuridão — influenciam a manifestação dos fenótipos.",
    subject: "bio",
    topic: "Botânica"
  },
  {
    id: 4,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "Na linha de uma tradição antiga, o astrônomo grego Ptolomeu (100-170 d.C.) afirmou a tese do geocentrismo, segundo a qual a Terra seria o centro do universo, sendo que o Sol, a Lua e os planetas girariam em seu redor em órbitas circulares. A teoria de Ptolomeu resolvia de modo razoável os problemas astronômicos da sua época. Vários séculos mais tarde, o clérigo e astrônomo polonês Nicolau Copérnico (1473-1543), ao encontrar inexatidões na teoria de Ptolomeu, formulou a teoria do heliocentrismo, segundo a qual o Sol deveria ser considerado o centro do universo, com a Terra, a Lua e os planetas girando circularmente em torno dele. Por fim, o astrônomo e matemático alemão Johannes Kepler (1571-1630), depois de estudar o planeta Marte por cerca de trinta anos, verificou que a sua órbita é elíptica. Esse resultado generalizou-se para os demais planetas.\n\nA respeito dos estudiosos citados no texto, é correto afirmar que",
    image: null,
    alternatives: [
      "A) Ptolomeu apresentou as ideias mais valiosas, por serem mais antigas e tradicionais.",
      "B) Copérnico desenvolveu a teoria do heliocentrismo inspirado no contexto político do Rei Sol.",
      "C) Copérnico viveu em uma época em que a pesquisa científica era livre e amplamente incentivada pelas autoridades.",
      "D) Kepler estudou o planeta Marte para atender às necessidades de expansão econômica e científica da Alemanha.",
      "E) Kepler apresentou uma teoria científica que, graças aos métodos aplicados, pôde ser testada e generalizada."
    ],
    correct: "E",
    explanation: "As Leis de Kepler foram ampliadas para descrever o movimento de qualquer corpo que orbite o Sol. Essa formulação só foi possível graças às medições astronômicas precisas feitas por Tycho Brahe, que permitiram a Kepler elaborar seus modelos.",
    subject: "fis",
    topic: "Gravitação"
  },
  {
    id: 5,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "Um novo método para produzir insulina artificial que utiliza tecnologia de DNA recombinante foi desenvolvido por pesquisadores do Departamento de Biologia Celular da Universidade de Brasília (UnB) em parceria com a iniciativa privada. Os pesquisadores modificaram geneticamente a bactéria Escherichia coli para torná-la capaz de sintetizar o hormônio. O processo permitiu fabricar insulina em maior quantidade e em apenas 30 dias, um terço do tempo necessário para obtê-la pelo método tradicional, que consiste na extração do hormônio a partir do pâncreas de animais abatidos.\n\nCiência Hoje, 24 abr. 2001. Disponível em: http://cienciahoje.uol.com.br (adaptado).\n\nA produção de insulina pela técnica do DNA recombinante tem, como consequência,",
    image: null,
    alternatives: [
      "A) o aperfeiçoamento do processo de extração de insulina a partir do pâncreas suíno.",
      "B) a seleção de microrganismos resistentes a antibióticos.",
      "C) o progresso na técnica da síntese química de hormônios.",
      "D) impacto favorável na saúde de indivíduos diabéticos.",
      "E) a criação de animais transgênicos."
    ],
    correct: "D",
    explanation: "Quando bactérias geneticamente modificadas são usadas para produzir a insulina humana, o tratamento dos diabéticos se torna mais seguro. Isso ocorre porque o hormônio obtido por engenharia genética é idêntico ao produzido pelo corpo humano, evitando a resistência que surgia com a insulina retirada de tecidos de suínos e bovinos.",
    subject: "bio",
    topic: "Biotecnologia"
  },
  {
    id: 6,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "O ciclo biogeoquímico do carbono compreende diversos compartimentos, entre os quais a Terra, a atmosfera e os oceanos, e diversos processos que permitem a transferência de compostos entre esses reservatórios. Os estoques de carbono armazenados na forma de recursos não renováveis, por exemplo, o petróleo, são limitados, sendo de grande relevância que se perceba a importância da substituição de combustíveis fósseis por combustíveis de fontes renováveis.\n\nA utilização de combustíveis fósseis interfere no ciclo do carbono, pois provoca",
    image: null,
    alternatives: [
      "A) aumento da porcentagem de carbono contido na Terra.",
      "B) redução na taxa de fotossíntese dos vegetais superiores.",
      "C) aumento da produção de carboidratos de origem vegetal.",
      "D) aumento na quantidade de carbono presente na atmosfera.",
      "E) redução da quantidade global de carbono armazenado nos oceanos."
    ],
    correct: "D",
    explanation: "A queima de combustíveis fósseis eleva a concentração de dióxido de carbono (CO₂) na atmosfera. Esse aumento intensifica o efeito estufa, contribuindo para o aquecimento global.",
    subject: "bio",
    topic: "Ecologia"
  },
  {
    id: 7,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "A economia moderna depende da disponibilidade de muita energia em diferentes formas, para funcionar e crescer. No Brasil, o consumo total de energia pelas indústrias cresceu mais de quatro vezes no período entre 1970 e 2005. Enquanto os investimentos em energias limpas e renováveis, como solar e eólica, ainda são incipientes, ao se avaliar a possibilidade de instalação de usinas geradoras de energia elétrica, diversos fatores devem ser levados em consideração, tais como os impactos causados ao ambiente e às populações locais.\n\nRicardo, B. e Campanili, M. Almanaque Brasil Socioambiental. Instituto Socioambiental. São Paulo, 2007 (adaptado).\n\nEm uma situação hipotética, optou-se por construir uma usina hidrelétrica em região que abrange diversas quedas d'água em rios cercados por mata, alegando-se que causaria impacto ambiental muito menor que uma usina termelétrica. Entre os possíveis impactos da instalação de uma usina hidrelétrica nessa região, inclui-se",
    image: null,
    alternatives: [
      "A) a poluição da água por metais da usina.",
      "B) a destruição do habitat de animais terrestres.",
      "C) o aumento expressivo na liberação de CO₂ para a atmosfera.",
      "D) o consumo não renovável de toda água que passa pelas turbinas.",
      "E) o aprofundamento no leito do rio, com a menor deposição de resíduos no trecho de rio anterior à represa."
    ],
    correct: "B",
    explanation: "A construção de uma usina hidrelétrica pode gerar diversos impactos ambientais, entre eles a perda de habitats terrestres, já que grandes áreas são inundadas para a formação do reservatório, afetando diretamente a fauna que vive nesses locais.",
    subject: "bio",
    topic: "Ecologia"
  },
  {
    id: 8,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "As mudanças climáticas e da vegetação ocorridas nos trópicos da América do Sul têm sido bem documentadas por diversos autores, existindo um grande acúmulo de evidências geológicas ou paleoclimatológicas que evidenciam essas mudanças ocorridas durante o Quaternário nessa região. Essas mudanças resultaram em restrição da distribuição das florestas pluviais, com expansões concomitantes de habitats não-florestais durante períodos áridos (glaciais), seguido da expansão das florestas pluviais e restrição das áreas não-florestais durante períodos úmidos (interglaciais).\n\nDisponível em: http://zoo.bio.ufpr.br. Acesso em: 1 maio 2009.\n\nDurante os períodos glaciais,",
    image: null,
    alternatives: [
      "A) as áreas não-florestais ficam restritas a refúgios ecológicos devido à baixa adaptabilidade de espécies não-florestais a ambientes áridos.",
      "B) grande parte da diversidade de espécies vegetais é reduzida, uma vez que necessitam de condições semelhantes às dos períodos interglaciais.",
      "C) a vegetação comum ao cerrado deve ter se limitado a uma pequena região do centro do Brasil, da qual se expandiu até atingir a atual distribuição.",
      "D) plantas com adaptações ao clima árido, como o desenvolvimento de estruturas que reduzem a perda de água, devem apresentar maior área de distribuição.",
      "E) florestas tropicais como a amazônica apresentam distribuição geográfica mais ampla, uma vez que são densas e diminuem a ação da radiação solar sobre o solo e reduzem os efeitos da aridez."
    ],
    correct: "D",
    explanation: "Durante as eras glaciais, ocorreu uma ampliação das formações vegetais típicas de ambientes secos, uma vez que o clima global se tornou mais frio e mais árido, favorecendo esse tipo de vegetação.",
    subject: "bio",
    topic: "Ecologia"
  },
  {
    id: 9,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "Para que todos os órgãos do corpo humano funcionem em boas condições, é necessário que a temperatura do corpo fique sempre entre 36 °C e 37 °C. Para manter-se dentro dessa faixa, em dias de muito calor ou durante intensos exercícios físicos, uma série de mecanismos fisiológicos é acionada.\n\nPode-se citar como o principal responsável pela manutenção da temperatura corporal humana o sistema",
    image: null,
    alternatives: [
      "A) digestório, pois produz enzimas que atuam na quebra de alimentos calóricos.",
      "B) imunológico, pois suas células agem no sangue, diminuindo a condução do calor.",
      "C) nervoso, pois promove a sudorese, que permite perda de calor por meio da evaporação da água.",
      "D) reprodutor, pois secreta hormônios que alteram a temperatura, principalmente durante a menopausa.",
      "E) endócrino, pois fabrica anticorpos que, por sua vez, atuam na variação do diâmetro dos vasos periféricos."
    ],
    correct: "C",
    explanation: "No ser humano, o sistema nervoso exerce papel central no controle da temperatura corporal. Durante atividades físicas intensas, ele aciona mecanismos como o aumento da transpiração, permitindo que o corpo disperse o excesso de calor e mantenha a endotermia.",
    subject: "bio",
    topic: "Fisiologia Humana"
  },
  {
    id: 10,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "A fotossíntese é importante para a vida na Terra. Nos cloroplastos dos organismos fotossintetizantes, a energia solar é convertida em energia química que, juntamente com água e gás carbônico (CO₂), é utilizada para a síntese de compostos orgânicos (carboidratos). A fotossíntese é o único processo de importância biológica capaz de realizar essa conversão. Todos os organismos, incluindo os produtores, aproveitam a energia armazenada nos carboidratos para impulsionar os processos celulares, liberando CO₂ para a atmosfera e água para a célula por meio da respiração celular. Além disso, grande fração dos recursos energéticos do planeta, produzidos tanto no presente (biomassa) como em tempos remotos (combustível fóssil), é resultante da atividade fotossintética.\n\nAs informações sobre obtenção e transformação dos recursos naturais por meio dos processos vitais de fotossíntese e respiração, descritas no texto, permitem concluir que",
    image: null,
    alternatives: [
      "A) o CO₂ e a água são moléculas de alto teor energético.",
      "B) os carboidratos convertem energia solar em energia química.",
      "C) a vida na Terra depende, em última análise, da energia proveniente do Sol.",
      "D) o processo respiratório é responsável pela retirada de carbono da atmosfera.",
      "E) a produção de biomassa e de combustível fóssil, por si, é responsável pelo aumento de CO₂ atmosférico."
    ],
    correct: "C",
    explanation: "A energia que sustenta a vida na Terra tem origem no Sol. Todos os organismos, direta ou indiretamente, dependem da energia solar, seja por meio da fotossíntese realizada pelos produtores, seja pelo consumo de seres que dela se beneficiam.",
    subject: "bio",
    topic: "Botânica"
  },
  {
    id: 11,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "Sabões são sais de ácidos carboxílicos de cadeia longa utilizados com a finalidade de facilitar, durante processos de lavagem, a remoção de substâncias de baixa solubilidade em água, por exemplo, óleos e gorduras. A figura a seguir representa a estrutura de uma molécula de sabão.\n\nEm solução, os ânions do sabão podem hidrolisar a água e, desse modo, formar o ácido carboxílico correspondente. Por exemplo, para o estearato de sódio, é estabelecido o seguinte equilíbrio:\nCH₃(CH₂)₁₆COO⁻ + H₂O ⇌ CH₃(CH₂)₁₆COOH + OH⁻\nUma vez que o ácido carboxílico formado é pouco solúvel em água e menos eficiente na remoção de gorduras, o pH do meio deve ser controlado de maneira a evitar que o equilíbrio acima seja deslocado para a direita.\nCom base nas informações do texto, é correto concluir que os sabões atuam de maneira",
    image: "https://i.ibb.co/bjvCt5r6/IMG-2650.jpg",
    imageAfterText: "A figura a seguir representa a estrutura de uma molécula de sabão.",
    alternatives: [
      "A) mais eficiente em pH básico.",
      "B) mais eficiente em pH ácido.",
      "C) mais eficiente em pH neutro.",
      "D) eficiente em qualquer faixa de pH.",
      "E) mais eficiente em pH ácido ou neutro."
    ],
    correct: "A",
    explanation: "O desempenho do sabão aumenta quando o ácido carboxílico permanece na sua forma ionizada, pois é ela que atua como agente de limpeza. Para favorecer esse estado, o equilíbrio CH₃(CH₂)₁₆COO⁻ + H₂O ⇌ CH₃(CH₂)₁₆COOH + OH⁻ precisa ser deslocado para a esquerda. Isso ocorre em meio básico, onde há grande quantidade de íons OH⁻, resultando em um pH acima de 7.",
    subject: "qui",
    topic: "Química Orgânica"
  },
  {
    id: 12,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "A abertura e a pavimentação de rodovias em zonas rurais e regiões afastadas dos centros urbanos, por um lado, possibilita melhor acesso e maior integração entre as comunidades, contribuindo com o desenvolvimento social e urbano de populações isoladas. Por outro lado, a construção de rodovias pode trazer impactos indesejáveis ao meio ambiente, visto que a abertura de estradas pode resultar na fragmentação de habitats, comprometendo o fluxo gênico e as interações entre espécies silvestres, além de prejudicar o fluxo natural de rios e riachos, possibilitar o ingresso de espécies exóticas em ambientes naturais e aumentar a pressão antrópica sobre os ecossistemas nativos.\n\nNesse contexto, para conciliar os interesses aparentemente contraditórios entre o progresso social e urbano e a conservação do meio ambiente, seria razoável",
    image: null,
    alternatives: [
      "A) impedir a abertura e a pavimentação de rodovias em áreas rurais e em regiões preservadas, pois a qualidade de vida e as tecnologias encontradas nos centros urbanos são prescindíveis às populações rurais.",
      "B) impedir a abertura e a pavimentação de rodovias em áreas rurais e em regiões preservadas, promovendo a migração das populações rurais para os centros urbanos, onde a qualidade de vida é melhor.",
      "C) permitir a abertura e a pavimentação de rodovias apenas em áreas rurais produtivas, haja vista que nas demais áreas o retorno financeiro necessário para produzir uma melhoria na qualidade de vida da região não é garantido.",
      "D) permitir a abertura e a pavimentação de rodovias, desde que comprovada a sua real necessidade e após a realização de estudos que demonstrem ser possível contornar ou compensar seus impactos ambientais.",
      "E) permitir a abertura e a pavimentação de rodovias, haja vista que os impactos ao meio ambiente são temporários e podem ser facilmente revertidos com as tecnologias existentes para recuperação de áreas degradadas."
    ],
    correct: "D",
    explanation: "A abertura de estradas em áreas rurais ou regiões distantes deve ser planejada com cautela, pois tais intervenções podem gerar danos ambientais significativos. Assim, sua construção só se justifica quando houver necessidade comprovada e após estudos técnicos que garantam alternativas capazes de reduzir ou evitar esses impactos.",
    subject: "bio",
    topic: "Ecologia"
  },
  {
    id: 13,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "A eficiência de um processo de conversão de energia é definida como a razão entre a produção de energia ou trabalho útil e o total de entrada de energia no processo. A figura mostra um processo com diversas etapas. Nesse caso, a eficiência geral será igual ao produto das eficiências das etapas individuais. A entrada de energia que não se transforma em trabalho útil é perdida sob formas não utilizáveis (como resíduos de calor).\n\nAumentar a eficiência dos processos de conversão de energia implica economizar recursos e combustíveis. Das propostas seguintes, qual resultará em maior aumento da eficiência geral do processo?",
    image: "https://i.ibb.co/1YX4mbmn/IMG-2565.jpg",
    imageAfterText: "(como resíduos de calor).",
    alternatives: [
      "A) Aumentar a quantidade de combustível para queima na usina de força.",
      "B) Utilizar lâmpadas incandescentes, que geram pouco calor e muita luminosidade.",
      "C) Manter o menor número possível de aparelhos elétricos em funcionamento nas moradias.",
      "D) Utilizar cabos com menor diâmetro nas linhas de transmissão a fim de economizar o material condutor.",
      "E) Utilizar materiais com melhores propriedades condutoras nas linhas de transmissão e lâmpadas fluorescentes nas moradias."
    ],
    correct: "E",
    explanation: "Quando se utiliza um material com maior capacidade de conduzir eletricidade, as perdas por Efeito Joule diminuem. Além disso, para uma mesma potência, lâmpadas fluorescentes apresentam melhor rendimento do que as incandescentes, convertendo a energia de forma mais eficiente.",
    subject: "fis",
    topic: "Eletrodinâmica"
  },
  {
    id: 14,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "Para que apresente condutividade elétrica adequada a muitas aplicações, o cobre bruto obtido por métodos térmicos é purificado eletroliticamente. Nesse processo, o cobre bruto impuro constitui o ânodo da célula, que está imerso em uma solução de CuSO₄. À medida que o cobre impuro é oxidado no ânodo, íons Cu²⁺ da solução são depositados na forma pura no cátodo. Quanto às impurezas metálicas, algumas são oxidadas, passando à solução, enquanto outras simplesmente se desprendem do ânodo e se sedimentam abaixo dele. As impurezas sedimentadas são posteriormente processadas, e sua comercialização gera receita que ajuda a cobrir os custos do processo. A série eletroquímica a seguir lista o cobre e alguns metais presentes como impurezas no cobre bruto de acordo com suas forças redutoras relativas.\n\nEntre as impurezas metálicas que constam na série apresentada, as que se sedimentam abaixo do ânodo de cobre são",
    image: "https://i.ibb.co/7x9Sv9JJ/IMG-2655.jpg",
    alternatives: [
      "A) Au, Pt, Ag, Zn, Ni e Pb.",
      "B) Au, Pt e Ag.",
      "C) Zn, Ni e Pb.",
      "D) Au e Zn.",
      "E) Ag e Pb."
    ],
    correct: "B",
    explanation: "No processo de purificação eletrolítica do cobre, o cobre impuro funciona como ânodo e se oxida em solução, liberando íons Cu²⁺ que depois se depositam no cátodo na forma metálica pura. As impurezas presentes no cobre bruto podem ter dois comportamentos: algumas se oxidam e passam para a solução, enquanto outras, por apresentarem pouca tendência a perder elétrons, simplesmente se soltam do ânodo e se acumulam como resíduos sólidos. Metais como ouro, platina e prata quase não se oxidam porque possuem baixa força redutora; por isso, não viram íons e acabam formando a chamada lama anódica, depositando-se no fundo da célula eletrolítica.",
    subject: "qui",
    topic: "Eletroquímica"
  },
  {
    id: 15,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "A figura seguinte representa um modelo de transmissão da informação genética nos sistemas biológicos. No fim do processo, que inclui a replicação, a transcrição e a tradução, há três formas proteicas diferentes denominadas a, b e c.\n\nDepreende-se do modelo que",
    image: "https://i.ibb.co/W4L4PXws/IMG-2569.jpg",
    alternatives: [
      "A) a única molécula que participa da produção de proteínas é o DNA.",
      "B) o fluxo de informação genética, nos sistemas biológicos, é unidirecional.",
      "C) as fontes de informação ativas durante o processo de transcrição são as proteínas.",
      "D) é possível obter diferentes variantes proteicas a partir de um mesmo produto de transcrição.",
      "E) a molécula de DNA possui forma circular e as demais moléculas possuem forma de fita simples linearizadas."
    ],
    correct: "D",
    explanation: "O esquema apresentado mostra que um único RNA produzido pela transcrição pode originar diferentes proteínas. Isso ocorre porque o RNA pode ser traduzido de maneiras distintas, ou sofrer processamento alternativo, o que permite que várias sequências proteicas diferentes sejam formadas a partir do mesmo produto de transcrição. Assim, o modelo evidencia a possibilidade de gerar múltiplas proteínas a partir de um único RNA, ampliando a variedade funcional no organismo.",
    subject: "bio",
    topic: "Biotecnologia"
  },
  {
    id: 16,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "O manual de instruções de um aparelho de ar-condicionado apresenta a seguinte tabela, com dados técnicos para diversos modelos:\n\nConsidere-se que um auditório possua capacidade para 40 pessoas, cada uma produzindo uma quantidade média de calor, e que praticamente todo o calor que flui para fora do auditório o faz por meio dos aparelhos de ar-condicionado. Nessa situação, entre as informações listadas, aquelas essenciais para se determinar quantos e/ou quais aparelhos de ar-condicionado são precisos para manter, com lotação máxima, a temperatura interna do auditório agradável e constante, bem como determinar a espessura da fiação do circuito elétrico para a ligação desses aparelhos, são",
    image: "https://i.ibb.co/yF68wY0h/IMG-2656.jpg",
    alternatives: [
      "A) vazão de ar e potência.",
      "B) vazão de ar e corrente elétrica – ciclo frio.",
      "C) eficiência energética e potência.",
      "D) capacidade de refrigeração e frequência.",
      "E) capacidade de refrigeração e corrente elétrica – ciclo frio."
    ],
    correct: "E",
    explanation: "Para que a temperatura do auditório permaneça confortável mesmo com 40 pessoas, o aparelho de ar-condicionado precisa ser capaz de retirar o calor gerado no ambiente. Quem indica essa capacidade é o valor de capacidade de refrigeração, informado na tabela do fabricante.\n\nAlém disso, a instalação elétrica que alimentará os aparelhos deve suportar a corrente consumida sem risco de aquecimento excessivo. A espessura do fio (área da seção transversal) é definida de acordo com a corrente elétrica do ciclo frio.\n\nA relação entre o fio, a corrente e o aquecimento é explicada pelas Leis de Ohm.\n\n1ª Lei de Ohm:\n\nR = U / i\n\nEssa equação mostra que, para uma tensão fixa, quanto maior a corrente, menor deve ser a resistência do fio.\n\n⸻\n\n2ª Lei de Ohm:\n\nR = ρ · L / A\n\nonde:\nρ = resistividade do material\nL = comprimento do fio\nA = área da seção transversal do fio\n\nOu seja:\n→ fios mais grossos (A maior) têm resistência menor, logo aquecem menos.\n\n⸻\n\nComparando as duas Leis de Ohm:\n\nU / i = ρ · L / A\n\nA partir disso, isolamos a corrente:\n\ni = (U · A) / (ρ · L)",
    subject: "fis",
    topic: "Eletricidade"
  },
  {
    id: 17,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "O Brasil pode se transformar no primeiro país das Américas a entrar no seleto grupo das nações que dispõem de trens-bala. O Ministério dos Transportes prevê o lançamento do edital de licitação internacional para a construção da ferrovia de alta velocidade Rio–São Paulo. A viagem ligará os 403 quilômetros entre a Central do Brasil, no Rio, e a Estação da Luz, no centro da capital paulista, em uma hora e 25 minutos.\n\nDisponível em: http://oglobo.globo.com.\nAcesso em: 14 jul. 2009.\n\nDevido à alta velocidade, um dos problemas a ser enfrentado na escolha do trajeto que será percorrido pelo trem é o dimensionamento das curvas. Considerando-se que uma aceleração lateral confortável para os passageiros e segura para o trem seja de 0,1 g, em que g é a aceleração da gravidade (considerada igual a 10 m/s²), e que a velocidade do trem se mantenha constante em todo o percurso, seria correto prever que as curvas existentes no trajeto deveriam ter raio de curvatura mínimo de, aproximadamente,",
    image: null,
    alternatives: [
      "A) 80 m.",
      "B) 430 m.",
      "C) 800 m.",
      "D) 1.600 m.",
      "E) 6.400 m."
    ],
    correct: "E",
    explanation: "1) Cálculo da velocidade média\nDistância: 403 km\nTempo: 1 hora e 25 minutos = 1,42 h\n\nVelocidade média:\nV = 403 / 1,42 ≈ 283,8 km/h\n\nConvertendo para m/s:\n283,8 / 3,6 ≈ 78,8 m/s\n\n⸻\n\n2) Cálculo do raio mínimo da curva\nA aceleração centrípeta é dada por:\na = V² / R\n\nPara uma aceleração lateral confortável de 0,1 g:\n0,1 × 10 = V² / R\n\nSubstituindo a velocidade:\n1 = (78,8)² / R\n\nR ≈ 6209 m\n\nEntre as opções fornecidas, o valor mais próximo é 6400 m.",
    subject: "fis",
    topic: "Leis de Newton"
  },
  {
    id: 18,
    exam: "enem",
    year: 2009,
    day: 1,
    text: "A instalação elétrica de uma casa envolve várias etapas, desde a alocação dos dispositivos, instrumentos e aparelhos elétricos, até a escolha dos materiais que a compõem, passando pelo dimensionamento da potência requerida, da fiação necessária, dos eletrodutos*, entre outras. Para cada aparelho elétrico existe um valor de potência associado. Valores típicos de potências para alguns aparelhos elétricos são apresentados no quadro seguinte:\n\n*Eletrodutos são condutos por onde passa a fiação de uma instalação elétrica, com a finalidade de protegê-la.\n\nA escolha das lâmpadas é essencial para obtenção de uma boa iluminação. A potência da lâmpada deverá estar de acordo com o tamanho do cômodo a ser iluminado. O quadro a seguir mostra a relação entre as áreas dos cômodos (em m²) e as potências das lâmpadas (em W), e foi utilizado como referência para o primeiro pavimento de uma residência.\n\nConsiderando a planta baixa fornecida, com todos os aparelhos em funcionamento, a potência total, em watts, será de",
    image: "https://i.postimg.cc/VNX8Hcbv/IMG_2815.jpg",
    imageAfterText: "seguinte:",
    image2: "https://i.postimg.cc/CKbg6Vfx/IMG-2816.jpg",
    imageAfterText2: "residência.",
    alternatives: [
      "A) 4.070.",
      "B) 4.270.",
      "C) 4.320.",
      "D) 4.390.",
      "E) 4.470."
    ],
    correct: "D",
    explanation: "(I) Observando a planta fornecida, cada cômodo possui um aparelho elétrico indicado na tabela inicial. A potência total desses equipamentos é obtida somando os valores correspondentes:\n\n120 W + 3000 W + 500 W + 200 W + 200 W + 50 W = 4070 W\n\n⸻\n\n(II) Em seguida, determina-se a potência necessária das lâmpadas a partir da área de cada ambiente\n\n       Sala: 3 m × 3 m = 9 m² → 100 W\n\tBanheiro: 1,5 m × 2,1 m ≈ 3,1 m² → 60 W\n\tCorredor: 0,9 m × 1,5 m ≈ 1,3 m² → 60 W\n\tQuarto: 2,8 m × 3 m = 8,4 m² → 100 W\n\nSomando:\n100 W + 60 W + 60 W + 100 W = 320 W\n\n(III) A potência total instalada na casa é a soma dos aparelhos com as lâmpadas:\n\n4070 W + 320 W = 4390 W",
    subject: "fis",
    topic: "Eletricidade"
  }
];

// ============================================
// ENEM 2013 - DIA 1
// ============================================
export const ENEM_2013_DIA1: QuestionData[] = [
  {
    id: 21,
    exam: "enem",
    year: 2013,
    day: 1,
    text: "Nos estados, entretanto, se instalavam as oligarquias, de cujo perigo já nos advertia Saint-Hilaire, e sob o disfarce do que se chamou \"a política dos governadores\".\nEm círculos concêntricos esse sistema vem cumular no próprio poder central que é o sol do nosso sistema.\n\nPRADO, P. Retrato do Brasil. Rio de Janeiro: José Olympio, 1972.\n\nA crítica presente no texto remete ao acordo que fundamentou o regime republicano brasileiro durante as três primeiras décadas do século XX e fortaleceu o(a)",
    image: null,
    alternatives: [
      "A) poder militar, enquanto fiador da ordem econômica.",
      "B) presidencialismo, com o objetivo de limitar o poder dos coronéis.",
      "C) domínio de grupos regionais sobre a ordem federativa.",
      "D) intervenção nos estados, autorizada pelas normas constitucionais.",
      "E) isonomia do governo federal no tratamento das disputas locais."
    ],
    correct: "C",
    explanation: "A Constituição de 1891 instituiu o federalismo e concedeu autonomia política aos estados, permitindo que elites regionais controlassem a política local. Esse arranjo, conhecido como política dos governadores, fortaleceu as oligarquias estaduais durante a República Velha.",
    subject: "his",
    topic: "Brasil República"
  },
  {
    id: 22,
    exam: "enem",
    year: 2013,
    day: 1,
    text: "No final do século XIX, as Grandes Sociedades carnavalescas alcançaram ampla popularidade entre os foliões cariocas. Tais sociedades cultivavam um pretensioso ideal em relação à comemoração carnavalesca em si mesma: com seus desfiles de carros enfeitados pelas principais ruas da cidade, pretendiam abolir o entrudo (brincadeira que consistia em jogar água nos foliões) e outras práticas difundidas entre a população desde os tempos coloniais, substituindo-os por formas de diversão que consideravam mais civilizadas, inspiradas nos carnavais de Veneza.\nContudo, ninguém parecia disposto a abrir mão de suas diversões para assistir ao carnaval das sociedades. O entrudo, na visão dos seus animados praticantes, poderia coexistir perfeitamente com os desfiles.\n\nPEREIRA, C. S. Os senhores da alegria: a presença das mulheres nas Grandes Sociedades carnavalescas cariocas em fins do século XIX. In: CUNHA, M. C. P. Carnavais e outras frestas. Campinas: Unicamp; Cecult, 2002 (adaptado).\n\nManifestações culturais como o carnaval também têm sua própria história, sendo constantemente reinventadas ao longo do tempo. A atuação das Grandes Sociedades, descrita no texto, mostra que o carnaval representava um momento em que as",
    image: null,
    alternatives: [
      "A) distinções sociais eram deixadas de lado em nome da celebração.",
      "B) aspirações cosmopolitas da elite impediam a realização da festa fora dos clubes.",
      "C) liberdades individuais eram extintas pelas regras das autoridades públicas.",
      "D) tradições populares se transformavam em matéria de disputas sociais.",
      "E) perseguições policiais tinham caráter xenófobo por repudiarem tradições estrangeiras."
    ],
    correct: "D",
    explanation: "O texto evidencia o confronto entre práticas populares, como o entrudo, e as tentativas das elites de impor modelos considerados mais civilizados. Isso demonstra que o carnaval era um espaço de disputas sociais e culturais, em constante transformação.",
    subject: "his",
    topic: "Movimentos sociais"
  }
];

// ============================================
// FUVEST 2015 - FASE 1
// ============================================
export const FUVEST_2015_FASE1: QuestionData[] = [
  {
    id: 23,
    exam: "fuvest",
    year: 2015,
    phase: 1,
    day: 1,
    text: "Examine estas imagens produzidas no antigo Egito:\n\nAs imagens revelam",
    image: "https://i.postimg.cc/zB6h3qNj/IMG-3094.jpg",
    alternatives: [
      "A) o caráter familiar do cultivo agrícola no Oriente Próximo, dada a escassez de mão de obra e a proibição, no antigo Egito, do trabalho compulsório.",
      "B) a inexistência de qualquer conhecimento tecnológico que permitisse o aprimoramento da produção de alimentos, o que provocava longas temporadas de fome.",
      "C) o prevalecimento da agricultura como única atividade econômica, dada a impossibilidade de caça ou pesca nas regiões ocupadas pelo antigo Egito.",
      "D) a dificuldade de acesso à água em todo o Egito, o que limitava as atividades de plantio e inviabilizava a criação de gado de maior porte.",
      "E) a importância das atividades agrícolas no antigo Egito, que ocupavam os trabalhadores durante aproximadamente metade do ano."
    ],
    correct: "E",
    explanation: "As imagens destacam práticas agrícolas desenvolvidas pelos egípcios, diretamente favorecidas pelo regime de cheias do rio Nilo. A inundação anual fertilizava as margens, garantindo solos ricos em nutrientes. Além disso, a civilização egípcia aperfeiçoou técnicas como irrigação, preparo da terra com arados e métodos de colheita, o que permitiu sustentar uma produção agrícola estável e altamente adaptada ao ambiente do vale do Nilo.",
    subject: "his",
    topic: "Egito Antigo"
  },
  {
    id: 24,
    exam: "fuvest",
    year: 2015,
    phase: 1,
    day: 1,
    text: "Em certos aspectos, os gregos da Antiguidade foram sempre um povo disperso. Penetraram em pequenos grupos no mundo mediterrânico e, mesmo quando se instalaram e acabaram por dominá-lo, permaneceram desunidos na sua organização política. No tempo de Heródoto, e muito antes dele, encontravam-se colônias gregas não somente em toda a extensão da Grécia atual, como também no litoral do Mar Negro, nas costas da atual Turquia, na Itália do sul e na Sicília oriental, na costa setentrional da África e no litoral mediterrânico da França. No interior desta elipse de uns 2500 km de comprimento, encontravam-se centenas e centenas de comunidades que amiúde diferiam na sua estrutura política e que afirmaram sempre a sua soberania.\nNem então nem em nenhuma outra altura, no mundo antigo, houve uma nação, um território nacional único regido por uma lei soberana, que se tenha chamado Grécia (ou um sinônimo de Grécia).\n\nCom base no texto, pode-se apontar corretamente",
    image: null,
    alternatives: [
      "A) a desorganização política da Grécia antiga, que sucumbiu rapidamente ante as investidas militares de povos mais unidos e mais bem preparados para a guerra, como os egípcios e macedônios.",
      "B) a necessidade de profunda centralização política, como a ocorrida entre os romanos e cartagineses, para que um povo pudesse expandir seu território e difundir sua produção cultural.",
      "C) a carência, entre quase todos os povos da Antiguidade, de pensadores políticos capazes de formular estratégias adequadas de estruturação e unificação do poder político.",
      "D) a inadequação do uso de conceitos modernos, como nação ou Estado nacional, no estudo sobre a Grécia antiga, que vivia sob outras formas de organização social e política.",
      "E) a valorização, na Grécia antiga, dos princípios do patriotismo e do nacionalismo, como forma de consolidar política e economicamente o Estado nacional."
    ],
    correct: "D",
    explanation: "O texto destaca que os gregos eram politicamente fragmentados em várias pólis independentes. Por isso, aplicar conceitos modernos como nação ou Estado nacional é inadequado ao estudar a Grécia Antiga. Cada comunidade possuía suas próprias leis e organização.",
    subject: "his",
    topic: "Grécia Antiga"
  }
];

// ============================================
// FUNÇÃO PARA OBTER TODAS AS QUESTÕES
// ============================================
export const getAllQuestions = (): QuestionData[] => {
  return [
    ...ENEM_2009_DIA1,
    ...ENEM_2013_DIA1,
    ...FUVEST_2015_FASE1
  ];
};

// ============================================
// FUNÇÕES DE FILTRO
// ============================================
export const getQuestionsByExam = (exam: string): QuestionData[] => {
  return getAllQuestions().filter(q => q.exam === exam);
};

export const getQuestionsByYear = (exam: string, year: number): QuestionData[] => {
  return getAllQuestions().filter(q => q.exam === exam && q.year === year);
};

export const getQuestionsByDay = (exam: string, year: number, day: number): QuestionData[] => {
  return getAllQuestions().filter(q => q.exam === exam && q.year === year && q.day === day);
};

export const getQuestionsByPhase = (exam: string, year: number, phase: number): QuestionData[] => {
  return getAllQuestions().filter(q => q.exam === exam && q.year === year && q.phase === phase);
};

export const getQuestionsByPhaseAndDay = (exam: string, year: number, phase: number, day: number): QuestionData[] => {
  return getAllQuestions().filter(q => 
    q.exam === exam && q.year === year && q.phase === phase && q.day === day
  );
};

export const getQuestionsBySubject = (exam: string, subject: string): QuestionData[] => {
  return getAllQuestions().filter(q => q.exam === exam && q.subject === subject);
};

export const getQuestionsByTopic = (exam: string, subject: string, topic: string): QuestionData[] => {
  return getAllQuestions().filter(q => q.exam === exam && q.subject === subject && q.topic === topic);
};

// Função específica para UERJ Provas Específicas
export const getUerjSpecificQuestions = (year: number, subject: string): QuestionData[] => {
  return getAllQuestions().filter(q => 
    q.exam === 'uerj' && q.year === year && q.subject === subject
  );
};
