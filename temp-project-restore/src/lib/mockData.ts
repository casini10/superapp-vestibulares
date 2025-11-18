import { Exam, Subject, Topic, Question, ExamYear, ExamPaper } from './types';

// Mock data para os vestibulares
export const EXAMS: Exam[] = [
  {
    id: 'enem',
    name: 'ENEM',
    fullName: 'Exame Nacional do Ensino Médio',
    description: 'O maior vestibular do Brasil',
    color: 'from-blue-500 to-blue-600',
    icon: '🎓'
  },
  {
    id: 'uerj',
    name: 'UERJ',
    fullName: 'Universidade do Estado do Rio de Janeiro',
    description: 'Vestibular da UERJ',
    color: 'from-red-500 to-red-600',
    icon: '🏛️'
  },
  {
    id: 'fuvest',
    name: 'FUVEST/USP',
    fullName: 'Fundação Universitária para o Vestibular',
    description: 'Vestibular da USP',
    color: 'from-yellow-500 to-orange-500',
    icon: '⭐'
  },
  {
    id: 'puc',
    name: 'PUC-Rio',
    fullName: 'Pontifícia Universidade Católica do Rio de Janeiro',
    description: 'Vestibular da PUC-Rio',
    color: 'from-purple-500 to-purple-600',
    icon: '🎯'
  }
];

// Mock data para matérias
export const SUBJECTS: Subject[] = [
  { id: 'mat', name: 'Matemática', icon: '📊', color: 'blue' },
  { id: 'fis', name: 'Física', icon: '⚡', color: 'yellow' },
  { id: 'qui', name: 'Química', icon: '🧪', color: 'green' },
  { id: 'bio', name: 'Biologia', icon: '🌱', color: 'emerald' },
  { id: 'his', name: 'História', icon: '📚', color: 'amber' },
  { id: 'geo', name: 'Geografia', icon: '🌍', color: 'cyan' },
  { id: 'por', name: 'Português', icon: '📝', color: 'red' },
  { id: 'ing', name: 'Inglês', icon: '🇺🇸', color: 'indigo' }
];

// Mock data para tópicos de Matemática
export const MATH_TOPICS: Topic[] = [
  { id: 'funcoes', name: 'Funções', percentage: 18.5, questionCount: 245, difficulty: 'medium' },
  { id: 'geometria', name: 'Geometria', percentage: 15.2, questionCount: 198, difficulty: 'hard' },
  { id: 'analise-combinatoria', name: 'Análise Combinatória', percentage: 12.8, questionCount: 167, difficulty: 'medium' },
  { id: 'probabilidade', name: 'Probabilidade', percentage: 11.3, questionCount: 148, difficulty: 'medium' },
  { id: 'estatistica', name: 'Estatística', percentage: 10.7, questionCount: 139, difficulty: 'easy' },
  { id: 'trigonometria', name: 'Trigonometria', percentage: 9.4, questionCount: 123, difficulty: 'hard' },
  { id: 'logaritmos', name: 'Logaritmos', percentage: 8.1, questionCount: 106, difficulty: 'medium' },
  { id: 'progressoes', name: 'Progressões', percentage: 7.6, questionCount: 99, difficulty: 'medium' },
  { id: 'matrizes', name: 'Matrizes e Determinantes', percentage: 6.4, questionCount: 84, difficulty: 'hard' }
];

// Mock data para anos disponíveis
export const AVAILABLE_YEARS: ExamYear[] = Array.from({ length: 16 }, (_, i) => ({
  year: 2024 - i,
  available: true
}));

// Mock data para provas do ENEM
export const ENEM_PAPERS: ExamPaper[] = [
  {
    id: 'dia1',
    name: 'Dia 1 - Linguagens e Ciências Humanas + Redação',
    duration: 330, // 5h30min
    questionCount: 90,
    description: '45 questões de Linguagens + 45 questões de Ciências Humanas + Redação'
  },
  {
    id: 'dia2',
    name: 'Dia 2 - Ciências da Natureza e Matemática',
    duration: 300, // 5h
    questionCount: 90,
    description: '45 questões de Ciências da Natureza + 45 questões de Matemática'
  }
];

// Mock data para uma questão de exemplo
export const SAMPLE_QUESTION: Question = {
  id: 'q1',
  examId: 'enem',
  subjectId: 'mat',
  topicId: 'funcoes',
  year: 2023,
  statement: 'Uma função f(x) = ax² + bx + c tem como gráfico uma parábola que passa pelos pontos (0, 3), (1, 6) e (2, 11). O valor de a + b + c é:',
  options: [
    { letter: 'A', text: '8' },
    { letter: 'B', text: '9' },
    { letter: 'C', text: '10' },
    { letter: 'D', text: '11' },
    { letter: 'E', text: '12' }
  ],
  correctAnswer: 'C',
  explanation: 'Substituindo os pontos na função: f(0) = c = 3, f(1) = a + b + c = 6, f(2) = 4a + 2b + c = 11. Resolvendo o sistema: a = 1, b = 2, c = 3. Portanto, a + b + c = 6.',
  explanationType: 'official',
  sources: ['INEP - ENEM 2023'],
  difficulty: 'medium',
  averageTime: 180 // 3 minutos
};

// Mock API functions
export const mockAPI = {
  getSubjects: async (examId: string): Promise<Subject[]> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simula delay
    return SUBJECTS;
  },

  getTopics: async (examId: string, subjectId: string): Promise<Topic[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (subjectId === 'mat') return MATH_TOPICS;
    // Para outras matérias, retorna tópicos genéricos
    return [
      { id: 'topic1', name: 'Tópico Principal', percentage: 25.0, questionCount: 150, difficulty: 'medium' },
      { id: 'topic2', name: 'Conceitos Básicos', percentage: 20.0, questionCount: 120, difficulty: 'easy' },
      { id: 'topic3', name: 'Aplicações Avançadas', percentage: 15.0, questionCount: 90, difficulty: 'hard' }
    ];
  },

  getRandomQuestion: async (examId: string, subjectId: string, topicId: string): Promise<Question> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...SAMPLE_QUESTION, id: `q_${Date.now()}` };
  },

  verifyAnswer: async (questionId: string, answer: string): Promise<{
    correct: boolean;
    officialAnswer: string;
    explanation: string;
    explanationType: string;
    sources: string[];
  }> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const correct = answer === SAMPLE_QUESTION.correctAnswer;
    return {
      correct,
      officialAnswer: SAMPLE_QUESTION.correctAnswer,
      explanation: SAMPLE_QUESTION.explanation,
      explanationType: SAMPLE_QUESTION.explanationType,
      sources: SAMPLE_QUESTION.sources
    };
  },

  getAvailableYears: async (examId: string): Promise<ExamYear[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return AVAILABLE_YEARS;
  },

  getExamPapers: async (examId: string, year: number): Promise<ExamPaper[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (examId === 'enem') return ENEM_PAPERS;
    
    // Mock para outros vestibulares
    return [
      { id: 'fase1', name: '1ª Fase', duration: 240, questionCount: 60 },
      { id: 'fase2', name: '2ª Fase', duration: 180, questionCount: 40 }
    ];
  }
};