const KEY = 'medvila-save-v1';

export const state = { exp: 0, moedas: 0, nivel: 1 };

export function renderHud() {
  const el = document.getElementById('hud');
  if (el) el.textContent = `Nv ${state.nivel} · EXP ${state.exp} · 🪙 ${state.moedas}`;
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) Object.assign(state, JSON.parse(raw));
  } catch {
    /* sem save, segue o jogo */
  }
  renderHud();
}

export function addReward(exp: number, moedas: number) {
  state.exp += exp;
  state.moedas += moedas;
  state.nivel = 1 + Math.floor(state.exp / 100);
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignora */
  }
  renderHud();
}
