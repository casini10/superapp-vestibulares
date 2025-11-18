'use client';

import { useState } from 'react';
import { GraduationCap, ArrowLeft, BookOpen, Calendar, ChevronRight, Camera, Shuffle, Check, X } from 'lucide-react';

// SuperApp Vestibulares - Sistema completo de estudos
// Tipos
type Screen = 'home' | 'mode' | 'subjects' | 'years' | 'topics' | 'questions' | 'year-questions' | 'photos' | 'random-questions';
type ExamId = 'enem' | 'uerj' | 'fuvest' | 'puc';
type TopicTab = 'assuntos' | 'fotos' | 'aleatorio';

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
    { id: 'mat', name: 'Matemática', icon: '📊', color: 'bg-blue-500' },
    { id: 'fis', name: 'Física', icon: '⚡', color: 'bg-yellow-500' },
    { id: 'qui', name: 'Química', icon: '🧪', color: 'bg-green-500' },
    { id: 'bio', name: 'Biologia', icon: '🧬', color: 'bg-emerald-500' },
    { id: 'por', name: 'Português / Literatura', icon: '📝', color: 'bg-red-500' },
    { id: 'ing', name: 'Inglês', icon: '🇺🇸', color: 'bg-indigo-500' },
    { id: 'his', name: 'História', icon: '📚', color: 'bg-amber-500' },
    { id: 'geo', name: 'Geografia', icon: '🌍', color: 'bg-cyan-500' },
    { id: 'soc', name: 'Sociologia', icon: '👥', color: 'bg-pink-500' },
    { id: 'fil', name: 'Filosofia', icon: '🤔', color: 'bg-purple-500' }
  ],
  fuvest: [
    { id: 'mat', name: 'Matemática', icon: '📊', color: 'bg-blue-500' },
    { id: 'fis', name: 'Física', icon: '⚡', color: 'bg-yellow-500' },
    { id: 'qui', name: 'Química', icon: '🧪', color: 'bg-green-500' },
    { id: 'bio', name: 'Biologia', icon: '🧬', color: 'bg-emerald-500' },
    { id: 'por', name: 'Português / Literatura', icon: '📝', color: 'bg-red-500' },
    { id: 'ing', name: 'Inglês', icon: '🇺🇸', color: 'bg-indigo-500' },
    { id: 'his', name: 'História', icon: '📚', color: 'bg-amber-500' },
    { id: 'geo', name: 'Geografia', icon: '🌍', color: 'bg-cyan-500' }
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

// Assuntos por matéria (dados reais dos vestibulares) - ATUALIZADOS COM NOVOS TÓPICOS
const TOPICS_BY_SUBJECT = {
  mat: [
    'Aritmética e porcentagem',
    'Estatística (média, gráficos e tabelas)',
    'Geometria plana e espacial',
    'Funções',
    'Probabilidade',
    'PA/PG',
    'Trigonometria',
    'Matemática financeira (juros simples/compostos, desconto)',
    'Análise combinatória (arranjos, combinações, permutações)',
    'Proporcionalidade & escalas (regra de três, unidades, mapas)',
    'Geometria analítica básica (distância, área no plano cartesiano)'
  ],
  fis: [
    'Eletrodinâmica',
    'Cinemática',
    'Dinâmica',
    'Termologia',
    'Óptica',
    'Hidrostática',
    'Ondulatória',
    'Trabalho, energia e potência',
    'Impulso e quantidade de movimento (colisões)',
    'Termodinâmica (1ª lei, máquinas térmicas, rendimento)',
    'Eletromagnetismo/Indução (Faraday–Lenz)',
    'Gravitação',
    'Hidrodinâmica (Bernoulli, vazão)',
    'Física moderna (radioatividade, efeito fotoelétrico)'
  ],
  qui: [
    'Físico-química',
    'Soluções',
    'Estequiometria',
    'Eletroquímica',
    'Química Orgânica',
    'Atomística',
    'Termoquímica',
    'Cinética química (fatores da velocidade)',
    'Equilíbrio químico (Le Chatelier)',
    'Ácidos, bases e pH (neutralização, indicadores)',
    'Gases e Propriedades coligativas',
    'Separação de misturas (cotidiano)',
    'Estrutura da matéria: ligações, geometria e polaridade; tabela periódica (tendências)',
    'Química ambiental (água, poluição, chuva ácida, efeito estufa)',
    'Polímeros e materiais; Radioatividade (aplicações)'
  ],
  bio: [
    'Ecologia',
    'Citologia',
    'Genética',
    'Fisiologia',
    'Evolução',
    'Botânica',
    'Zoologia',
    'Biomas do Brasil',
    'Saúde pública & parasitologia (doenças, vetores, prevenção)',
    'Biotecnologia (vacinas, transgênicos, técnicas básicas)',
    'Histologia básica (tecidos – leitura de figura)'
  ],
  por: [
    'Interpretação de texto',
    'Gêneros textuais',
    'Gramática',
    'Literatura',
    'Redação',
    'Figuras de linguagem',
    'Análise sintática',
    'Variação linguística (registro, regionalismo, norma x uso)',
    'Funções da linguagem e coerência/cohesão',
    'Intertextualidade e semiótica (imagem, charge, HQ, infográfico)',
    'Linguagem publicitária e multiletramentos'
  ],
  ing: [
    'Interpretação de texto',
    'Vocabulário',
    'Gramática básica',
    'Tempos verbais',
    'Conectivos',
    'Expressões idiomáticas',
    'Leitura e interpretação (gêneros: notícia, anúncio, tirinha, infográfico)',
    'Estratégias de leitura (skimming, scanning, cognatos/falsos cognatos)',
    'Funções comunicativas (opinião, sugestão, pedido, concordância/discordância)',
    'Coesão referencial (pronomes, referência/ellipsis)',
    'Modal verbs, voz passiva, condicionais'
  ],
  esp: [
    'Interpretação de texto',
    'Vocabulário',
    'Gramática básica',
    'Tempos verbais',
    'Conectivos',
    'Expressões idiomáticas'
  ],
  his: [
    'Brasil República',
    'Brasil Colônia',
    'Brasil Império',
    'História Geral',
    'Idade Média',
    'Idade Moderna',
    'Idade Contemporânea',
    'História da América (América Latina e EUA nas questões de contexto)',
    'República Velha',
    'Era Vargas',
    'Populismo',
    'Ditadura Civil-Militar',
    'Redemocratização/Nova República',
    'Cidadania e direitos',
    'Patrimônio, memória e cultura (interpretação de fonte histórica)'
  ],
  geo: [
    'Geopolítica',
    'Meio ambiente',
    'Cartografia',
    'Demografia',
    'Climatologia',
    'Geografia do Brasil',
    'Urbanização',
    'Globalização, redes e fluxos (comércio, finanças, migração)',
    'Economia do Brasil (agro, indústria, energia, transportes, logística)',
    'Geotecnologias (GPS, SIG, imagens de satélite)',
    'Questão agrária (estrutura fundiária, modernização)',
    'Recursos hídricos/biomas'
  ],
  fil: [
    'Filosofia Antiga',
    'Filosofia Medieval',
    'Filosofia Moderna',
    'Filosofia Contemporânea',
    'Ética',
    'Política',
    'Estética',
    'Teoria do conhecimento / Epistemologia',
    'Lógica e argumentação (falácias, estrutura do argumento)',
    'Filosofia da ciência (conceitos básicos)'
  ],
  soc: [
    'Sociologia Clássica',
    'Sociologia Contemporânea',
    'Movimentos Sociais',
    'Cultura',
    'Estratificação Social',
    'Globalização',
    'Cidadania',
    'Trabalho e economia (precarização, fordismo/toyotismo)',
    'Instituições sociais (família, escola, Estado, mídia)',
    'Gênero, raça e etnia (desigualdades e políticas públicas)',
    'Urbanização, violência e cidade'
  ]
};

// Questões de Brasil República
const BRASIL_REPUBLICA_QUESTIONS = [
  {
    id: 1,
    title: "ENEM 2016 — Coronelismo e barganhas políticas",
    text: "No início da República, consolidou-se um arranjo político em que chefes locais controlavam votos e cargos públicos, enquanto o governo garantia benefícios e reconhecia sua influência. Esse mecanismo, conhecido como coronelismo, revelava",
    alternatives: [
      "A) fortalecimento dos partidos de massa.",
      "B) autonomia municipal sem interferência estadual.",
      "C) troca de favores entre o poder central e lideranças locais para garantir apoio eleitoral.",
      "D) supremacia do Judiciário sobre os demais poderes.",
      "E) participação popular direta nas decisões nacionais."
    ],
    correct: "C",
    explanation: "A descrição corresponde ao coronelismo analisado por Victor Nunes Leal: um sistema nacional de barganhas entre governo e \"coronéis\", com controle do voto e distribuição de cargos e recursos. Não há participação popular ampliada; há clientelismo e coerção eleitoral."
  },
  {
    id: 2,
    title: "ENEM 2014 — \"Política dos Governadores\"",
    text: "Declaração de Campos Sales defendia que \"dos estados se governa a República\", indicando um pacto que assegurava maiorias no Congresso por meio do alinhamento entre presidentes de estado (governadores) e o Executivo federal. Tal prática ficou conhecida como",
    alternatives: [
      "A) voto distrital.",
      "B) federalismo autoritário.",
      "C) política dos governadores, com controle de máquinas eleitorais e apoio recíproco.",
      "D) parlamentarismo de coalizão.",
      "E) moralização administrativa."
    ],
    correct: "C",
    explanation: "O texto remete ao arranjo da Primeira República: o governo federal sustentava-se com apoio dos estados dominantes, que, por sua vez, controlavam eleições e bancadas, garantindo estabilidade ao regime. A chave é o alinhamento vertical e o uso das máquinas eleitorais."
  },
  {
    id: 3,
    title: "ENEM 2019 — Revolta da Vacina (1904) e ação popular",
    text: "Texto de José Murilo de Carvalho caracteriza a Revolta da Vacina como mobilização defensiva e fragmentada, em que os participantes defendiam direitos percebidos como violados pela intervenção estatal. Essa leitura destaca que a reação popular",
    alternatives: [
      "A) buscava implantar um governo revolucionário.",
      "B) exigia a suspensão de todas as políticas sanitárias.",
      "C) contestava a forma autoritária de implementação das medidas de saúde, mais do que o Estado em si.",
      "D) pretendia restaurar a monarquia no Brasil.",
      "E) reivindicava participação direta em conselhos de saúde."
    ],
    correct: "C",
    explanation: "A revolta não negava o Estado; questionava a imposição coercitiva da vacinação e a violência das reformas urbanas, revelando limites da cidadania na Primeira República e tensões entre autoridade sanitária e direitos urbanos."
  },
  {
    id: 4,
    title: "ENEM 2022 — Era Vargas e o DIP",
    text: "Um decreto de 1937 criou o Departamento de Imprensa e Propaganda (DIP), diretamente subordinado à Presidência, com atribuições de \"coordenar\" relações da imprensa com o governo. Essa medida visava, sobretudo,",
    alternatives: [
      "A) assegurar pluralidade informativa por meio de conselhos autônomos.",
      "B) impedir qualquer manifestação cultural de cunho nacionalista.",
      "C) organizar a propaganda oficial e controlar a circulação de informações, fortalecendo o Estado Novo.",
      "D) transferir a censura ao Poder Judiciário.",
      "E) descentralizar a comunicação em favor dos estados."
    ],
    correct: "C",
    explanation: "O DIP articulou propaganda estatal e censura para construir legitimidade do regime e vigiar opositores, típica prática autoritária do Estado Novo (1937–1945)."
  },
  {
    id: 5,
    title: "ENEM 2020 (Digital) — Tenentismo e crise da República Velha",
    text: "Texto sobre o tenentismo afirma que jovens oficiais ocuparam o vazio deixado por lideranças civis, tornando-se foco de oposição às \"caducas\" instituições da República Velha (ex.: 18 do Forte; Coluna Prestes). O movimento expressava",
    alternatives: [
      "A) defesa do voto universal e do socialismo no Exército.",
      "B) projeto regionalista de restauração monárquica.",
      "C) crítica à fraude eleitoral e ao mando oligárquico, propondo reformas centralizadoras e moralização da política.",
      "D) recuo do Estado e autonomia municipal ampla.",
      "E) adesão à política do \"café com leite\"."
    ],
    correct: "C",
    explanation: "As rebeliões tenentistas atacaram fraudes eleitorais, o coronelismo e a fragmentação federativa; defendiam centralização e \"saneamento\" da vida pública, ecoando a crise do pacto oligárquico que ruiu em 1930."
  }
];

// Questões de Geografia - QUESTÃO ATUALIZADA
const GEOGRAFIA_QUESTIONS = [
  {
    id: 1,
    title: "ENEM 2023 — Estrutura Fundiária Brasileira",
    text: "O gráfico representa a relação entre o tamanho e a totalidade dos imóveis rurais no Brasil. Que característica da estrutura fundiária brasileira está evidenciada no gráfico apresentado?",
    image: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/367ddac2-2a08-4c30-b6b1-61b7813dc077.jpg",
    alternatives: [
      "A) A concentração de terras nas mãos de poucos.",
      "B) A existência de poucas terras agricultáveis.",
      "C) O domínio territorial dos minifúndios.",
      "D) A primazia da agricultura familiar.",
      "E) A debilidade dos plantations modernos."
    ],
    correct: "A",
    explanation: "O gráfico evidencia a concentração fundiária no Brasil, característica histórica da estrutura agrária brasileira. Poucos proprietários detêm grandes extensões de terra, enquanto muitos pequenos proprietários possuem áreas reduzidas, demonstrando a desigualdade na distribuição de terras no país."
  }
];

// Questões do ENEM 2024
const QUESTIONS_2024 = [
  {
    id: 1,
    number: "QUESTÃO 01",
    subject: "Português",
    text: "A linguagem é um fenômeno social que se manifesta através de diferentes variedades linguísticas. Essas variedades refletem aspectos culturais, regionais e sociais dos falantes.",
    alternatives: [
      "A) A linguagem padrão é a única forma correta de comunicação.",
      "B) As variedades linguísticas são desvios da norma culta.",
      "C) A diversidade linguística enriquece a cultura de um povo.",
      "D) Apenas a linguagem formal deve ser ensinada nas escolas.",
      "E) As gírias não fazem parte do sistema linguístico."
    ],
    correct: "C"
  },
  {
    id: 2,
    number: "QUESTÃO 02",
    subject: "Matemática",
    text: "Em uma pesquisa sobre preferências musicais, foram entrevistadas 200 pessoas. Os resultados mostraram que 120 pessoas gostam de rock, 80 gostam de pop e 40 gostam de ambos os estilos. Quantas pessoas não gostam de nenhum dos dois estilos?",
    alternatives: [
      "A) 20 pessoas",
      "B) 40 pessoas", 
      "C) 60 pessoas",
      "D) 80 pessoas",
      "E) 100 pessoas"
    ],
    correct: "B"
  },
  {
    id: 3,
    number: "QUESTÃO 03",
    subject: "História",
    text: "O período conhecido como Era Vargas (1930-1945) foi marcado por transformações significativas na sociedade brasileira, incluindo a consolidação de direitos trabalhistas e a modernização do Estado.",
    alternatives: [
      "A) Vargas implementou apenas políticas liberais.",
      "B) O Estado Novo foi um período de plena democracia.",
      "C) A CLT foi criada durante o governo Vargas.",
      "D) Não houve censura durante a Era Vargas.",
      "E) O Brasil não participou da Segunda Guerra Mundial."
    ],
    correct: "C"
  },
  {
    id: 4,
    number: "QUESTÃO 04",
    subject: "Biologia",
    text: "A fotossíntese é um processo fundamental para a vida na Terra, no qual as plantas convertem energia luminosa em energia química. Este processo ocorre principalmente nos cloroplastos das células vegetais.",
    alternatives: [
      "A) A fotossíntese ocorre apenas durante a noite.",
      "B) O oxigênio é um reagente da fotossíntese.",
      "C) A clorofila é essencial para capturar a luz solar.",
      "D) A fotossíntese não produz glicose.",
      "E) Apenas as raízes realizam fotossíntese."
    ],
    correct: "C"
  },
  {
    id: 5,
    number: "QUESTÃO 05",
    subject: "Geografia",
    text: "O aquecimento global é um fenômeno climático caracterizado pelo aumento da temperatura média da Terra, causado principalmente pela intensificação do efeito estufa devido às atividades humanas.",
    alternatives: [
      "A) O efeito estufa é exclusivamente prejudicial.",
      "B) As atividades humanas não influenciam o clima.",
      "C) O CO₂ é o único gás do efeito estufa.",
      "D) O desmatamento contribui para o aquecimento global.",
      "E) O aquecimento global afeta apenas os polos."
    ],
    correct: "D"
  },
  {
    id: 6,
    number: "QUESTÃO 06",
    subject: "Física",
    text: "Um objeto é lançado verticalmente para cima com velocidade inicial de 20 m/s. Considerando g = 10 m/s² e desprezando a resistência do ar, qual será a altura máxima atingida pelo objeto?",
    alternatives: [
      "A) 10 metros",
      "B) 15 metros",
      "C) 20 metros",
      "D) 25 metros",
      "E) 30 metros"
    ],
    correct: "C"
  },
  {
    id: 7,
    number: "QUESTÃO 07",
    subject: "Química",
    text: "A água é uma substância essencial para a vida, apresentando propriedades únicas como alto ponto de ebulição, capacidade de formar pontes de hidrogênio e ser um excelente solvente polar.",
    alternatives: [
      "A) A água é uma molécula apolar.",
      "B) As pontes de hidrogênio não existem na água.",
      "C) A água dissolve melhor substâncias polares.",
      "D) O ponto de ebulição da água é baixo.",
      "E) A água não pode formar ligações intermoleculares."
    ],
    correct: "C"
  },
  {
    id: 8,
    number: "QUESTÃO 08",
    subject: "Filosofia",
    text: "Sócrates, considerado um dos fundadores da filosofia ocidental, desenvolveu o método maiêutico, que consiste em fazer perguntas para levar o interlocutor ao conhecimento através da reflexão.",
    alternatives: [
      "A) Sócrates escreveu muitas obras filosóficas.",
      "B) O método socrático baseia-se em dar respostas prontas.",
      "C) 'Só sei que nada sei' é uma frase atribuída a Sócrates.",
      "D) Sócrates não acreditava no autoconhecimento.",
      "E) A maiêutica é um método de ensino autoritário."
    ],
    correct: "C"
  },
  {
    id: 9,
    number: "QUESTÃO 09",
    subject: "Sociologia",
    text: "A globalização é um processo de integração mundial que afeta aspectos econômicos, culturais, políticos e sociais, promovendo maior interconexão entre os países e povos.",
    alternatives: [
      "A) A globalização afeta apenas a economia.",
      "B) A tecnologia não influencia a globalização.",
      "C) A globalização promove homogeneização cultural.",
      "D) Apenas países desenvolvidos participam da globalização.",
      "E) A globalização não tem aspectos negativos."
    ],
    correct: "C"
  },
  {
    id: 10,
    number: "QUESTÃO 10",
    subject: "Inglês",
    text: "Technology has revolutionized the way we communicate, work, and learn. Social media platforms have connected people across the globe, creating new opportunities for collaboration and cultural exchange.",
    question: "According to the text, technology has:",
    alternatives: [
      "A) Limited global communication",
      "B) Reduced cultural exchange",
      "C) Created new collaboration opportunities",
      "D) Decreased learning possibilities",
      "E) Isolated people from each other"
    ],
    correct: "C"
  }
];

// Anos disponíveis
const YEARS = Array.from({ length: 16 }, (_, i) => 2024 - i);

// Componente de Questão Interativa
function QuestionCard({ question, onNext }: { question: any; onNext: () => void }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleVerify = () => {
    if (selectedAnswer) {
      setShowResult(true);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setShowExplanation(false);
    onNext();
  };

  const getOptionLetter = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
      {/* Cabeçalho da questão */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {question.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Imagem do gráfico se existir */}
      {question.image && (
        <div className="mb-6">
          <img 
            src={question.image} 
            alt="Gráfico de dados para análise" 
            className="w-full h-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
          />
        </div>
      )}

      {/* Pergunta adicional se existir */}
      {question.question && (
        <div className="mb-6">
          <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
            {question.question}
          </p>
        </div>
      )}

      {/* Alternativas */}
      <div className="space-y-3 mb-6">
        {question.alternatives.map((alternative: string, index: number) => {
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
              onClick={() => !showResult && setSelectedAnswer(letter)}
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

      {/* Gabarito */}
      {showResult && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">
            ✅ Gabarito: Letra {question.correct}
          </h4>
          <p className="text-green-700 dark:text-green-300 text-sm">
            A resposta correta é a alternativa {question.correct}.
          </p>
        </div>
      )}

      {/* Explicação */}
      {showExplanation && question.explanation && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Resolução:</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex justify-between">
        <div></div>
        {!showResult ? (
          <button
            onClick={handleVerify}
            disabled={!selectedAnswer}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selectedAnswer
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all duration-200"
          >
            Próxima Questão
          </button>
        )}
      </div>
    </div>
  );
}

export default function SuperAppVestibulares() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedExam, setSelectedExam] = useState<ExamId | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [activeTopicTab, setActiveTopicTab] = useState<TopicTab>('assuntos');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [randomQuestions, setRandomQuestions] = useState<any[]>([]);

  // Função para voltar
  const goBack = () => {
    if (currentScreen === 'mode') {
      setCurrentScreen('home');
      setSelectedExam(null);
    } else if (currentScreen === 'subjects' || currentScreen === 'years') {
      setCurrentScreen('mode');
    } else if (currentScreen === 'topics' || currentScreen === 'photos' || currentScreen === 'random-questions') {
      setCurrentScreen('subjects');
      setSelectedSubject(null);
      setActiveTopicTab('assuntos');
    } else if (currentScreen === 'questions') {
      setCurrentScreen('topics');
      setSelectedTopic(null);
      setCurrentQuestionIndex(0);
    } else if (currentScreen === 'year-questions') {
      setCurrentScreen('years');
      setSelectedYear(null);
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
  };

  // Função para selecionar ano
  const selectYear = (year: number) => {
    setSelectedYear(year);
    setCurrentScreen('year-questions');
  };

  // Função para navegar para fotos
  const goToPhotos = () => {
    setCurrentScreen('photos');
    setActiveTopicTab('fotos');
  };

  // Função para navegar para questões aleatórias
  const goToRandomQuestions = () => {
    if (selectedSubject === 'geo') {
      // Para Geografia, usar as questões específicas
      const shuffled = [...GEOGRAFIA_QUESTIONS].sort(() => Math.random() - 0.5);
      setRandomQuestions(shuffled);
    } else if (selectedSubject === 'his') {
      // Para História, usar as questões de Brasil República
      const shuffled = [...BRASIL_REPUBLICA_QUESTIONS].sort(() => Math.random() - 0.5);
      setRandomQuestions(shuffled);
    } else {
      setRandomQuestions([]);
    }
    setCurrentQuestionIndex(0);
    setCurrentScreen('random-questions');
    setActiveTopicTab('aleatorio');
  };

  // Função para próxima questão
  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  // Obter dados do vestibular selecionado
  const selectedExamData = selectedExam ? EXAMS.find(e => e.id === selectedExam) : null;
  const selectedSubjectData = selectedExam && selectedSubject ? 
    SUBJECTS_BY_EXAM[selectedExam].find(s => s.id === selectedSubject) : null;

  // Tela inicial - 4 botões dos vestibulares
  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
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

          {/* Botões dos vestibulares */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {EXAMS.map((exam) => (
              <button
                key={exam.id}
                onClick={() => selectExam(exam.id)}
                className={`
                  relative overflow-hidden rounded-2xl p-8 h-32 
                  bg-gradient-to-br ${exam.color}
                  text-white shadow-lg hover:shadow-xl
                  transform hover:scale-105 transition-all duration-300
                  cursor-pointer group w-full
                `}
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
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tela de escolha do modo
  if (currentScreen === 'mode' && selectedExamData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
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

          {/* Dois botões de modo */}
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
    );
  }

  // Tela de matérias
  if (currentScreen === 'subjects' && selectedExamData && selectedExam) {
    const subjects = SUBJECTS_BY_EXAM[selectedExam];
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <div className="text-4xl mb-4">{selectedExamData.icon}</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedExamData.name} - Matérias
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Escolha uma matéria para estudar
            </p>
          </div>

          {/* Grid de matérias */}
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => selectSubject(subject.id)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 ${subject.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{subject.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {subject.name}
                  </h3>
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                    <span className="text-sm">Estudar agora</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tela de assuntos que mais caem com abas
  if (currentScreen === 'topics' && selectedExamData && selectedSubjectData && selectedSubject) {
    const topics = TOPICS_BY_SUBJECT[selectedSubject as keyof typeof TOPICS_BY_SUBJECT] || [];
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <div className={`w-20 h-20 ${selectedSubjectData.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl">{selectedSubjectData.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedSubjectData.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {selectedExamData.name}
            </p>
          </div>

          {/* Abas de navegação - apenas Assuntos e Fotos */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex bg-white dark:bg-gray-800 rounded-2xl p-2 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTopicTab('assuntos')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTopicTab === 'assuntos'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Assuntos</span>
              </button>
              <button
                onClick={() => {
                  setActiveTopicTab('fotos');
                  goToPhotos();
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTopicTab === 'fotos'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>Fotos</span>
              </button>
            </div>
          </div>

          {/* Conteúdo da aba Assuntos */}
          {activeTopicTab === 'assuntos' && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Assuntos que mais caem no {selectedExamData.name}
                </h2>
              </div>
              <div className="space-y-4">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => selectTopic(topic)}
                    className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {index + 1}
                          </span>
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {topic}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Clique para ver as questões
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                    </div>
                  </button>
                ))}
                
                {/* Botão Aleatório sempre abaixo do último assunto */}
                <button
                  onClick={() => {
                    setActiveTopicTab('aleatorio');
                    goToRandomQuestions();
                  }}
                  className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                        <Shuffle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Questões Aleatórias
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Pratique com questões randômicas
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Tela de Fotos
  if (currentScreen === 'photos' && selectedExamData && selectedSubjectData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <div className={`w-20 h-20 ${selectedSubjectData.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl">{selectedSubjectData.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedSubjectData.name} - Fotos
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {selectedExamData.name}
            </p>
          </div>

          {/* Abas de navegação */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex bg-white dark:bg-gray-800 rounded-2xl p-2 border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setActiveTopicTab('assuntos');
                  setCurrentScreen('topics');
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <BookOpen className="w-4 h-4" />
                <span>Assuntos</span>
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 bg-blue-500 text-white shadow-md"
              >
                <Camera className="w-4 h-4" />
                <span>Fotos</span>
              </button>
            </div>
          </div>

          {/* Conteúdo da seção Fotos */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-6xl mb-6">📸</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Fotos e Imagens
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Aqui você encontrará fotos, gráficos, tabelas e imagens relacionadas a <strong>{selectedSubjectData.name}</strong>.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
                Conteúdo visual em desenvolvimento para o {selectedExamData.name}!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de Questões Aleatórias
  if (currentScreen === 'random-questions' && selectedExamData && selectedSubjectData) {
    if ((selectedSubject === 'his' || selectedSubject === 'geo') && randomQuestions.length > 0) {
      const currentQuestion = randomQuestions[currentQuestionIndex];
      const isLastQuestion = currentQuestionIndex >= randomQuestions.length - 1;

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            {/* Header com botão voltar */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Questão {currentQuestionIndex + 1} de {randomQuestions.length}
              </div>
            </div>

            <div className="text-center mb-8">
              <div className={`w-20 h-20 ${selectedSubjectData.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
                <span className="text-3xl">{selectedSubjectData.icon}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedSubject === 'geo' ? 'Geografia - Questões Aleatórias' : 'Brasil República - Questões Aleatórias'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {selectedExamData.name}
              </p>
            </div>

            {/* Questão atual */}
            <div className="max-w-4xl mx-auto">
              <QuestionCard 
                question={currentQuestion}
                onNext={isLastQuestion ? () => {
                  // Reiniciar ou voltar
                  if (selectedSubject === 'geo') {
                    const shuffled = [...GEOGRAFIA_QUESTIONS].sort(() => Math.random() - 0.5);
                    setRandomQuestions(shuffled);
                  } else {
                    const shuffled = [...BRASIL_REPUBLICA_QUESTIONS].sort(() => Math.random() - 0.5);
                    setRandomQuestions(shuffled);
                  }
                  setCurrentQuestionIndex(0);
                } : nextQuestion}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>

          <div className="text-center mb-8">
            <div className={`w-20 h-20 ${selectedSubjectData.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl">{selectedSubjectData.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedSubjectData.name} - Questões Aleatórias
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {selectedExamData.name}
            </p>
          </div>

          {/* Conteúdo da seção Questões Aleatórias */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-6xl mb-6">🎲</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Questões Aleatórias
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Pratique com questões aleatórias de <strong>{selectedSubjectData.name}</strong> do {selectedExamData.name}.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
                Sistema de questões aleatórias em desenvolvimento para outras matérias!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de questões (Geografia)
  if (currentScreen === 'questions' && selectedSubject === 'geo' && selectedSubjectData && selectedExamData) {
    const currentQuestion = GEOGRAFIA_QUESTIONS[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex >= GEOGRAFIA_QUESTIONS.length - 1;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Questão {currentQuestionIndex + 1} de {GEOGRAFIA_QUESTIONS.length}
            </div>
          </div>

          <div className="text-center mb-12">
            <div className={`w-20 h-20 ${selectedSubjectData.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl">{selectedSubjectData.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedTopic || 'Geografia'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {selectedExamData.name} - {selectedSubjectData.name}
            </p>
          </div>

          {/* Questão atual */}
          <div className="max-w-4xl mx-auto">
            <QuestionCard 
              question={currentQuestion}
              onNext={isLastQuestion ? () => setCurrentQuestionIndex(0) : nextQuestion}
            />
          </div>
        </div>
      </div>
    );
  }

  // Tela de questões (Brasil República)
  if (currentScreen === 'questions' && selectedTopic === 'Brasil República' && selectedSubjectData && selectedExamData) {
    const currentQuestion = BRASIL_REPUBLICA_QUESTIONS[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex >= BRASIL_REPUBLICA_QUESTIONS.length - 1;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Questão {currentQuestionIndex + 1} de {BRASIL_REPUBLICA_QUESTIONS.length}
            </div>
          </div>

          <div className="text-center mb-12">
            <div className={`w-20 h-20 ${selectedSubjectData.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl">{selectedSubjectData.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedTopic}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {selectedExamData.name} - {selectedSubjectData.name}
            </p>
          </div>

          {/* Questão atual */}
          <div className="max-w-4xl mx-auto">
            <QuestionCard 
              question={currentQuestion}
              onNext={isLastQuestion ? () => setCurrentQuestionIndex(0) : nextQuestion}
            />
          </div>
        </div>
      </div>
    );
  }

  // Tela de questões (placeholder para outros assuntos)
  if (currentScreen === 'questions' && selectedTopic && selectedSubjectData && selectedExamData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <div className={`w-20 h-20 ${selectedSubjectData.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl">{selectedSubjectData.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedTopic}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {selectedExamData.name} - {selectedSubjectData.name}
            </p>
          </div>

          {/* Placeholder para questões */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Questões em Desenvolvimento
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Aqui vão aparecer as questões de <strong>{selectedTopic}</strong>.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
                Em breve você poderá praticar com questões reais do {selectedExamData.name}!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de anos
  if (currentScreen === 'years' && selectedExamData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header com botão voltar */}
          <div className="flex items-center mb-8">
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <div className="text-4xl mb-4">{selectedExamData.icon}</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedExamData.name} - Anos Disponíveis
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Escolha o ano da prova que deseja fazer
            </p>
          </div>

          {/* Grid de anos */}
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {YEARS.map((year) => (
              <button
                key={year}
                onClick={() => selectYear(year)}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {year}
                  </div>
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-400">
                    <span className="text-xs">Fazer prova</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tela de questões por ano (2024 com questões reais)
  if (currentScreen === 'year-questions' && selectedExamData && selectedYear) {
    // Mostrar questões apenas para 2024
    if (selectedYear === 2024) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            {/* Header com botão voltar */}
            <div className="flex items-center mb-8">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <div className="text-4xl mb-4">{selectedExamData.icon}</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedExamData.name} {selectedYear}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Questões da prova de {selectedYear}
              </p>
            </div>

            {/* Grid de questões */}
            <div className="max-w-6xl mx-auto space-y-6">
              {QUESTIONS_2024.map((question) => (
                <div
                  key={question.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Cabeçalho da questão */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {question.id}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {question.number}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {question.subject}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900 rounded-full">
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        Resposta: {question.correct}
                      </span>
                    </div>
                  </div>

                  {/* Texto da questão */}
                  <div className="mb-6">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      {question.text}
                    </p>
                    {question.question && (
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed mt-4 font-medium">
                        {question.question}
                      </p>
                    )}
                  </div>

                  {/* Alternativas */}
                  <div className="space-y-3">
                    {question.alternatives.map((alternative, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          alternative.startsWith(question.correct)
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <p className={`text-sm ${
                          alternative.startsWith(question.correct)
                            ? 'text-green-800 dark:text-green-200 font-medium'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {alternative}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Total: {QUESTIONS_2024.length} questões
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Placeholder para outros anos
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            {/* Header com botão voltar */}
            <div className="flex items-center mb-8">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>

            <div className="text-center mb-12">
              <div className="text-4xl mb-4">{selectedExamData.icon}</div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedExamData.name} {selectedYear}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Questões da prova de {selectedYear}
              </p>
            </div>

            {/* Placeholder */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center">
                <div className="text-6xl mb-6">📚</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Questões em Desenvolvimento
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  As questões do {selectedExamData.name} {selectedYear} estão sendo preparadas.
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-4">
                  Em breve você poderá praticar com a prova completa!
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return null;
}