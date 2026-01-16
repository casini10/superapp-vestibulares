'use client';

import { Subject } from '@/lib/types';
import Link from 'next/link';

interface SubjectGridProps {
  subjects: Subject[];
  examId: string;
}

export function SubjectGrid({ subjects, examId }: SubjectGridProps) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600 bg-blue-50 hover:bg-blue-100',
      yellow: 'from-yellow-500 to-yellow-600 bg-yellow-50 hover:bg-yellow-100',
      green: 'from-green-500 to-green-600 bg-green-50 hover:bg-green-100',
      emerald: 'from-emerald-500 to-emerald-600 bg-emerald-50 hover:bg-emerald-100',
      amber: 'from-amber-500 to-amber-600 bg-amber-50 hover:bg-amber-100',
      cyan: 'from-cyan-500 to-cyan-600 bg-cyan-50 hover:bg-cyan-100',
      red: 'from-red-500 to-red-600 bg-red-50 hover:bg-red-100',
      indigo: 'from-indigo-500 to-indigo-600 bg-indigo-50 hover:bg-indigo-100'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600 bg-gray-50 hover:bg-gray-100';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {subjects.map((subject) => {
        const [gradientColors, bgColors] = getColorClasses(subject.color).split(' bg-');
        
        return (
          <Link 
            key={subject.id} 
            href={`/exam/${examId}/subjects/${subject.id}/topics`}
          >
            <div className={`
              bg-${bgColors} dark:bg-gray-800 dark:hover:bg-gray-700
              rounded-2xl p-6 text-center
              border border-gray-200 dark:border-gray-700
              hover:shadow-lg transform hover:scale-105
              transition-all duration-300 cursor-pointer
              group min-h-[140px] flex flex-col justify-center
            `}>
              <div className={`
                w-12 h-12 mx-auto mb-4 rounded-xl
                bg-gradient-to-br ${gradientColors}
                flex items-center justify-center
                group-hover:scale-110 transition-transform duration-300
              `}>
                <span className="text-2xl">{subject.icon}</span>
              </div>
              
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {subject.name}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}