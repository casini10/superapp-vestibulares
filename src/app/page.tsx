'use client';

import { useState } from 'react';
import { GraduationCap, ArrowLeft, BookOpen, Calendar, ChevronRight, Camera, Shuffle, Check, X, Moon, Sun } from 'lucide-react';

// SuperApp Vestibulares - Sistema completo de estudos
// Tipos
type Screen = 'home' | 'mode' | 'subjects' | 'years' | 'topics' | 'questions' | 'year-questions' | 'photos' | 'random-questions' | 'year-day-selection' | 'year-phase-selection' | 'fuvest-phase-day-selection' | 'quiz-mode' | 'quiz-results' | 'uerj-exam-type' | 'uerj-specific-year' | 'uerj-specific-subject'| 'puc-day-selection';
;
type ExamId = 'enem' | 'uerj' | 'fuvest' | 'puc';
type TopicTab = 'assuntos' | 'fotos' | 'aleatorio';
type UerjExamType = 'primeiro-exame' | 'segundo-exame' | 'provas-especificas';

// Interface para questões
interface QuizQuestion {
  id: number;
  exam: ExamId;
  year: number;
  day: number;
  phase?: number; // Para FUVEST
  dayOption?: number; // 1..N (só quando existir)
  text: string;
  image?: string;
  imageAfterText?: string;
  image2?: string;
  imageAfterText2?: string;
  alternatives: string[];
  correct: string;
  explanation: string;
  subject: string;
  topic: string;
}

