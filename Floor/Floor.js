/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Floor extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("floor-fade", "./Floor/costumes/floor-fade.svg", {
        x: 480,
        y: 0
      }),
      new Costume("big floor", "./Floor/costumes/big floor.svg", {
        x: 341,
        y: 1
      }),
      new Costume("big floor2", "./Floor/costumes/big floor2.svg", {
        x: 449,
        y: 1
      }),
      new Costume("big floor3", "./Floor/costumes/big floor3.svg", {
        x: 341,
        y: 1
      }),
      new Costume("big floor4", "./Floor/costumes/big floor4.svg", {
        x: 449,
        y: 1
      }),
      new Costume("big floor5", "./Floor/costumes/big floor5.svg", {
        x: 341,
        y: 1
      })
    ];

    this.sounds = [new Sound("pop", "./Floor/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(
        Trigger.BROADCAST,
        { name: "front3" },
        this.whenIReceiveFront3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      )
    ];

    this.vars.myX3 = 0;
    this.vars.myY3 = -76;
    this.vars.tileidx3 = 0;
    this.vars.typ5 = 0;
    this.vars.vis2 = 1;
  }

  *whenIReceiveTick() {
    if (this.stage.vars.mode == 1) {
      yield* this.position(
        (Math.round(this.vars.myX3 - this.stage.vars.scrollX) % 480) - 240,
        Math.round(this.vars.myY3 - this.stage.vars.scrollY)
      );
    } else {
      if (this.vars.vis2 == 1) {
        this.vars.vis2 = 0;
        this.visible = false;
      }
    }
  }

  *whenIReceiveInit() {
    this.costume = "floor-fade";
    this.vars.typ5 = 0;
    this.vars.myX3 = 0;
    this.vars.tileidx3 = 0;
    this.vars.myY3 = 26 * 3 - 154;
    this.vars.vis2 = 1;
    this.visible = true;
  }

  *position(x13, y12) {
    this.goto(x13, y12);
    if (y12 == this.y) {
      if (this.vars.vis2 == 0) {
        this.vars.vis2 = 1;
        this.visible = true;
      }
    } else {
      if (this.vars.vis2 == 1) {
        this.vars.vis2 = 0;
        this.visible = false;
      }
    }
  }

  *whenIReceiveFront3() {
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }

  *whenIReceiveResetLevel() {
    this.costume = "floor-fade";
    this.vars.myX3 = 13;
  }
}
