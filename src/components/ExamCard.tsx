'use client';

import { Exam } from '@/lib/types';
import Link from 'next/link';

interface ExamCardProps {
  exam: Exam;
}

export function ExamCard({ exam }: ExamCardProps) {
  return (
    <Link href={`/exam/${exam.id}/mode`}>
      <div className={`
        relative overflow-hidden rounded-2xl p-6 h-32 
        bg-gradient-to-br ${exam.color}
        text-white shadow-lg hover:shadow-xl
        transform hover:scale-105 transition-all duration-300
        cursor-pointer group
      `}>
        <div className="flex items-center justify-between h-full">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1">{exam.name}</h3>
            <p className="text-white/80 text-sm leading-tight">
              {exam.description}
            </p>
          </div>
          <div className="text-3xl ml-4 group-hover:scale-110 transition-transform duration-300">
            {exam.icon}
          </div>
        </div>
        
        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
}