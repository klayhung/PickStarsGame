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
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const recordNode = cc.find('record');
    if (recordNode !== null) {
      const scoreRecord = recordNode.getComponent('Record').getScoreRecord();
      this.scoreDisplay.string = `Score: ${scoreRecord.getScoreRecord()}`;
    }
  },

  onLoadGame() {
    cc.director.loadScene('game');
  },

  // update (dt) {},
});
