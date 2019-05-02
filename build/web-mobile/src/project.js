window.__require=function t(e,i,s){function o(c,a){if(!i[c]){if(!e[c]){var r=c.split("/");if(r=r[r.length-1],!e[r]){var h="function"==typeof __require&&__require;if(!a&&h)return h(r,!0);if(n)return n(r,!0);throw new Error("Cannot find module '"+c+"'")}}var u=i[c]={exports:{}};e[c][0].call(u.exports,function(t){return o(e[c][1][t]||t)},u,u.exports,t,e,i,s)}return i[c].exports}for(var n="function"==typeof __require&&__require,c=0;c<s.length;c++)o(s[c]);return o}({Game:[function(t,e,i){"use strict";cc._RF.push(e,"ab51ca1Po9NL4ZTEXwtUSGU","Game"),cc.Class({extends:cc.Component,properties:{starPerfab:{default:null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,ground:{default:null,type:cc.Node},player:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label},scoreAudio:{default:null,type:cc.AudioClip},btnNode:{default:null,type:cc.Node},gameOverNode:{default:null,type:cc.Node},progressBar:{default:null,type:cc.ProgressBar},scoreFxPrefab:{default:null,type:cc.Prefab}},onLoad:function(){this.groundY=this.ground.y+this.ground.height/2,this.timer=0,this.starDuration=0,this.enabled=!1,this.progressBar.progress=1,this.scorePool=new cc.NodePool("ScoreFx")},start:function(){},onStartGame:function(){this.resetScore(),this.btnNode.x=3e3,this.gameOverNode.active=!1,this.enabled=!0,this.player.getComponent("Player").startMoveAt(cc.v2(0,this.groundY)),this.spawnNewStar()},update:function(t){this.timer>this.starDuration?this.gameOver():this.timer+=t},spawnNewStar:function(){var t=cc.instantiate(this.starPerfab);this.node.addChild(t),t.setPosition(this.getNewStarPosition()),t.getComponent("Star").game=this,this.starDuration=this.minStarDuration+Math.random()*(this.maxStarDuration-this.minStarDuration),this.timer=0,this.currentStar=t},getNewStarPosition:function(){var t,e=this.groundY+Math.random()*this.player.getComponent("Player").jumpHeight+50,i=this.node.width/2;return t=2*(Math.random()-.5)*i,cc.v2(t,e)},gainScore:function(t){var e=this.spawnScoreFx();this.node.addChild(e.node),e.node.setPosition(t),e.play(),this.score+=1,this.scoreDisplay.string="Score: "+this.score,cc.audioEngine.playEffect(this.scoreAudio,!1)},resetScore:function(){this.score=0,this.scoreDisplay.string="Score: "+this.score},gameOver:function(){this.player.getComponent("Player").stopMove(),this.currentStar.destroy(),this.btnNode.x=0,this.gameOverNode.active=!0},spawnScoreFx:function(){var t=void 0;return this.scorePool.size()>0?(t=this.scorePool.get()).getComponent("ScoreFx"):((t=cc.instantiate(this.scoreFxPrefab).getComponent("ScoreFx")).init(this),t)},despawnScoreFx:function(t){this.scorePool.put(t)}}),cc._RF.pop()},{}],Player:[function(t,e,i){"use strict";cc._RF.push(e,"f4ec4E+PUxP94UJjosNXVX9","Player"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,squashDuration:0,jumpAudio:{default:null,type:cc.AudioClip}},onLoad:function(){this.enabled=!1,this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.minPosX=-this.node.parent.width/2,this.maxPosX=this.node.parent.width/2,this.jumpAction=this.setJumpAction(),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},start:function(){},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t,this.node.x>this.maxPosX?(this.node.x=this.maxPosX,this.xSpeed=0):this.node.x<this.minPosX&&(this.node.x=this.minPosX,this.xSpeed=0)},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),i=cc.scaleTo(this.squashDuration,1,.6),s=cc.scaleTo(this.squashDuration,1,1.2),o=cc.scaleTo(this.squashDuration,1,1),n=cc.callFunc(this.playJumpSound,this);return cc.repeatForever(cc.sequence(i,s,t,o,e,n))},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.a:this.accLeft=!0;break;case cc.macro.KEY.d:this.accRight=!0}},onKeyUp:function(t){switch(t.keyCode){case cc.macro.KEY.a:this.accLeft=!1;break;case cc.macro.KEY.d:this.accRight=!1}},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},startMoveAt:function(t){this.enabled=!0,this.xSpeed=0,this.node.setPosition(t),this.node.runAction(this.setJumpAction())},stopMove:function(){this.enabled=!1,this.node.stopAllActions()}}),cc._RF.pop()},{}],ScoreAnim:[function(t,e,i){"use strict";cc._RF.push(e,"9dd12zrJvBFAY1NckbVKa4C","ScoreAnim"),cc.Class({extends:cc.Component,init:function(t){this.scoreFx=t},hideFx:function(){this.scoreFx.despawn()}}),cc._RF.pop()},{}],ScoreFx:[function(t,e,i){"use strict";cc._RF.push(e,"a69f34f5r5LcZ6ByRDDH1eA","ScoreFx"),cc.Class({extends:cc.Component,properties:{anim:{default:null,type:cc.Animation}},init:function(t){this.game=t,this.anim.getComponent("ScoreAnim").init(this)},despawn:function(){this.game.despawnScoreFx(this.node)},play:function(){this.anim.play("score_pop")}}),cc._RF.pop()},{}],Star:[function(t,e,i){"use strict";cc._RF.push(e,"595469254NKbrU7Clj5iLqb","Star"),cc.Class({extends:cc.Component,properties:{pickRadius:0},onLoad:function(){},start:function(){},update:function(){this.getPlayerDistance()<this.pickRadius&&this.onPicked();var t=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*t);var e=this.game.progressBar,i=e.progress;i=1-this.game.timer/this.game.starDuration,e.progress=i},getPlayerDistance:function(){var t=this.game.player.getPosition();return this.node.position.sub(t).mag()},onPicked:function(){this.game.spawnNewStar();var t=this.node.getPosition();this.game.gainScore(t),this.node.destroy()}}),cc._RF.pop()},{}]},{},["Game","Player","ScoreAnim","ScoreFx","Star"]);