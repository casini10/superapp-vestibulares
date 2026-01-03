// Utilitários para o SuperApp Vestibulares

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeShort(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function calculatePercentage(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getDifficultyColor(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy': return 'text-green-600 bg-green-50';
    case 'medium': return 'text-yellow-600 bg-yellow-50';
    case 'hard': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getDifficultyLabel(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy': return 'Fácil';
    case 'medium': return 'Médio';
    case 'hard': return 'Difícil';
    default: return 'Desconhecido';
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Lógica do cronômetro com banco de tempo
export function calculateQuestionTime(
  baseTimePerQuestion: number,
  carryTime: number
): number {
  const minTime = 30; // 30 segundos mínimo
  const maxTime = baseTimePerQuestion * 2; // máximo 2x o tempo base
  
  return clamp(baseTimePerQuestion + carryTime, minTime, maxTime);
}

export function updateCarryTime(
  allowedTime: number,
  usedTime: number
): number {
  return allowedTime - usedTime; // positivo = sobrou, negativo = faltou
}

// Salvar/carregar sessão no localStorage
export function saveSession(sessionId: string, data: any): void {
  try {
    localStorage.setItem(`session_${sessionId}`, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar sessão:', error);
  }
}

export function loadSession(sessionId: string): any | null {
  try {
    const data = localStorage.getItem(`session_${sessionId}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao carregar sessão:', error);
    return null;
  }
}

export function clearSession(sessionId: string): void {
  try {
    localStorage.removeItem(`session_${sessionId}`);
  } catch (error) {
    console.error('Erro ao limpar sessão:', error);
  }
}

// Validar se pode sair da prova
export function shouldConfirmExit(hasAnswers: boolean, timeSpent: number): boolean {
  return hasAnswers || timeSpent > 60; // Confirma se tem respostas ou gastou mais de 1 minuto
}