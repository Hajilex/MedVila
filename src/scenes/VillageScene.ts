import Phaser from 'phaser';
import { CASOS } from '../data/cases';
import { isUiOpen, startConsultation } from '../ui/consultation';

const T = 16;
const COLS = 40;
const ROWS = 30;
const SPEED = 70;

export class VillageScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private patient!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<'w' | 'a' | 's' | 'd' | 'e', Phaser.Input.Keyboard.Key>;
  private hint!: Phaser.GameObjects.Text;
  private target: Phaser.Math.Vector2 | null = null;

  constructor() {
    super('Village');
  }

  create() {
    const worldW = COLS * T;
    const worldH = ROWS * T;

    // chão
    this.add.tileSprite(0, 0, worldW, worldH, 'grass').setOrigin(0);
    this.add.tileSprite(18 * T, 14 * T, 4 * T, (ROWS - 14) * T, 'path').setOrigin(0);
    this.add.tileSprite(0, 22 * T, worldW, 2 * T, 'path').setOrigin(0);

    const solids = this.physics.add.staticGroup();

    // posto de saúde
    const clinic = this.physics.add.staticImage(20 * T, 12 * T, 'clinic');
    solids.add(clinic);

    // árvores em posições fixas (mesma vila a cada partida)
    const rnd = new Phaser.Math.RandomDataGenerator(['medvila']);
    for (let i = 0; i < 45; i++) {
      const tx = rnd.between(1, COLS - 2);
      const ty = rnd.between(1, ROWS - 2);
      const nearPath = tx >= 16 && tx <= 24 && ty >= 6;
      const onRoad = ty >= 21 && ty <= 24;
      if (nearPath || onRoad) continue;
      solids.add(this.physics.add.staticImage(tx * T, ty * T, 'tree'));
    }

    // paciente na porta, com um leve balanço para chamar atenção
    this.patient = this.add.sprite(20 * T, 16 * T, 'patient');
    this.tweens.add({ targets: this.patient, y: this.patient.y - 2, duration: 500, yoyo: true, repeat: -1 });

    // jogador
    this.player = this.physics.add.sprite(20 * T, 26 * T, 'player');
    this.player.setCollideWorldBounds(true);
    (this.player.body as Phaser.Physics.Arcade.Body).setSize(8, 8).setOffset(2, 8);
    this.physics.add.collider(this.player, solids);
    this.physics.world.setBounds(0, 0, worldW, worldH);

    // câmera
    this.cameras.main.setBounds(0, 0, worldW, worldH);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // controles
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys({ w: 'W', a: 'A', s: 'S', d: 'D', e: 'E' }) as typeof this.wasd;

    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      if (isUiOpen()) return;
      const nearPatient = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.patient.x, this.patient.y) < 36;
      const tappedPatient = Phaser.Math.Distance.Between(p.worldX, p.worldY, this.patient.x, this.patient.y) < 16;
      if (nearPatient && tappedPatient) {
        this.atender();
      } else {
        this.target = new Phaser.Math.Vector2(p.worldX, p.worldY);
      }
    });

    this.hint = this.add
      .text(240, 300, '', { fontSize: '10px', color: '#ffffff', backgroundColor: '#000000aa', padding: { x: 6, y: 3 } })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(10);
  }

  update() {
    if (isUiOpen()) {
      this.player.setVelocity(0);
      return;
    }

    let vx = 0;
    let vy = 0;
    if (this.cursors.left.isDown || this.wasd.a.isDown) vx -= 1;
    if (this.cursors.right.isDown || this.wasd.d.isDown) vx += 1;
    if (this.cursors.up.isDown || this.wasd.w.isDown) vy -= 1;
    if (this.cursors.down.isDown || this.wasd.s.isDown) vy += 1;

    if (vx !== 0 || vy !== 0) {
      this.target = null; // teclado cancela o toque
    } else if (this.target) {
      const dx = this.target.x - this.player.x;
      const dy = this.target.y - this.player.y;
      if (Math.hypot(dx, dy) < 3) {
        this.target = null;
      } else {
        vx = dx;
        vy = dy;
      }
    }

    const v = new Phaser.Math.Vector2(vx, vy);
    if (v.lengthSq() > 0) v.normalize().scale(SPEED);
    this.player.setVelocity(v.x, v.y);
    if (v.x !== 0) this.player.setFlipX(v.x < 0);

    const near = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.patient.x, this.patient.y) < 36;
    this.hint.setText(near ? 'E ou toque no paciente: atender' : '');
    if (near && Phaser.Input.Keyboard.JustDown(this.wasd.e)) this.atender();
  }

  private atender() {
    this.target = null;
    this.player.setVelocity(0);
    startConsultation(Phaser.Utils.Array.GetRandom(CASOS));
  }
}
