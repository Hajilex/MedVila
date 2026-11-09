export interface ItemInvestigacao {
  texto: string;     // pergunta ou exame
  resposta: string;  // o que o paciente/exame revela
  relevante: boolean;
}

export interface Conduta {
  texto: string;
  correta: boolean;
  explicacao: string;
}

export interface Caso {
  id: string;
  tema: string;
  paciente: string;
  queixa: string;
  anamnese: ItemInvestigacao[];
  exames: ItemInvestigacao[];
  condutas: Conduta[];
  fonte: string;
}

export interface Questao {
  id: string;
  enunciado: string;
  alternativas: string[];
  correta: number; // índice da alternativa certa
  comentario: string;
  fonte: string;
}
