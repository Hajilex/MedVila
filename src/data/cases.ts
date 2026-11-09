import type { Caso } from './types';

// EXEMPLO para testar o fluxo. Revise o conteúdo clínico antes de usar de verdade.
export const CASOS: Caso[] = [
  {
    id: 'sepse-urinaria-01',
    tema: 'Sepse',
    paciente: 'Dona Marta, 68 anos',
    queixa: '"Doutor, estou com calafrios e minha cabeça está confusa desde hoje cedo."',
    anamnese: [
      { texto: 'Há quanto tempo está assim?', resposta: 'Começou há 2 dias com ardência ao urinar. Hoje amanheceu confusa e com calafrios.', relevante: true },
      { texto: 'Tem alguma doença crônica?', resposta: 'Diabetes tipo 2 e hipertensão, em uso de metformina e losartana.', relevante: true },
      { texto: 'Como está a urina?', resposta: 'Turva, com cheiro forte, e urinou pouco hoje.', relevante: true },
      { texto: 'Tem alergia a algum medicamento?', resposta: 'Nega alergias.', relevante: true },
      { texto: 'Como estão apetite e intestino?', resposta: 'Comeu pouco. Intestino normal.', relevante: false },
      { texto: 'Qual é o seu time de futebol?', resposta: 'Bahia, doutor!', relevante: false },
    ],
    exames: [
      { texto: 'Sinais vitais', resposta: 'T 38,9 °C, FC 118 bpm, PA 86x50 mmHg, FR 26 irpm, SpO2 94% em ar ambiente.', relevante: true },
      { texto: 'Estado mental', resposta: 'Sonolenta, desorientada no tempo, sem sinais focais.', relevante: true },
      { texto: 'Punho-percussão lombar', resposta: 'Dor à punho-percussão à direita.', relevante: true },
      { texto: 'Glicemia capilar', resposta: '210 mg/dL.', relevante: true },
      { texto: 'Exame das mamas', resposta: 'Sem alterações.', relevante: false },
    ],
    condutas: [
      {
        texto: 'Coletar lactato e hemoculturas, iniciar antibiótico de amplo espectro na primeira hora e repor volume com cristaloide.',
        correta: true,
        explicacao: 'Hipotensão e rebaixamento do nível de consciência com foco urinário sugerem sepse com disfunção orgânica: é emergência. Colha lactato e culturas, mas não atrase o antibiótico nem a ressuscitação volêmica.',
      },
      {
        texto: 'Prescrever antitérmico e orientar retorno se piorar.',
        correta: false,
        explicacao: 'Os sinais de gravidade (PA baixa, confusão, FR alta) contraindicam a alta.',
      },
      {
        texto: 'Pedir urocultura e aguardar o resultado antes de escolher o antibiótico.',
        correta: false,
        explicacao: 'Colher cultura está certo, mas esperar o resultado atrasa o tratamento em um caso grave.',
      },
      {
        texto: 'Iniciar antibiótico oral e liberar com acompanhamento ambulatorial.',
        correta: false,
        explicacao: 'Paciente instável precisa de via parenteral e monitorização hospitalar.',
      },
    ],
    fonte: 'Surviving Sepsis Campaign 2021 (revisar antes de publicar)',
  },
];
