'use client';

import { Topic } from '@/lib/types';
import { getDifficultyColor, getDifficultyLabel } from '@/lib/utils';
import Link from 'next/link';
import { Shuffle } from 'lucide-react';

interface TopicListProps {
  topics: Topic[];
  examId: string;
  subjectId: string;
}

export function TopicList({ topics, examId, subjectId }: TopicListProps) {
  const handleRandomTopic = () => {
    // Seleção ponderada baseada na porcentagem
    const weights = topics.map(topic => topic.percentage);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const random = Math.random() * totalWeight;
    
    let currentWeight = 0;
    for (let i = 0; i < topics.length; i++) {
      currentWeight += weights[i];
      if (random <= currentWeight) {
        window.location.href = `/practice?examId=${examId}&subjectId=${subjectId}&topicId=${topics[i].id}`;
        return;
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Botão Surpreenda-me */}
      <button
        onClick={handleRandomTopic}
        className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 font-semibold"
      >
        <Shuffle className="w-5 h-5" />
        Surpreenda-me (aleatório ponderado)
      </button>

      {/* Lista de tópicos */}
      {topics.map((topic, index) => (
        <Link 
          key={topic.id}
          href={`/practice?examId=${examId}&subjectId=${subjectId}&topicId=${topic.id}`}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400 min-w-[24px]">
                    #{index + 1}
                  </span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {topic.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                    {getDifficultyLabel(topic.difficulty)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {topic.percentage}% das questões
                  </span>
                  <span>
                    {topic.questionCount} questões disponíveis
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ width: `${Math.min(topic.percentage * 4, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}