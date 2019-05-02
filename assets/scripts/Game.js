// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    starPerfab: {
      default: null,
      type: cc.Prefab,
    },

    maxStarDuration: 0,
    minStarDuration: 0,

    ground: {
      default: null,
      type: cc.Node,
    },

    player: {
      default: null,
      type: cc.Node,
    },

    scoreDisplay: {
      default: null,
      type: cc.Label,
    },

    scoreAudio: {
      default: null,
      type: cc.AudioClip,
    },

    btnNode: {
      default: null,
      type: cc.Node,
    },

    gameOverNode: {
      default: null,
      type: cc.Node,
    },

    progressBar: {
      default: null,
      type: cc.ProgressBar,
    },

    scoreFxPrefab: {
      default: null,
      type: cc.Prefab,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.groundY = this.ground.y + this.ground.height / 2;
    this.timer = 0;
    this.starDuration = 0;
    this.enabled = false;
    this.progressBar.progress = 1;
    this.scorePool = new cc.NodePool('ScoreFx');
  },

  start() {

  },

  onStartGame() {
    this.resetScore();
    this.btnNode.x = 3000;
    this.gameOverNode.active = false;
    this.enabled = true;
    this.player.getComponent('Player').startMoveAt(cc.v2(0, this.groundY));
    this.spawnNewStar();
  },

  update(dt) {
    if (this.timer > this.starDuration) {
      this.gameOver();
      return;
    }
    this.timer += dt;
  },

  spawnNewStar() {
    const newStar = cc.instantiate(this.starPerfab);
    this.node.addChild(newStar);
    newStar.setPosition(this.getNewStarPosition());
    newStar.getComponent('Star').game = this;
    this.starDuration = this.minStarDuration
        + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
    this.currentStar = newStar;
  },

  getNewStarPosition() {
    let randX = 0;
    const randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
    const maxX = this.node.width / 2;
    randX = (Math.random() - 0.5) * 2 * maxX;
    return cc.v2(randX, randY);
  },

  gainScore(pos) {
    // const prefa = cc.instantiate(this.scoreFxPrefab);
    // const fx = prefa.getComponent('ScoreFx');
    const fx = this.spawnScoreFx();
    this.node.addChild(fx.node);
    fx.node.setPosition(pos);
    fx.play();

    this.score += 1;
    this.scoreDisplay.string = `Score: ${this.score}`;
    cc.audioEngine.playEffect(this.scoreAudio, false);
  },

  resetScore() {
    this.score = 0;
    this.scoreDisplay.string = `Score: ${this.score}`;
  },

  gameOver() {
    this.player.getComponent('Player').stopMove();
    this.currentStar.destroy();
    this.btnNode.x = 0;
    this.gameOverNode.active = true;
  },

  spawnScoreFx() {
    let fx;
    if (this.scorePool.size() > 0) {
      fx = this.scorePool.get();
      return fx.getComponent('ScoreFx');
    }
    fx = cc.instantiate(this.scoreFxPrefab).getComponent('ScoreFx');
    fx.init(this);
    return fx;
  },

  despawnScoreFx(scoreFx) {
    this.scorePool.put(scoreFx);
  },
});
