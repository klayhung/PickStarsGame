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

    // btnNode: {
    //   default: null,
    //   type: cc.Node,
    // },

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

    maxlifeHeartCounts: 3,

    lifeHeartPrefab: {
      default: null,
      type: cc.Prefab,
    },

    deadHeartPrefab: {
      default: null,
      type: cc.Prefab,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.log('Game onLoad');
    this.groundY = this.ground.y + this.ground.height / 2;
    this.timer = 0;
    this.starDuration = 0;
    this.progressBar.progress = 1;
    this.scorePool = new cc.NodePool('ScoreFx');
    this.lifeHeartPool = new cc.NodePool('Heart');
    this.deadHeartPool = new cc.NodePool('Heart');
  },

  start() {
    cc.log('Game start');
    this.onStartGame();
  },

  onEnable() {
    cc.log('Game enable');
  },

  onStartGame() {
    this.resetScore();
    // this.btnNode.x = 3000;
    this.gameOverNode.active = false;
    this.player.getComponent('Player').startMoveAt(cc.v2(0, this.groundY));
    this.spawnNewStar();
    this.initHeart();
  },

  update(dt) {
    if (this.enabled === false) {
      return;
    }
    if (this.timer > this.starDuration) {
      const lifeHeartNode = this.lifeHeartNodes.pop();
      if (this.deadHeartPool.size() > 0) {
        const deadHeartNode = this.deadHeartPool.get();
        deadHeartNode.setPosition(lifeHeartNode.getPosition());
        this.node.addChild(deadHeartNode);
        this.deadHeartNodes.push(deadHeartNode);
      }
      this.lifeHeartPool.put(lifeHeartNode);
      this.timer = 0;

      if (this.lifeHeartNodes.length === 0) {
        this.gameOver();
        return;
      }

      this.currentStar.getComponent('Star').timeOut();
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
    this.player.destroy();
    this.currentStar.destroy();
    this.progressBar.node.destroy();
    this.progressBar.destroy();
    // this.btnNode.x = 0;
    this.gameOverNode.active = true;
    this.enabled = false;

    const counts = this.deadHeartNodes.length;
    for (let i = 0; i < counts; i += 1) {
      this.deadHeartPool.put(this.deadHeartNodes.pop());
    }
    this.deadHeartPool.clear();
    this.lifeHeartPool.clear();
    cc.director.loadScene('main');
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

  initHeart() {
    this.lifeHeartNodes = [];
    this.deadHeartNodes = [];
    for (let i = 0; i < this.maxlifeHeartCounts; i += 1) {
      const lifeHeartNode = cc.instantiate(this.lifeHeartPrefab);
      this.node.addChild(lifeHeartNode);
      const lifeHeart = lifeHeartNode.getComponent('Heart');
      lifeHeart.firstHeartPosX += (lifeHeart.spacingX * (i + 1));
      lifeHeartNode.setPosition(cc.v2(lifeHeart.firstHeartPosX, lifeHeart.firstHeartPosY));
      this.lifeHeartNodes.push(lifeHeartNode);

      const deadHeart = cc.instantiate(this.deadHeartPrefab);
      this.deadHeartPool.put(deadHeart);
    }
  },
});
