import type { Caso, ItemInvestigacao, Questao } from '../data/types';
import { QUESTOES } from '../data/questions';
import { addReward } from '../state';

const root = () => document.getElementById('ui') as HTMLDivElement;

// Escape obrigatório: quando o conteúdo vier da IA, nunca confie no HTML dele.
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

function render(html: string) {
  const el = root();
  el.innerHTML = `<div class="panel">${html}</div>`;
  el.classList.add('open');
}

export function closeUi() {
  const el = root();
  el.classList.remove('open');
  el.innerHTML = '';
}

export function isUiOpen() {
  return root().classList.contains('open');
}

const byId = (id: string) => document.getElementById(id) as HTMLButtonElement;

export function startConsultation(caso: Caso) {
  render(`
    <h2>${esc(caso.paciente)}</h2>
    <p class="tag">Queixa</p>
    <p>${esc(caso.queixa)}</p>
    <button id="go" class="primary">Fazer anamnese ▸</button>
  `);
  byId('go').onclick = () =>
    investigar('Anamnese', caso.anamnese, (s1) =>
      investigar('Exame físico', caso.exames, (s2) => conduta(caso, (s1 + s2) / 2)),
    );
}

// Tela genérica: o jogador escolhe o que perguntar/examinar. Pontua pelos itens relevantes feitos.
function investigar(titulo: string, itens: ItemInvestigacao[], next: (score: number) => void) {
  const feitos = new Set<number>();

  const draw = () => {
    const log = [...feitos]
      .map((i) => `<p class="log"><b>${esc(itens[i].texto)}</b><br>${esc(itens[i].resposta)}</p>`)
      .join('');
    const botoes = itens
      .map((it, i) => (feitos.has(i) ? '' : `<button data-i="${i}">${esc(it.texto)}</button>`))
      .join('');
    render(`<h2>${esc(titulo)}</h2>${log}${botoes}<button id="next" class="primary">Continuar ▸</button>`);

    root()
      .querySelectorAll<HTMLButtonElement>('button[data-i]')
      .forEach((b) => {
        b.onclick = () => {
          feitos.add(Number(b.dataset.i));
          draw();
        };
      });

    byId('next').onclick = () => {
      const relevantes = itens.map((it, i) => ({ it, i })).filter((x) => x.it.relevante);
      const acertos = relevantes.filter((x) => feitos.has(x.i)).length;
      next(relevantes.length ? acertos / relevantes.length : 1);
    };
  };

  draw();
}

function conduta(caso: Caso, score: number) {
  const botoes = caso.condutas.map((c, i) => `<button data-i="${i}">${esc(c.texto)}</button>`).join('');
  render(`<h2>Conduta</h2><p>Qual a sua decisão?</p>${botoes}`);

  root()
    .querySelectorAll<HTMLButtonElement>('button[data-i]')
    .forEach((b) => {
      b.onclick = () => {
        const escolhida = caso.condutas[Number(b.dataset.i)];
        const exp = escolhida.correta ? 30 + Math.round(20 * score) : 5;
        addReward(exp, escolhida.correta ? 20 : 0);
        render(`
          <h2>${escolhida.correta ? '✅ Boa conduta!' : '❌ Não foi dessa vez'}</h2>
          <p>${esc(escolhida.explicacao)}</p>
          <p class="tag">Fonte</p><p>${esc(caso.fonte)}</p>
          <p class="tag">Recompensa</p><p>+${exp} EXP${escolhida.correta ? ' · +20 🪙' : ''}</p>
          <button id="q" class="primary">Responder questão ▸</button>
        `);
        byId('q').onclick = questao;
      };
    });
}

function questao() {
  const q: Questao = QUESTOES[Math.floor(Math.random() * QUESTOES.length)];
  const botoes = q.alternativas.map((a, i) => `<button data-i="${i}">${esc(a)}</button>`).join('');
  render(`<h2>Questão</h2><p>${esc(q.enunciado)}</p>${botoes}`);

  root()
    .querySelectorAll<HTMLButtonElement>('button[data-i]')
    .forEach((b) => {
      b.onclick = () => {
        const acertou = Number(b.dataset.i) === q.correta;
        addReward(acertou ? 20 : 5, acertou ? 10 : 0);
        render(`
          <h2>${acertou ? '✅ Acertou!' : '❌ Errou'}</h2>
          <p><b>Gabarito:</b> ${esc(q.alternativas[q.correta])}</p>
          <p>${esc(q.comentario)}</p>
          <p class="tag">Fonte</p><p>${esc(q.fonte)}</p>
          <button id="fim" class="primary">Voltar à vila</button>
        `);
        byId('fim').onclick = closeUi;
      };
    });
}
