// Tipos principais do SuperApp Vestibulares

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  description: string;
  color: string;
  icon: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Topic {
  id: string;
  name: string;
  percentage: number;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Question {
  id: string;
  examId: string;
  subjectId: string;
  topicId: string;
  year: number;
  statement: string;
  options: {
    letter: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  explanationType: 'official' | 'commented';
  sources: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  averageTime: number; // em segundos
}

export interface ExamYear {
  year: number;
  available: boolean;
}

export interface ExamPaper {
  id: string;
  name: string;
  duration: number; // em minutos
  questionCount: number;
  description?: string;
}

export interface TimerState {
  totalTimeRemaining: number;
  questionTimeAllowed: number;
  questionTimeUsed: number;
  carryTime: number;
  isRunning: boolean;
}

export interface ExamSession {
  examId: string;
  year: number;
  paperId: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>;
  timer: TimerState;
  startTime: Date;
  endTime?: Date;
}

export interface StudyStats {
  totalQuestions: number;
  correctAnswers: number;
  averageTime: number;
  topicsStudied: string[];
  weakTopics: string[];
}