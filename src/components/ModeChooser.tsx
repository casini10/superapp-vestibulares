'use client';

import Link from 'next/link';
import { BookOpen, Clock } from 'lucide-react';

interface ModeChooserProps {
  examId: string;
  examName: string;
}

export function ModeChooser({ examId, examName }: ModeChooserProps) {
  const modes = [
    {
      id: 'subjects',
      title: 'Estudar por Matéria',
      description: 'Pratique questões por assunto específico',
      icon: BookOpen,
      href: `/exam/${examId}/subjects`,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      id: 'years',
      title: 'Fazer Prova por Ano',
      description: 'Simulado completo de provas anteriores',
      icon: Clock,
      href: `/exam/${examId}/years`,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {examName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Escolha como você quer estudar
          </p>
        </div>

        {/* Mode Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {modes.map((mode) => {
            const IconComponent = mode.icon;
            
            return (
              <Link key={mode.id} href={mode.href}>
                <div className={`
                  ${mode.bgColor} dark:bg-gray-800 dark:hover:bg-gray-700
                  rounded-2xl p-8 text-center
                  border border-gray-200 dark:border-gray-700
                  hover:shadow-lg transform hover:scale-105
                  transition-all duration-300 cursor-pointer
                  group
                `}>
                  <div className={`
                    w-16 h-16 mx-auto mb-6 rounded-2xl
                    bg-gradient-to-br ${mode.color}
                    flex items-center justify-center
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {mode.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Voltar para início
          </Link>
        </div>
      </div>
    </div>
  );
}