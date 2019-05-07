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
    sprite: {
      default: null,
      type: cc.Sprite,
    },

    label: {
      default: null,
      type: cc.Label,
    },

    buttonText: {
      default: 'Label',
      formerlySerializedAs: '_N$string',
      notify() {
        this.label.string = this.buttonText;
        this.label.node.setContentSize(this.buttonSize);
      },
    },

    buttonTexture: {
      default: null,
      type: cc.SpriteFrame,
      notify() {
        this.sprite.spriteFrame = this.buttonTexture;
        this.sprite.node.setContentSize(this.buttonSize);
      },
    },

    buttonSize: {
      default: cc.size(0, 0),
      type: cc.Size,
      notify() {
        this.sprite.node.setContentSize(this.buttonSize);
        this.label.node.setContentSize(this.buttonSize);
      },
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {

  },

  start() {

  },
});
