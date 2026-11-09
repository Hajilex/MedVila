# MedVila

RPG de estudo de medicina em pixel art, inspirado em Stardew Valley.
Phaser 3 + TypeScript + Vite. Sem imagens externas: os sprites são gerados por código.

## Rodar

```bash
npm install
npm run dev
```

Abra o endereço que o Vite mostrar (no celular, use o endereço da rede local).

## Controles

- Teclado: setas ou WASD para andar, E para atender.
- Celular: toque no chão para andar, toque no paciente (perto dele) para atender.

## Estrutura

- `src/scenes/BootScene.ts`: gera os sprites.
- `src/scenes/VillageScene.ts`: vila, posto, jogador, paciente.
- `src/ui/consultation.ts`: atendimento (queixa, anamnese, exame, conduta) e questão.
- `src/data/`: casos e questões de exemplo (revise antes de usar de verdade).
- `src/state.ts`: EXP, moedas e nível, salvos no localStorage.

## Próximos passos

1. Trocar os sprites por pixel art e o mapa por um do Tiled.
2. Cena interna do posto, horta e pescaria.
3. Supabase: login, progresso e banco de questões.
4. Função no servidor chamando a API da Anthropic para gerar casos e questões (validar o JSON com Zod).
