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
    pickRadius: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {},

  start() {

  },

  update() {
    if (this.getPlayerDistance() < this.pickRadius) {
      this.onPicked();
    }

    const opacityRatio = 1 - this.game.timer / this.game.starDuration;
    const minOpacity = 50;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));

    const pBar = this.game.progressBar;
    let { progress } = pBar;
    progress = 1 - this.game.timer / this.game.starDuration;
    pBar.progress = progress;
  },

  getPlayerDistance() {
    const playerPos = this.game.player.getPosition();
    const dist = this.node.position.sub(playerPos).mag();
    return dist;
  },

  onPicked() {
    this.game.spawnNewStar();
    const pos = this.node.getPosition();
    this.game.gainScore(pos);
    this.node.destroy();
  },
});
