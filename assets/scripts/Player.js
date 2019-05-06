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
    jumpHeight: 0,
    jumpDuration: 0,
    maxMoveSpeed: 0,
    accel: 0,
    squashDuration: 0,

    jumpAudio: {
      default: null,
      type: cc.AudioClip,
    },
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad() {
    cc.log('Player onLoad');
    // this.enabled = false;
    this.accLeft = false;
    this.accRight = false;
    this.xSpeed = 0;
    this.minPosX = -this.node.parent.width / 2;
    this.maxPosX = this.node.parent.width / 2;
    this.jumpAction = this.setJumpAction();

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },

  start() {
    cc.log('Player start');
  },

  update(dt) {
    // cc.log('Player update');
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    }

    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    }

    this.node.x += this.xSpeed * dt;

    if (this.node.x > this.maxPosX) {
      this.node.x = this.maxPosX;
      this.xSpeed = 0;
    } else if (this.node.x < this.minPosX) {
      this.node.x = this.minPosX;
      this.xSpeed = 0;
    }
  },

  setJumpAction() {
    const jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight))
      .easing(cc.easeCubicActionOut());

    const jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight))
      .easing(cc.easeCubicActionIn());
    const squash = cc.scaleTo(this.squashDuration, 1, 0.6);
    const stretch = cc.scaleTo(this.squashDuration, 1, 1.2);
    const scaleBack = cc.scaleTo(this.squashDuration, 1, 1);
    const callback = cc.callFunc(this.playJumpSound, this);

    return cc.repeatForever(cc.sequence(squash, stretch, jumpUp, scaleBack, jumpDown, callback));
  },

  onKeyDown(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = true;
        break;
      case cc.macro.KEY.d:
        this.accRight = true;
        break;
      default:
        break;
    }
  },

  onKeyUp(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        this.accLeft = false;
        break;
      case cc.macro.KEY.d:
        this.accRight = false;
        break;
      default:
        break;
    }
  },

  playJumpSound() {
    cc.audioEngine.playEffect(this.jumpAudio, false);
  },

  startMoveAt(pos) {
    this.xSpeed = 0;
    this.node.setPosition(pos);
    this.node.runAction(this.setJumpAction());
  },

  stopMove() {
    this.node.stopAllActions();
  },
});
