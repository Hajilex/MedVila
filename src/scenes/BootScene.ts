import Phaser from 'phaser';

// Gera os sprites por código para o jogo rodar sem nenhum arquivo de imagem.
// Quando tiver pixel art de verdade, troque por this.load.image / this.load.spritesheet.
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    const g = this.make.graphics({ x: 0, y: 0 }, false);

    // grama
    g.fillStyle(0x5aa04b).fillRect(0, 0, 16, 16);
    g.fillStyle(0x4f9342).fillRect(2, 3, 2, 2).fillRect(10, 9, 2, 2).fillRect(6, 13, 2, 1);
    g.generateTexture('grass', 16, 16);
    g.clear();

    // caminho de terra
    g.fillStyle(0xc9a66b).fillRect(0, 0, 16, 16);
    g.fillStyle(0xb8935a).fillRect(3, 4, 2, 2).fillRect(11, 10, 2, 2);
    g.generateTexture('path', 16, 16);
    g.clear();

    // árvore
    g.fillStyle(0x6b4423).fillRect(8, 16, 4, 8);
    g.fillStyle(0x2f7a3a).fillCircle(10, 9, 9);
    g.fillStyle(0x3d9148).fillCircle(7, 7, 4);
    g.generateTexture('tree', 20, 24);
    g.clear();

    // posto de saúde
    g.fillStyle(0xe8e0d0).fillRect(0, 12, 64, 36);
    g.fillStyle(0xb8453a).fillRect(0, 0, 64, 14);
    g.fillStyle(0xffffff).fillRect(29, 2, 6, 10).fillRect(27, 4, 10, 6);
    g.fillStyle(0x6b4423).fillRect(26, 30, 12, 18);
    g.fillStyle(0x8ec5e8).fillRect(6, 20, 14, 10).fillRect(44, 20, 14, 10);
    g.generateTexture('clinic', 64, 48);
    g.clear();

    // jogador (jaleco branco)
    g.fillStyle(0xf1c27d).fillRect(3, 0, 6, 6);
    g.fillStyle(0x4a2f1b).fillRect(3, 0, 6, 2);
    g.fillStyle(0xffffff).fillRect(2, 6, 8, 10);
    g.fillStyle(0x3b6fb6).fillRect(4, 6, 4, 2);
    g.generateTexture('player', 12, 16);
    g.clear();

    // paciente
    g.fillStyle(0xe0ac69).fillRect(3, 0, 6, 6);
    g.fillStyle(0xcccccc).fillRect(3, 0, 6, 2);
    g.fillStyle(0xd98e73).fillRect(2, 6, 8, 10);
    g.generateTexture('patient', 12, 16);
    g.destroy();

    this.scene.start('Village');
  }
}
