import type { Questao } from './types';

// EXEMPLOS. Depois, estas questões virão do banco de dados ou da IA.
export const QUESTOES: Questao[] = [
  {
    id: 'sepse-q1',
    enunciado: 'Na suspeita de infecção, qual conjunto compõe o qSOFA?',
    alternativas: [
      'FR ≥ 22 irpm, alteração do estado mental e PAS ≤ 100 mmHg',
      'Temperatura > 38 °C, FC > 90 bpm e leucócitos > 12.000',
      'Lactato > 2 mmol/L, plaquetas < 100.000 e bilirrubina > 2',
      'Diurese < 0,5 mL/kg/h, PAM < 65 e uso de vasopressor',
    ],
    correta: 0,
    comentario: 'O qSOFA é uma triagem à beira do leito: dois ou mais critérios indicam maior risco de desfecho ruim.',
    fonte: 'Sepsis-3, Singer et al., JAMA 2016',
  },
  {
    id: 'sepse-q2',
    enunciado: 'Qual o tempo-alvo para iniciar antibiótico em adultos com choque séptico ou alta probabilidade de sepse?',
    alternativas: ['Em até 1 hora', 'Em até 3 horas', 'Em até 6 horas', 'Em até 24 horas'],
    correta: 0,
    comentario: 'Quanto mais cedo o antibiótico adequado, melhor o prognóstico no choque séptico.',
    fonte: 'Surviving Sepsis Campaign 2021',
  },
];
