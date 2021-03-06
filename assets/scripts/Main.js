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
    scoreDisplay: {
      default: null,
      type: cc.Label,
    },

    gameOverNode: {
      default: null,
      type: cc.Node,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.scoreDisplay.enabled = false;
    const recordNode = cc.find('record');
    if (recordNode !== null) {
      const scoreRecord = recordNode.getComponent('Record');
      this.scoreDisplay.string = `Score: ${scoreRecord.getScoreRecord()}`;
      this.gameOverNode.active = true;
      this.scoreDisplay.enabled = true;
    }
  },

  onLoadGame() {
    cc.director.loadScene('game');
  },

  // update (dt) {},
});
