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
    scoreRecord: 0,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.log('Record load');
    cc.game.addPersistRootNode(this.node);
  },

  start() {

  },

  setScoreRecord(score) {
    this.scoreRecord = score;
  },

  getScoreRecord() {
    return this.scoreRecord;
  },
});
