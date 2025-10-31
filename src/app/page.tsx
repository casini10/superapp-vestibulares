'use client';

import { useState } from 'react';
import { GraduationCap, ArrowLeft, BookOpen, Calendar, ChevronRight } from 'lucide-react';

// SuperApp Vestibulares - Sistema completo de estudos
// Tipos
type Screen = 'home' | 'mode' | 'subjects' | 'years' | 'topics' | 'questions';
type ExamId = 'enem' | 'uerj' | 'fuvest' | 'puc';

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

// Assuntos por matéria (dados reais dos vestibulares)
const TOPICS_BY_SUBJECT = {
  mat: [
    'Aritmética e porcentagem',
    'Estatística (média, gráficos e tabelas)',
    'Geometria plana e espacial',
    'Funções',
    'Probabilidade',
    'PA/PG',
    'Trigonometria'
  ],
  fis: [
    'Eletrodinâmica',
    'Cinemática',
    'Dinâmica',
    'Termologia',
    'Óptica',
    'Hidrostática',
    'Ondulatória'
  ],
  qui: [
    'Físico-química',
    'Soluções',
    'Estequiometria',
    'Eletroquímica',
    'Química Orgânica',
    'Atomística',
    'Termoquímica'
  ],
  bio: [
    'Ecologia',
    'Citologia',
    'Genética',
    'Fisiologia',
    'Evolução',
    'Botânica',
    'Zoologia'
  ],
  por: [
    'Interpretação de texto',
    'Gêneros textuais',
    'Gramática',
    'Literatura',
    'Redação',
    'Figuras de linguagem',
    'Análise sintática'
  ],
  ing: [
    'Interpretação de texto',
    'Vocabulário',
    'Gramática básica',
    'Tempos verbais',
    'Conectivos',
    'Expressões idiomáticas'
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
    'Idade Contemporânea'
  ],
  geo: [
    'Geopolítica',
    'Meio ambiente',
    'Cartografia',
    'Demografia',
    'Climatologia',
    'Geografia do Brasil',
    'Urbanização'
  ],
  fil: [
    'Filosofia Antiga',
    'Filosofia Medieval',
    'Filosofia Moderna',
    'Filosofia Contemporânea',
    'Ética',
    'Política',
    'Estética'
  ],
  soc: [
    'Sociologia Clássica',
    'Sociologia Contemporânea',
    'Movimentos Sociais',
    'Cultura',
    'Estratificação Social',
    'Globalização',
    'Cidadania'
  ]
};

// Anos disponíveis
const YEARS = Array.from({ length: 16 }, (_, i) => 2024 - i);

export default function SuperAppVestibulares() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedExam, setSelectedExam] = useState<ExamId | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Função para voltar
  const goBack = () => {
    if (currentScreen === 'mode') {
      setCurrentScreen('home');
      setSelectedExam(null);
    } else if (currentScreen === 'subjects' || currentScreen === 'years') {
      setCurrentScreen('mode');
    } else if (currentScreen === 'topics') {
      setCurrentScreen('subjects');
      setSelectedSubject(null);
    } else if (currentScreen === 'questions') {
      setCurrentScreen('topics');
      setSelectedTopic(null);
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
  };

  // Função para selecionar assunto
  const selectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setCurrentScreen('questions');
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

  // Tela de assuntos que mais caem
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

          <div className="text-center mb-12">
            <div className={`w-20 h-20 ${selectedSubjectData.color} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
              <span className="text-3xl">{selectedSubjectData.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedSubjectData.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Assuntos que mais caem no {selectedExamData.name}
            </p>
          </div>

          {/* Lista de assuntos */}
          <div className="max-w-3xl mx-auto space-y-4">
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
          </div>
        </div>
      </div>
    );
  }

  // Tela de questões (placeholder)
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

  return null;
}