// Banco de questões centralizado
const ALL_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    exam: 'uerj',
    year: 2009,
    day:2,
    text: "A atmosfera terrestre é composta pelos gases nitrogênio (N₂) e oxigênio (O₂), que somam cerca de 99%, e por gases traços, entre eles o gás carbônico (CO₂), vapor de água (H₂O), metano (CH₄), ozônio (O₃) e o óxido nitroso (N₂O), que compõem o restante 1% do ar que respiramos. Os gases traços, por serem constituídos por pelo menos três átomos, conseguem absorver o calor irradiado pela Terra, aquecendo o planeta. Esse fenômeno, que acontece há bilhões de anos, é chamado de efeito estufa. A partir da Revolução Industrial (século XIX), a concentração de gases traços na atmosfera, em particular o CO₂, tem aumentado significativamente, o que resultou no aumento da temperatura em escala global. Mais recentemente, outro fator tornou-se diretamente envolvido no aumento da concentração de CO₂ na atmosfera: o desmatamento.\n\nBROWN, I. F.; ALECHANDRE, A. S. Conceitos básicos sobre clima, carbono, florestas e comunidades. A. G. Moreira & S. Schwartzman. As mudanças climáticas globais e os ecossistemas brasileiros. Brasília: Instituto de Pesquisa Ambiental da Amazônia, 2000 (adaptado).\n\nConsiderando o texto, uma alternativa viável para combater o efeito estufa é",
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
  {id: 21,
    exam: "uerj",
    year: 2013,
    day: 3,
    text: "Nos estados, entretanto, se instalavam as oligarquias, de cujo perigo já nos advertia Saint-Hilaire, e sob o disfarce do que se chamou \"a política dos governadores\".\nEm círculos concêntricos esse sistema vem cumular no próprio poder central que é o sol do nosso sistema.\n\nPRADO, P. Retrato do Brasil. Rio de Janeiro: José Olympio, 1972.\n\nA crítica presente no texto remete ao acordo que fundamentou o regime republicano brasileiro durante as três primeiras décadas do século XX e fortaleceu o(a)",
    image: "https://i.postimg.cc/KYM8Qxjd/IMG-2813.jpg",
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
    topic: "Brasil República"},
  {
    id: 2,
    exam: 'enem',
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "Em um experimento, preparou-se um conjunto de plantas por técnica de clonagem a partir de uma planta original que apresentava folhas verdes. Esse conjunto foi dividido em dois grupos, que foram tratados de maneira idêntica, com exceção das condições de iluminação, sendo um grupo exposto a ciclos de iluminação solar natural e outro mantido no escuro. Após alguns dias, observou-se que o grupo exposto à luz apresentava folhas verdes como a planta original e o grupo cultivado no escuro apresentava folhas amareladas.\n\nAo final do experimento, os dois grupos de plantas apresentaram",
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "Na linha de uma tradição antiga, o astrônomo grego Ptolomeu (100-170 d.C.) afirmou a tese do geocentrismo, segundo a qual a Terra seria o centro do universo, sendo que o Sol, a Lua e os planetas girariam em seu redor em órbitas circulares. A teoria de Ptolomeu resolvia de modo razoável os problemas astronômicos da sua época. Vários séculos mais tarde, o clérigo e astrônomo polonês Nicolau Copérnico (1473-1543), ao encontrar inexatidões na teoria de Ptolomeu, formulou a teoria do heliocentrismo, segundo a qual o Sol deveria ser considerado o centro do universo, com a Terra, a Lua e os planetas girando circularmente em torno dele. Por fim, o astrônomo e matemático alemão Johannes Kepler (1571-1630), depois de estudar o planeta Marte por cerca de trinta anos, verificou que a sua órbita é elíptica. Esse resultado generalizou-se para os demais planetas.\n\nA respeito dos estudiosos citados no texto, é correto afirmar que",
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "Um novo método para produzir insulina artificial que utiliza tecnologia de DNA recombinante foi desenvolvido por pesquisadores do Departamento de Biologia Celular da Universidade de Brasília (UnB) em parceria com a iniciativa privada. Os pesquisadores modificaram geneticamente a bactéria Escherichia coli para torná-la capaz de sintetizar o hormônio. O processo permitiu fabricar insulina em maior quantidade e em apenas 30 dias, um terço do tempo necessário para obtê-la pelo método tradicional, que consiste na extração do hormônio a partir do pâncreas de animais abatidos.\n\nCiência Hoje, 24 abr. 2001. Disponível em: http://cienciahoje.uol.com.br (adaptado).\n\nA produção de insulina pela técnica do DNA recombinante tem, como consequência,",
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "O ciclo biogeoquímico do carbono compreende diversos compartimentos, entre os quais a Terra, a atmosfera e os oceanos, e diversos processos que permitem a transferência de compostos entre esses reservatórios. Os estoques de carbono armazenados na forma de recursos não renováveis, por exemplo, o petróleo, são limitados, sendo de grande relevância que se perceba a importância da substituição de combustíveis fósseis por combustíveis de fontes renováveis.\n\nA utilização de combustíveis fósseis interfere no ciclo do carbono, pois provoca",
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "A economia moderna depende da disponibilidade de muita energia em diferentes formas, para funcionar e crescer. No Brasil, o consumo total de energia pelas indústrias cresceu mais de quatro vezes no período entre 1970 e 2005. Enquanto os investimentos em energias limpas e renováveis, como solar e eólica, ainda são incipientes, ao se avaliar a possibilidade de instalação de usinas geradoras de energia elétrica, diversos fatores devem ser levados em consideração, tais como os impactos causados ao ambiente e às populações locais.\n\nRicardo, B. e Campanili, M. Almanaque Brasil Socioambiental. Instituto Socioambiental. São Paulo, 2007 (adaptado).\n\nEm uma situação hipotética, optou-se por construir uma usina hidrelétrica em região que abrange diversas quedas d'água em rios cercados por mata, alegando-se que causaria impacto ambiental muito menor que uma usina termelétrica. Entre os possíveis impactos da instalação de uma usina hidrelétrica nessa região, inclui-se",
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "As mudanças climáticas e da vegetação ocorridas nos trópicos da América do Sul têm sido bem documentadas por diversos autores, existindo um grande acúmulo de evidências geológicas ou paleoclimatológicas que evidenciam essas mudanças ocorridas durante o Quaternário nessa região. Essas mudanças resultaram em restrição da distribuição das florestas pluviais, com expansões concomitantes de habitats não-florestais durante períodos áridos (glaciais), seguido da expansão das florestas pluviais e restrição das áreas não-florestais durante períodos úmidos (interglaciais).\n\nDisponível em: http://zoo.bio.ufpr.br. Acesso em: 1 maio 2009.\n\nDurante os períodos glaciais,",
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "Para que todos os órgãos do corpo humano funcionem em boas condições, é necessário que a temperatura do corpo fique sempre entre 36 °C e 37 °C. Para manter-se dentro dessa faixa, em dias de muito calor ou durante intensos exercícios físicos, uma série de mecanismos fisiológicos é acionada.\n\nPode-se citar como o principal responsável pela manutenção da temperatura corporal humana o sistema",
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "A fotossíntese é importante para a vida na Terra. Nos cloroplastos dos organismos fotossintetizantes, a energia solar é convertida em energia química que, juntamente com água e gás carbônico (CO₂), é utilizada para a síntese de compostos orgânicos (carboidratos). A fotossíntese é o único processo de importância biológica capaz de realizar essa conversão. Todos os organismos, incluindo os produtores, aproveitam a energia armazenada nos carboidratos para impulsionar os processos celulares, liberando CO₂ para a atmosfera e água para a célula por meio da respiração celular. Além disso, grande fração dos recursos energéticos do planeta, produzidos tanto no presente (biomassa) como em tempos remotos (combustível fóssil), é resultante da atividade fotossintética.\n\nAs informações sobre obtenção e transformação dos recursos naturais por meio dos processos vitais de fotossíntese e respiração, descritas no texto, permitem concluir que",
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
    exam: 'enem',
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "A abertura e a pavimentação de rodovias em zonas rurais e regiões afastadas dos centros urbanos, por um lado, possibilita melhor acesso e maior integração entre as comunidades, contribuindo com o desenvolvimento social e urbano de populações isoladas. Por outro lado, a construção de rodovias pode trazer impactos indesejáveis ao meio ambiente, visto que a abertura de estradas pode resultar na fragmentação de habitats, comprometendo o fluxo gênico e as interações entre espécies silvestres, além de prejudicar o fluxo natural de rios e riachos, possibilitar o ingresso de espécies exóticas em ambientes naturais e aumentar a pressão antrópica sobre os ecossistemas nativos.\n\nNesse contexto, para conciliar os interesses aparentemente contraditórios entre o progresso social e urbano e a conservação do meio ambiente, seria razoável",
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
    exam: 'enem',
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
    exam: 'enem',
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
    exam: 'enem',
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
    exam: 'enem',
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
    exam: 'enem',
    year: 2009,
    day: 1,
    text: "O Brasil pode se transformar no primeiro país das Américas a entrar no seleto grupo das nações que dispõem de trens-bala. O Ministério dos Transportes prevê o lançamento do edital de licitação internacional para a construção da ferrovia de alta velocidade Rio–São Paulo. A viagem ligará os 403 quilômetros entre a Central do Brasil, no Rio, e a Estação da Luz, no centro da capital paulista, em uma hora e 25 minutos.\n\nDisponível em: http://oglobo.globo.com.\nAcesso em: 14 jul. 2009.\n\nDevido à alta velocidade, um dos problemas a ser enfrentado na escolha do trajeto que será percorrido pelo trem é o dimensionamento das curvas. Considerando-se que uma aceleração lateral confortável para os passageiros e segura para o trem seja de 0,1 g, em que g é a aceleração da gravidade (considerada igual a 10 m/s²), e que a velocidade do trem se mantenha constante em todo o percurso, seria correto prever que as curvas existentes no trajeto deveriam ter raio de curvatura mínimo de, aproximadamente,",
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
    exam: 'enem',
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

// Função para obter quantidade de dias da 2ª fase da FUVEST baseado no ano
const getFuvestSecondPhaseDays = (year: number): number => {
  if (year === 2009) return 5;
  if (year >= 2010 && year <= 2018) return 3;
  if (year >= 2019 && year <= 2026) return 2;
  return 2; // padrão
};

// Dados dos vestibulares
const EXAMS = [
  { id: 'enem' as ExamId, name: 'ENEM', color: 'from-blue-500 to-blue-600', icon: '🎓' },
  { id: 'uerj' as ExamId, name: 'UERJ', color: 'from-red-500 to-red-600', icon: '🏛️' },
  { id: 'fuvest' as ExamId, name: 'FUVEST/USP', color: 'from-yellow-500 to-orange-500', icon: '⭐' },
  { id: 'puc' as ExamId, name: 'PUC-Rio', color: 'from-purple-500 to-purple-600', icon: '🎯' }
];

// Matérias por vestibular
const SUBJECTS_BY_EXAM = {
  enem: [
    { id: 'mat', name: 'Matemática', icon: '📊', color: 'bg-blue-500' },
    { id: 'fis', name: 'Física', icon: '⚡', color: 'bg-yellow-500' },
    { id: 'qui', name: 'Química', icon: '🧪', color: 'bg-green-500' },
    { id: 'bio', name: 'Biologia', icon: '🧬', color: 'bg-emerald-500' },
    { id: 'por', name: 'Português / Linguagens', icon: '📝', color: 'bg-red-500' },
    { id: 'ing', name: 'Inglês', icon: '🇺🇸', color: 'bg-indigo-500' },
    { id: 'esp', name: 'Espanhol', icon: '🇪🇸', color: 'bg-orange-500' },
    { id: 'his', name: 'História', icon: '📚', color: 'bg-amber-500' },
    { id: 'geo', name: 'Geografia', icon: '🌍', color: 'bg-cyan-500' },
    { id: 'fil', name: 'Filosofia', icon: '🤔', color: 'bg-purple-500' },
    { id: 'soc', name: 'Sociologia', icon: '👥', color: 'bg-pink-500' }
  ],
  uerj: [
    { id: 'mat', name: 'Matemática', icon: '📘', color: 'bg-blue-500' },
    { id: 'fis', name: 'Física', icon: '⚛️', color: 'bg-yellow-500' },
    { id: 'qui', name: 'Química', icon: '🧪', color: 'bg-green-500' },
    { id: 'bio', name: 'Biologia', icon: '🧬', color: 'bg-emerald-500' },
    { id: 'his', name: 'História', icon: '📜', color: 'bg-amber-500' },
    { id: 'geo', name: 'Geografia', icon: '🌍', color: 'bg-cyan-500' },
    { id: 'por', name: 'Português', icon: '📚', color: 'bg-red-500' },
    { id: 'lit', name: 'Literatura', icon: '📖', color: 'bg-pink-500' }
  ],
  fuvest: [
    { id: 'mat', name: 'Matemática', icon: '📊', color: 'bg-blue-500' },
    { id: 'fis', name: 'Física', icon: '⚛️', color: 'bg-yellow-500' },
    { id: 'qui', name: 'Química', icon: '🧪', color: 'bg-green-500' },
    { id: 'bio', name: 'Biologia', icon: '🧬', color: 'bg-emerald-500' },
    { id: 'por', name: 'Português / Literatura', icon: '📚', color: 'bg-red-500' },
    { id: 'ing', name: 'Inglês', icon: '🇬🇧', color: 'bg-indigo-500' },
    { id: 'his', name: 'História', icon: '📜', color: 'bg-amber-500' },
    { id: 'geo', name: 'Geografia', icon: '🌍', color: 'bg-cyan-500' },
    { id: 'fil', name: 'Filosofia e Sociologia', icon: '💡', color: 'bg-purple-500' }
  ],
  puc: [
    { id: 'mat', name: 'Matemática', icon: '📊', color: 'bg-blue-500' },
    { id: 'fis', name: 'Física', icon: '⚡', color: 'bg-yellow-500' },
    { id: 'qui', name: 'Química', icon: '🧪', color: 'bg-green-500' },
    { id: 'bio', name: 'Biologia', icon: '🧬', color: 'bg-emerald-500' },
    { id: 'por', name: 'Português / Literatura', icon: '📝', color: 'bg-red-500' },
    { id: 'ing', name: 'Inglês', icon: '🇺🇸', color: 'bg-indigo-500' },
    { id: 'his', name: 'História', icon: '📚', color: 'bg-amber-500' },
    { id: 'geo', name: 'Geografia', icon: '🌍', color: 'bg-cyan-500' }
  ]
};

// Assuntos por matéria
const TOPICS_BY_SUBJECT: Record<string, Record<ExamId, string[]>> = {
  mat: {
    enem: [
      'Funções',
      'Geometria plana',
      'Geometria espacial',
      'Estatística e probabilidade',
      'Razão e proporção',
      'Porcentagem',
      'Equações e inequações',
      'Trigonometria',
      'Análise combinatória',
      'Progressões (PA e PG)',
      'Matemática financeira',
      'Matrizes e determinantes',
      '🎲 Questões aleatórias'
    ],
    uerj: ['Funções', 'Geometria', 'Trigonometria', 'Análise combinatória', 'Probabilidade', 'Estatística', '🎲 Questões aleatórias'],
    fuvest: ['Funções', 'Geometria', 'Trigonometria', 'Análise combinatória', 'Probabilidade', 'Estatística', '🎲 Questões aleatórias'],
    puc: ['Funções', 'Geometria plana', 'Geometria espacial', 'Estatística e probabilidade', 'Razão e proporção', 'Porcentagem', 'Equações e inequações', 'Trigonometria', 'Análise combinatória', 'Progressões', 'Matemática financeira', 'Matrizes e determinantes', '🎲 Questões aleatórias']
  },
  por: {
    enem: [
      'Interpretação de texto',
      'Gramática (sintaxe, morfologia, semântica)',
      'Literatura brasileira',
      'Gêneros textuais',
      'Figuras de linguagem',
      'Funções da linguagem',
      'Variação linguística',
      'Intertextualidade',
      'Redação (estrutura e argumentação)',
      '🎲 Questões aleatórias'
    ],
    uerj: ['Interpretação de texto', 'Gramática', 'Literatura brasileira', 'Redação', '🎲 Questões aleatórias'],
    fuvest: ['Interpretação de texto', 'Gramática', 'Literatura brasileira', 'Redação', '🎲 Questões aleatórias'],
    puc: ['Interpretação de texto', 'Gramática', 'Literatura brasileira', 'Gêneros textuais', 'Figuras de linguagem', 'Funções da linguagem', 'Variação linguística', 'Intertextualidade', 'Redação', '🎲 Questões aleatórias']
  },
  lit: {
    enem: ['Literatura brasileira', 'Literatura portuguesa', 'Escolas literárias', 'Análise de obras', '🎲 Questões aleatórias'],
    uerj: ['Literatura brasileira', 'Literatura portuguesa', 'Escolas literárias', 'Análise de obras', '🎲 Questões aleatórias'],
    fuvest: ['Literatura brasileira', 'Literatura portuguesa', 'Escolas literárias', 'Análise de obras', '🎲 Questões aleatórias'],
    puc: ['Literatura brasileira', 'Literatura portuguesa', 'Escolas literárias', 'Análise de obras', '🎲 Questões aleatórias']
  },
  ing: {
    enem: [
      'Interpretação de texto',
      'Vocabulário',
      'Gramática básica',
      'Tempos verbais',
      'Conectivos',
      'Pronomes',
      'Preposições',
      'Advérbios',
      '🎲 Questões aleatórias'
    ],
    uerj: ['Interpretação de texto', 'Vocabulário', 'Gramática', '🎲 Questões aleatórias'],
    fuvest: ['Interpretação de texto', 'Vocabulário', 'Gramática', '🎲 Questões aleatórias'],
    puc: ['Interpretação de texto', 'Vocabulário', 'Gramática básica', 'Tempos verbais', 'Conectivos', 'Pronomes', 'Preposições', 'Advérbios', '🎲 Questões aleatórias']
  },
  esp: {
    enem: [
      'Interpretação de texto',
      'Vocabulário',
      'Gramática básica',
      'Tempos verbais',
      'Conectivos',
      'Pronomes',
      'Preposições',
      'Advérbios',
      '🎲 Questões aleatórias'
    ],
    uerj: ['Interpretação de texto', 'Vocabulário', 'Gramática', '🎲 Questões aleatórias'],
    fuvest: ['Interpretação de texto', 'Vocabulário', 'Gramática', '🎲 Questões aleatórias'],
    puc: ['Interpretação de texto', 'Vocabulário', 'Gramática básica', 'Tempos verbais', 'Conectivos', 'Pronomes', 'Preposições', 'Advérbios', '🎲 Questões aleatórias']
  },
  his: {
    enem: [
      'Brasil Colônia',
      'Brasil Império',
      'Brasil República',
      'História Geral Antiga e Medieval',
      'História Moderna',
      'História Contemporânea',
      'Primeira e Segunda Guerra Mundial',
      'Guerra Fria',
      'Ditadura Militar no Brasil',
      'Escravidão e abolição',
      'Movimentos sociais',
      '🎲 Questões aleatórias'
    ],
    uerj: ['Brasil Colônia', 'Brasil Império', 'Brasil República', 'História Geral', 'Ditadura Militar', '🎲 Questões aleatórias'],
    fuvest: ['Brasil Colônia', 'Brasil Império', 'Brasil República', 'História Geral', 'Ditadura Militar', '🎲 Questões aleatórias'],
    puc: ['Brasil Colônia', 'Brasil Império', 'Brasil República', 'História Geral Antiga e Medieval', 'História Moderna', 'História Contemporânea', 'Guerras Mundiais', 'Guerra Fria', 'Ditadura Militar', 'Escravidão', 'Movimentos sociais', '🎲 Questões aleatórias']
  },
  geo: {
    enem: [
      'Geografia física (clima, relevo, hidrografia)',
      'Geopolítica',
      'Urbanização',
      'Globalização',
      'Meio ambiente e sustentabilidade',
      'Cartografia',
      'Demografia',
      'Agricultura e pecuária',
      'Indústria e comércio',
      'Energia e recursos naturais',
      'Conflitos internacionais',
      '🎲 Questões aleatórias'
    ],
    uerj: ['Geografia física', 'Geopolítica', 'Urbanização', 'Meio ambiente', 'Cartografia', '🎲 Questões aleatórias'],
    fuvest: ['Geografia física', 'Geopolítica', 'Urbanização', 'Meio ambiente', 'Cartografia', '🎲 Questões aleatórias'],
    puc: ['Geografia física', 'Geopolítica', 'Urbanização', 'Globalização', 'Meio ambiente', 'Cartografia', 'Demografia', 'Agricultura', 'Indústria', 'Energia', 'Conflitos internacionais', '🎲 Questões aleatórias']
  },
  fil: {
    enem: [
      'Filosofia Antiga (Sócrates, Platão, Aristóteles)',
      'Filosofia Medieval',
      'Filosofia Moderna (Descartes, Kant, Hume)',
      'Filosofia Contemporânea',
      'Ética e moral',
      'Política e Estado',
      'Teoria do conhecimento',
      'Lógica',
      'Estética',
      '🎲 Questões aleatórias'
    ],
    uerj: ['Filosofia Antiga', 'Filosofia Moderna', 'Ética', 'Política', 'Teoria do conhecimento', '🎲 Questões aleatórias'],
    fuvest: ['Filosofia Antiga', 'Filosofia Moderna', 'Ética', 'Política', 'Teoria do conhecimento', '🎲 Questões aleatórias'],
    puc: ['Filosofia Antiga', 'Filosofia Medieval', 'Filosofia Moderna', 'Filosofia Contemporânea', 'Ética', 'Política', 'Teoria do conhecimento', 'Lógica', 'Estética', '🎲 Questões aleatórias']
  },
  bio: {
    enem: [
      'Ecologia',
      'Citologia',
      'Genética',
      'Fisiologia Humana',
      'Evolução',
      'Botânica',
      'Zoologia',
      'Biomas do Brasil',
      'Saúde pública & parasitologia (doenças, vetores, prevenção)',
      'Biotecnologia',
      'Histologia básica (tecidos – leitura de figura)',
      '🎲 Questões aleatórias'
    ],
    uerj: ['Genética', 'Ecologia', 'Citologia', 'Fisiologia humana', 'Evolução', 'Biotecnologia', 'Botânica', '🎲 Questões aleatórias'],
    fuvest: ['Genética', 'Ecologia', 'Citologia', 'Fisiologia humana', 'Evolução', 'Biotecnologia', 'Botânica', '🎲 Questões aleatórias'],
    puc: ['Ecologia', 'Citologia', 'Genética', 'Fisiologia', 'Evolução', 'Botânica', 'Zoologia', 'Biomas do Brasil', 'Saúde pública & parasitologia', 'Biotecnologia', 'Histologia básica', '🎲 Questões aleatórias']
  },
  fis: {
    enem: ['Eletrodinâmica', 'Cinemática', 'Dinâmica', 'Termologia', 'Óptica', 'Hidrostática', 'Ondulatória', 'Trabalho, energia e potência', 'Impulso e quantidade de movimento', 'Termodinâmica', 'Eletromagnetismo/Indução', 'Gravitação', 'Hidrodinâmica', 'Física moderna', 'Eletricidade', 'Leis de Newton', '🎲 Questões aleatórias'],
    uerj: ['Leis de Newton e dinâmica', 'Trabalho, energia e potência', 'Cinemática', 'Eletricidade', 'Termologia', 'Óptica', 'Ondulatória', '🎲 Questões aleatórias'],
    fuvest: ['Leis de Newton e dinâmica', 'Trabalho, energia e potência', 'Cinemática', 'Eletricidade', 'Termologia', 'Óptica', 'Ondulatória', '🎲 Questões aleatórias'],
    puc: ['Eletrodinâmica', 'Cinemática', 'Dinâmica', 'Termologia', 'Óptica', 'Hidrostática', 'Ondulatória', 'Trabalho, energia e potência', 'Impulso e quantidade de movimento', 'Termodinâmica', 'Eletromagnetismo/Indução', 'Gravitação', 'Hidrodinâmica', 'Física moderna', 'Eletricidade', 'Leis de Newton', '🎲 Questões aleatórias']
  },
  qui: {
    enem: ['Química Orgânica', 'Físico-química', 'Química Geral', 'Química Ambiental', 'Eletroquímica', '🎲 Questões aleatórias'],
    uerj: ['Química Orgânica', 'Físico-química', 'Química Geral', 'Eletroquímica', '🎲 Questões aleatórias'],
    fuvest: ['Química Orgânica', 'Físico-química', 'Química Geral', 'Eletroquímica', '🎲 Questões aleatórias'],
    puc: ['Química Orgânica', 'Físico-química', 'Química Geral', 'Química Ambiental', 'Eletroquímica', '🎲 Questões aleatórias']
  }
};

// Anos disponíveis
const YEARS = Array.from({ length: 16 }, (_, i) => 2024 - i);

// Anos disponíveis para Provas Específicas da UERJ
const UERJ_SPECIFIC_YEARS = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// Função auxiliar para renderizar texto com imagem posicionada
function renderQuestionText(question: QuizQuestion) {
  if (!question.image || !question.imageAfterText) {
    return (
      <>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {question.text}
        </p>
        {question.image && (
          <div className="mt-6">
            <img 
              src={question.image} 
              alt="Imagem da questão" 
              className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
            />
          </div>
        )}
      </>
    );
  }

  // Dividir texto e inserir primeira imagem
  const parts = question.text.split(question.imageAfterText);
  
  // Se houver segunda imagem, processar também
  if (question.image2 && question.imageAfterText2 && parts[1]) {
    const parts2 = parts[1].split(question.imageAfterText2);
    
    return (
      <>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {parts[0]}{question.imageAfterText}
        </p>
        <div className="my-6">
          <img 
            src={question.image} 
            alt="Imagem da questão" 
            className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
          />
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {parts2[0]}{question.imageAfterText2}
        </p>
        <div className="my-6">
          <img 
            src={question.image2} 
            alt="Segunda imagem da questão" 
            className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
          />
        </div>
        {parts2[1] && (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {parts2[1]}
          </p>
        )}
      </>
    );
  }
  
  // Apenas uma imagem
  return (
    <>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
        {parts[0]}{question.imageAfterText}
      </p>
      <div className="my-6">
        <img 
          src={question.image} 
          alt="Imagem da questão" 
          className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
        />
      </div>
      {parts[1] && (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {parts[1]}
        </p>
      )}
    </>
  );
}

// Componente de Questão para Modo Quiz (Prova por Ano)
function QuizQuestionCard({ 
  question, 
  onAnswer,
  selectedAnswer,
  showAnswerKey
}: { 
  question: QuizQuestion; 
  onAnswer: (answer: string) => void;
  selectedAnswer: string | null;
  showAnswerKey?: boolean;
}) {
  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Cabeçalho da questão */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold text-white">{question.id}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Questão {question.id}
          </h3>
        </div>
        {renderQuestionText(question)}
      </div>

      {/* Alternativas */}
      <div className="space-y-3">
        {question.alternatives.map((alternative, index) => {
          const letter = getOptionLetter(index);
          const isSelected = selectedAnswer === letter;
          const isCorrect = letter === question.correct;
          
          let buttonClass = "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ";
          
          if (showAnswerKey) {
            if (isCorrect) {
              buttonClass += "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200";
            } else if (isSelected && !isCorrect) {
              buttonClass += "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200";
            } else {
              buttonClass += "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300";
            }
          } else {
            if (isSelected) {
              buttonClass += "bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-800 dark:text-blue-200";
            } else {
              buttonClass += "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600";
            }
          }
          
          return (
            <button
              key={index}
              onClick={() => !showAnswerKey && onAnswer(letter)}
              disabled={showAnswerKey}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  showAnswerKey && isCorrect 
                    ? 'bg-green-500 text-white' 
                    : showAnswerKey && isSelected && !isCorrect
                    ? 'bg-red-500 text-white'
                    : isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {showAnswerKey && isCorrect ? (
                    <Check className="w-4 h-4" />
                  ) : showAnswerKey && isSelected && !isCorrect ? (
                    <X className="w-4 h-4" />
                  ) : (
                    letter
                  )}
                </div>
                <span className="flex-1">
                  {alternative.replace(/^[A-E]\)\s*/, '')}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Gabarito e Resolução (aparecem quando showAnswerKey = true) */}
      {showAnswerKey && (
        <>
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">
              ✅ Gabarito: Letra {question.correct}
            </h4>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Resolução:</h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
              {question.explanation}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// Componente de Questão para Estudo por Matéria (com gabarito individual por questão)
function StudyQuestionCard({ 
  question,
  selectedAnswer,
  showResult,
  onSelectAnswer,
  onVerify
}: { 
  question: QuizQuestion;
  selectedAnswer: string | null;
  showResult: boolean;
  onSelectAnswer: (answer: string) => void;
  onVerify: () => void;
}) {
  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Cabeçalho da questão */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-lg font-bold text-white">{question.id}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Questão {question.id}
          </h3>
        </div>
        {renderQuestionText(question)}
      </div>

      {/* Alternativas */}
      <div className="space-y-3 mb-6">
        {question.alternatives.map((alternative, index) => {
          const letter = getOptionLetter(index);
          const isSelected = selectedAnswer === letter;
          const isCorrect = letter === question.correct;
          
          let buttonClass = "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ";
          
          if (showResult) {
            if (isCorrect) {
              buttonClass += "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200";
            } else if (isSelected && !isCorrect) {
              buttonClass += "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200";
            } else {
              buttonClass += "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300";
            }
          } else {
            if (isSelected) {
              buttonClass += "bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-800 dark:text-blue-200";
            } else {
              buttonClass += "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600";
            }
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && onSelectAnswer(letter)}
              disabled={showResult}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  showResult && isCorrect 
                    ? 'bg-green-500 text-white' 
                    : showResult && isSelected && !isCorrect
                    ? 'bg-red-500 text-white'
                    : isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}>
                  {showResult && isCorrect ? (
                    <Check className="w-4 h-4" />
                  ) : showResult && isSelected && !isCorrect ? (
                    <X className="w-4 h-4" />
                  ) : (
                    letter
                  )}
                </div>
                <span className="flex-1">
                  {alternative.replace(/^[A-E]\)\s*/, '')}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Gabarito (aparece imediatamente no modo Estudo) */}
      {showResult && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">
            ✅ Gabarito: Letra {question.correct}
          </h4>
        </div>
      )}

      {/* Resolução (aparece imediatamente no modo Estudo) */}
      {showResult && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Resolução:</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Botão de verificar */}
      {!showResult && (
        <button
          onClick={onVerify}
          disabled={!selectedAnswer}
          className={`w-full px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            selectedAnswer
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          Verificar Resposta
        </button>
      )}
    </div>
  );
}

export default function SuperAppVestibulares() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedExam, setSelectedExam] = useState<ExamId | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [selectedUerjExamType, setSelectedUerjExamType] = useState<UerjExamType | null>(null);
  const [selectedUerjSpecificYear, setSelectedUerjSpecificYear] = useState<number | null>(null);
  const [selectedUerjSpecificSubject, setSelectedUerjSpecificSubject] = useState<string | null>(null);
  const [activeTopicTab, setActiveTopicTab] = useState<TopicTab>('assuntos');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  // Estados para o modo Quiz (Prova por Ano)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  // Estados para o modo Estudo por Matéria (controle individual por questão)
  const [studyAnswers, setStudyAnswers] = useState<Record<number, string>>({});
  const [studyShowResults, setStudyShowResults] = useState<Record<number, boolean>>({});

  // Função para filtrar questões por ano, vestibular, fase e dia
  const getQuestionsByYearPhaseAndDay = (exam: ExamId, year: number, phase: number, day: number) => {
    return ALL_QUESTIONS.filter(q => 
      q.exam === exam && q.year === year && (q.phase === phase || phase === 1) && q.day === day
    );
  };

  // Função para filtrar questões da UERJ por ano e matéria (Provas Específicas)
  const getUerjSpecificQuestions = (year: number, subject: string) => {
    return ALL_QUESTIONS.filter(q => 
      q.exam === 'uerj' && q.year === year && q.subject === subject
    );
  };

  // Função para voltar
  const goBack = () => {
  if (currentScreen === 'mode') {
    setCurrentScreen('home');
    setSelectedExam(null);

  } else if (currentScreen === 'subjects' || currentScreen === 'years') {
    setCurrentScreen('mode');

  } else if (
    currentScreen === 'topics' ||
    currentScreen === 'photos' ||
    currentScreen === 'random-questions'
  ) {
    setCurrentScreen('subjects');
    setSelectedSubject(null);
    setActiveTopicTab('assuntos');

  } else if (currentScreen === 'questions') {
    setCurrentScreen('topics');
    setSelectedTopic(null);
    setCurrentQuestionIndex(0);
    setStudyAnswers({});
    setStudyShowResults({});

  } else if (currentScreen === 'year-day-selection') {
    setCurrentScreen('years');
    setSelectedYear(null);
    setSelectedDay(null);

  } 
  /* 🔴 PUC: voltar do dia para o ano */
  else if (currentScreen === 'puc-day-selection') {
    setCurrentScreen('years');
    setSelectedDay(null);
  }

  else if (currentScreen === 'year-phase-selection') {
    setCurrentScreen('years');
    setSelectedYear(null);
    setSelectedPhase(null);

  } else if (currentScreen === 'fuvest-phase-day-selection') {
    setCurrentScreen('year-phase-selection');
    setSelectedPhase(null);
    setSelectedDay(null);

  } else if (currentScreen === 'uerj-exam-type') {
    setCurrentScreen('years');
    setSelectedYear(null);
    setSelectedUerjExamType(null);

  } else if (currentScreen === 'uerj-specific-year') {
    setCurrentScreen('uerj-exam-type');
    setSelectedUerjSpecificYear(null);

  } else if (currentScreen === 'uerj-specific-subject') {
    setCurrentScreen('uerj-specific-year');
    setSelectedUerjSpecificSubject(null);

  } else if (currentScreen === 'quiz-mode') {

    if (selectedExam === 'enem') {
      setCurrentScreen('year-day-selection');
      setSelectedDay(null);

    } else if (selectedExam === 'fuvest') {
      setCurrentScreen('fuvest-phase-day-selection');
      setSelectedDay(null);

    } 
    /* 🔴 PUC: voltar do quiz para escolha de dia */
    else if (selectedExam === 'puc') {
      setCurrentScreen('puc-day-selection');
      setSelectedDay(null);
    }

    else if (
     selectedExam === 'uerj' &&
  selectedDay === 3 && // 🔴 REGRA REAL
  selectedUerjExamType === 'provas-especificas'
) {
  setCurrentScreen('uerj-specific-subject');
  setSelectedUerjSpecificSubject(null);
}else {
      setCurrentScreen('years');
      setSelectedYear(null);
    }

    setQuizAnswers({});
    setCurrentQuestionIndex(0);
    setShowAnswerKey(false);

  } else if (currentScreen === 'quiz-results') {
    setCurrentScreen('quiz-mode');
    setCurrentQuestionIndex(0);
    setShowAnswerKey(true);
  }
};

  // Função para selecionar vestibular
  const selectExam = (examId: ExamId) => {
    setSelectedExam(examId);
    setCurrentScreen('mode');
  };

  // Função para selecionar matéria
  const selectSubject = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setCurrentScreen('topics');
    setActiveTopicTab('assuntos');
  };

  // Função para selecionar assunto
  const selectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setCurrentScreen('questions');
    setCurrentQuestionIndex(0);
    // Limpar estados do modo Estudo ao selecionar novo tópico
    setStudyAnswers({});
    setStudyShowResults({});
  };

  // Função para selecionar ano
  const selectYear = (year: number) => {
  setSelectedYear(year);
  
  if (selectedExam === 'enem') {
    setCurrentScreen('year-day-selection');
  } else if (selectedExam === 'fuvest') {
    setCurrentScreen('year-phase-selection');
  } else if (selectedExam === 'uerj') {
    setCurrentScreen('uerj-exam-type');
  } else if (selectedExam === 'puc') { 
    setCurrentScreen('puc-day-selection'); 
  } else {
    setCurrentScreen('year-questions');
  }
};


  // Função para selecionar dia (ENEM)
  const selectDay = (day: number) => {
    setSelectedDay(day);
    setCurrentScreen('quiz-mode');
    setQuizAnswers({});
    setCurrentQuestionIndex(0);
    setShowAnswerKey(false);
  };

  // Função para selecionar fase (FUVEST)
  const selectPhase = (phase: number) => {
    setSelectedPhase(phase);
    
    if (phase === 1) {
      // 1ª Fase tem apenas 1 dia
      setSelectedDay(1);
      setCurrentScreen('quiz-mode');
      setQuizAnswers({});
      setCurrentQuestionIndex(0);
      setShowAnswerKey(false);
    } else {
      // 2ª Fase - mostrar seleção de dias
      setCurrentScreen('fuvest-phase-day-selection');
    }
  };

  // Função para selecionar dia da 2ª fase da FUVEST
  const selectFuvestSecondPhaseDay = (day: number) => {
    setSelectedDay(day);
    setCurrentScreen('quiz-mode');
    setQuizAnswers({});
    setCurrentQuestionIndex(0);
    setShowAnswerKey(false);
  };

  // Função para selecionar tipo de exame UERJ
  const selectUerjExamType = (type: UerjExamType) => {
  // Sempre limpa antes
  setSelectedUerjExamType(null);
  setSelectedUerjSpecificYear(null);
  setSelectedUerjSpecificSubject(null);

  if (type === 'primeiro-exame') {
    setSelectedDay(1);              // 🔵 day manda
    setCurrentScreen('quiz-mode');
  }

  if (type === 'segundo-exame') {
    setSelectedDay(2);              // 🔵 day manda
    setCurrentScreen('quiz-mode');
  }

  if (type === 'provas-especificas') {
    setSelectedDay(3);              // 🔴 único caso permitido
    setSelectedUerjExamType('provas-especificas');
    setCurrentScreen('uerj-specific-year');
  }

  setQuizAnswers({});
  setCurrentQuestionIndex(0);
  setShowAnswerKey(false);
};


  // Função para selecionar ano específico da UERJ
  const selectUerjSpecificYear = (year: number) => {
    setSelectedUerjSpecificYear(year);
    setCurrentScreen('uerj-specific-subject');
  };

  // Função para selecionar matéria específica da UERJ
  const selectUerjSpecificSubject = (subjectId: string) => {
    setSelectedUerjSpecificSubject(subjectId);
    setCurrentScreen('quiz-mode');
    setQuizAnswers({});
    setCurrentQuestionIndex(0);
    setShowAnswerKey(false);
  };
  // Função para selecionar dia (ENEM)
  const selectPucDay = (day: number) => {
  setSelectedDay(day); // 1 ou 2
  setCurrentScreen('quiz-mode');
  setQuizAnswers({});
  setCurrentQuestionIndex(0);
  setShowAnswerKey(false);
};



  // Obter dados do vestibular selecionado
  const selectedExamData = selectedExam ? EXAMS.find(e => e.id === selectedExam) : null;
  const selectedSubjectData = selectedExam && selectedSubject ? 
    SUBJECTS_BY_EXAM[selectedExam].find(s => s.id === selectedSubject) : null;

  // Obter tópicos da matéria selecionada
  const getTopicsForSubject = () => {
    if (!selectedSubject || !selectedExam) return [];
    const subjectTopics = TOPICS_BY_SUBJECT[selectedSubject];
    if (!subjectTopics) return [];
    return subjectTopics[selectedExam] || [];
  };

  // Filtrar questões por matéria e tópico selecionados
  const getFilteredQuestions = () => {
    if (!selectedSubject || !selectedTopic) return [];
    
    return ALL_QUESTIONS.filter(q => 
      q.subject === selectedSubject && q.topic === selectedTopic
    );
  };

  // Tela inicial
  if (currentScreen === 'home') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            {/* Botão de Dark Mode */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>

            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SuperApp Vestibulares
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Escolha seu vestibular para começar a estudar
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {EXAMS.map((exam) => (
                <button
                  key={exam.id}
                  onClick={() => selectExam(exam.id)}
                  className={`relative overflow-hidden rounded-2xl p-8 h-32 bg-gradient-to-br ${exam.color} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group w-full`}
                >
                  <div className="flex items-center justify-between h-full">
                    <div className="flex-1 text-left">
                      <h3 className="text-2xl font-bold mb-2">{exam.name}</h3>
                      <div className="flex items-center text-white/80">
                        <span className="text-sm">Clique para estudar</span>
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                    <div className="text-4xl ml-4 group-hover:scale-110 transition-transform duration-300">
                      {exam.icon}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de seleção de modo
  if (currentScreen === 'mode' && selectedExamData) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{selectedExamData.icon}</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedExamData.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Como você quer estudar hoje?
              </p>
            </div>

            <div className="max-w-2xl mx-auto grid gap-6">
              <button
                onClick={() => setCurrentScreen('subjects')}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Estudar por Matéria
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Escolha uma matéria específica para focar
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                </div>
              </button>

              <button
                onClick={() => setCurrentScreen('years')}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Fazer Prova por Ano
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Pratique com provas de anos anteriores
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de seleção de matérias
  if (currentScreen === 'subjects' && selectedExam) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Escolha a Matéria
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Selecione uma matéria para estudar
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUBJECTS_BY_EXAM[selectedExam].map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => selectSubject(subject.id)}
                  className={`${subject.color} text-white rounded-2xl p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group`}
                >
                  <div className="text-4xl mb-3">{subject.icon}</div>
                  <h3 className="text-lg font-bold">{subject.name}</h3>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de seleção de tópicos
  if (currentScreen === 'topics' && selectedSubjectData) {
    const topics = getTopicsForSubject();
    
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <div className="text-5xl mb-4">{selectedSubjectData.icon}</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedSubjectData.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Escolha um assunto para estudar
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => selectTopic(topic)}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group text-left"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {topic}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de questões (Estudo por Matéria)
  if (currentScreen === 'questions' && selectedTopic) {
    const questions = getFilteredQuestions();
    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
      return (
        <div className={darkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Nenhuma questão disponível para este tópico
              </h2>
              <button
                onClick={goBack}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Questão {currentQuestionIndex + 1} de {questions.length}
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <StudyQuestionCard 
                question={currentQuestion}
                selectedAnswer={studyAnswers[currentQuestion.id] || null}
                showResult={studyShowResults[currentQuestion.id] || false}
                onSelectAnswer={(answer) => {
                  setStudyAnswers(prev => ({
                    ...prev,
                    [currentQuestion.id]: answer
                  }));
                }}
                onVerify={() => {
                  if (studyAnswers[currentQuestion.id]) {
                    setStudyShowResults(prev => ({
                      ...prev,
                      [currentQuestion.id]: true
                    }));
                  }
                }}
              />

              {/* Navegação entre questões */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  ← Questão Anterior
                </button>
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    currentQuestionIndex === questions.length - 1
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Próxima Questão →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de seleção de anos
  if (currentScreen === 'years' && selectedExamData) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{selectedExamData.icon}</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Escolha o Ano
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Selecione o ano da prova que deseja fazer
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {YEARS.map((year) => (
                <button
                  key={year}
                  onClick={() => selectYear(year)}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {year}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de seleção de fase (FUVEST)
  if (currentScreen === 'year-phase-selection' && selectedYear) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                FUVEST {selectedYear}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Escolha a fase da prova
              </p>
            </div>

            <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
              <button
                onClick={() => selectPhase(1)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">📘</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  1ª Fase
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Prova objetiva com todas as disciplinas (1 dia)
                </p>
              </button>

              <button
                onClick={() => selectPhase(2)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">📗</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  2ª Fase
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Provas dissertativas ({getFuvestSecondPhaseDays(selectedYear)} dias)
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de seleção de dia da 2ª fase (FUVEST)
  if (currentScreen === 'fuvest-phase-day-selection' && selectedYear && selectedPhase === 2) {
    const totalDays = getFuvestSecondPhaseDays(selectedYear);
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                FUVEST {selectedYear} - 2ª Fase
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Escolha o dia da prova
              </p>
            </div>

            <div className={`max-w-4xl mx-auto grid ${totalDays === 2 ? 'md:grid-cols-2' : totalDays === 3 ? 'md:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-5'} gap-6`}>
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => selectFuvestSecondPhaseDay(day)}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-4xl mb-4">
                    {day === 1 ? '📝' : day === 2 ? '🔬' : day === 3 ? '📊' : day === 4 ? '⚛️' : '🧪'}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Dia {day}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {day === 1 ? 'Português e Redação' : 
                     day === 2 ? 'Disciplinas específicas (parte 1)' : 
                     day === 3 ? 'Disciplinas específicas (parte 2)' :
                     day === 4 ? 'Provas específicas (parte 3)' :
                     'Provas específicas (parte 4)'}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de seleção de tipo de exame UERJ
  if (currentScreen === 'uerj-exam-type' && selectedYear) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                UERJ {selectedYear}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Escolha o tipo de prova
              </p>
            </div>

            <div className="max-w-2xl mx-auto grid gap-6">
              <button
                onClick={() => selectUerjExamType('primeiro-exame')}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">📘</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Primeiro Exame
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Prova completa do primeiro exame de qualificação
                </p>
              </button>

              <button
                onClick={() => selectUerjExamType('segundo-exame')}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">📗</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Segundo Exame
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Prova completa do segundo exame de qualificação
                </p>
              </button>

              <button
                onClick={() => selectUerjExamType('provas-especificas')}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Provas Específicas
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Questões específicas por matéria e ano
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de seleção de ano específico da UERJ (Provas Específicas)
  if (currentScreen === 'uerj-specific-year') {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Provas Específicas - Escolha o Ano
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Selecione o ano das questões específicas
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {UERJ_SPECIFIC_YEARS.map((year) => (
                <button
                  key={year}
                  onClick={() => selectUerjSpecificYear(year)}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {year}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de seleção de matéria específica da UERJ (Provas Específicas)
  if (currentScreen === 'uerj-specific-subject' && selectedUerjSpecificYear) {
    const uerjSubjects = SUBJECTS_BY_EXAM.uerj;

    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                UERJ {selectedUerjSpecificYear} - Escolha a Matéria
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Selecione a matéria para estudar
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uerjSubjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => selectUerjSpecificSubject(subject.id)}
                  className={`${subject.color} text-white rounded-2xl p-6 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group`}
                >
                  <div className="text-4xl mb-3">{subject.icon}</div>
                  <h3 className="text-lg font-bold">{subject.name}</h3>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (currentScreen === 'puc-day-selection') {
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

        {/* Botão Dark Mode */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        <div className="container mx-auto px-4 py-8">

          {/* Voltar */}
          <div className="flex items-center mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>

          {/* Título */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PUC {selectedYear}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Escolha o dia da prova
            </p>
          </div>

          {/* Cards */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

            {/* DIA 1 */}
            <div
              onClick={() => selectPucDay(1)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer text-center"
            >
              <div className="text-5xl mb-4">📘</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Dia 1
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Provas de Linguagens e Humanas
              </p>
            </div>

            {/* DIA 2 */}
            <div
              onClick={() => selectPucDay(2)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer text-center"
            >
              <div className="text-5xl mb-4">🧮</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Dia 2
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Provas de Matemática e Natureza
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}



  // Tela de seleção de dia (ENEM)
  if (currentScreen === 'year-day-selection' && selectedYear) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                ENEM {selectedYear}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Escolha o dia da prova
              </p>
            </div>

            <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
              <button
                onClick={() => selectDay(1)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">📘</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Dia 1
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Linguagens, Ciências Humanas e Redação
                </p>
              </button>

              <button
                onClick={() => selectDay(2)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Dia 2
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ciências da Natureza e Matemática
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de modo quiz (Prova por Ano)
  if (currentScreen === 'quiz-mode' && selectedExam && selectedYear) {
    let quizQuestions: QuizQuestion[] = [];

    // Determinar quais questões carregar baseado no tipo de exame
 // 1️⃣ UERJ – PROVA ESPECÍFICA (SOMENTE day === 3)

if (currentScreen === 'quiz-mode' && selectedExam && selectedYear) {

  // 🔒 BLINDAGEM ABSOLUTA DA UERJ (COLE ISSO AQUI)
  // 1️⃣ UERJ – PROVAS ESPECÍFICAS
if (
  selectedExam === 'uerj' &&
  selectedPhase === 3 &&
  selectedUerjExamType === 'provas-especificas' &&
  selectedUerjSpecificYear &&
  selectedUerjSpecificSubject
) {
  quizQuestions = getUerjSpecificQuestions(
    selectedUerjSpecificYear,
    selectedUerjSpecificSubject
  );
}

// 2️⃣ UERJ – PRIMEIRO OU SEGUNDO EXAME
else if (
  selectedExam === 'uerj' &&
  (selectedPhase === 1 || selectedPhase === 2)
) {
  quizQuestions = ALL_QUESTIONS.filter(q =>
    q.exam === 'uerj' &&
    q.year === selectedYear &&
    q.phase === selectedPhase
  );
}

  // 3️⃣ FUVEST
  else if (selectedExam === 'fuvest' && selectedPhase && selectedDay) {
    quizQuestions = getQuestionsByYearPhaseAndDay(
      selectedExam,
      selectedYear,
      selectedPhase,
      selectedDay
    );
  }

  // 4️⃣ ENEM / PUC / OUTROS
  else if (selectedDay) {
    quizQuestions = getQuestionsByYearPhaseAndDay(
      selectedExam,
      selectedYear,
      1,
      selectedDay
    );
  }

  // 🚫 SEM QUESTÕES
  if (quizQuestions.length === 0) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Nenhuma questão disponível
            </h2>
            <button
              onClick={goBack}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🔽 resto do seu código continua igual
}

// 3️⃣ FUVEST (mantém como já estava)
else if (selectedExam === 'fuvest' && selectedPhase && selectedDay) {
  quizQuestions = getQuestionsByYearPhaseAndDay(
    selectedExam,
    selectedYear,
    selectedPhase,
    selectedDay
  );
}

// 4️⃣ ENEM / PUC / OUTROS
else if (selectedDay) {
  quizQuestions = getQuestionsByYearPhaseAndDay(
    selectedExam,
    selectedYear,
    1,
    selectedDay
  );
}

    
    if (quizQuestions.length === 0) {
      return (
        <div className={darkMode ? 'dark' : ''}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Nenhuma questão disponível
              </h2>
              <button
                onClick={goBack}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const totalQuestions = quizQuestions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const handleAnswer = (answer: string) => {
      setQuizAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer
      }));
    };

    const handleNext = () => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setCurrentScreen('quiz-results');
      }
    };

    const handlePrevious = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      }
    };

    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button onClick={goBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Questão {currentQuestionIndex + 1} de {totalQuestions}
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Questão */}
            <div className="max-w-4xl mx-auto">
              <QuizQuestionCard 
                question={currentQuestion}
                onAnswer={handleAnswer}
                selectedAnswer={quizAnswers[currentQuestion.id] || null}
                showAnswerKey={showAnswerKey}
              />

              {/* Navegação */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  ← Anterior
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 px-6 py-3 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
                >
                  {currentQuestionIndex === totalQuestions - 1 ? 'Finalizar Prova' : 'Próxima →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de resultados do quiz
  if (currentScreen === 'quiz-results' && selectedExam && selectedYear) {
    let quizQuestions: QuizQuestion[] = [];

    if (selectedExam === 'uerj' && selectedUerjExamType === 'provas-especificas' && selectedUerjSpecificYear && selectedUerjSpecificSubject) {
      quizQuestions = getUerjSpecificQuestions(selectedUerjSpecificYear, selectedUerjSpecificSubject);
    } else if (selectedExam === 'fuvest' && selectedPhase && selectedDay) {
      quizQuestions = getQuestionsByYearPhaseAndDay(selectedExam, selectedYear, selectedPhase, selectedDay);
    } else if (selectedDay) {
      quizQuestions = getQuestionsByYearPhaseAndDay(selectedExam, selectedYear, 1, selectedDay);
    }

    const totalQuestions = quizQuestions.length;
    const answeredQuestions = Object.keys(quizAnswers).length;
    const correctAnswers = quizQuestions.filter(q => 
      quizAnswers[q.id] === q.correct
    ).length;
    const score = (correctAnswers / totalQuestions) * 100;

    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Botão de Dark Mode fixo */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg text-center">
                <div className="text-6xl mb-6">🎉</div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Prova Finalizada!
                </h1>
                
                <div className="mb-8">
                  <div className="text-5xl font-bold text-blue-500 mb-2">
                    {score.toFixed(1)}%
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Você acertou {correctAnswers} de {totalQuestions} questões
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {correctAnswers}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Acertos</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {answeredQuestions - correctAnswers}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Erros</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                      {totalQuestions - answeredQuestions}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Em branco</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setCurrentScreen('quiz-mode');
                      setCurrentQuestionIndex(0);
                      setShowAnswerKey(true);
                    }}
                    className="flex-1 px-6 py-3 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
                  >
                    Ver Gabarito
                  </button>
                  <button
                    onClick={() => {
                      setCurrentScreen('home');
                      setSelectedExam(null);
                      setQuizAnswers({});
                      setCurrentQuestionIndex(0);
                      setShowAnswerKey(false);
                    }}
                    className="flex-1 px-6 py-3 rounded-xl font-medium bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200"
                  >
                    Voltar ao Início
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
