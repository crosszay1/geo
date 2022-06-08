/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class FloorGlow extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("blue", "./FloorGlow/costumes/blue.svg", { x: 240, y: 1 }),
      new Costume("blue2", "./FloorGlow/costumes/blue2.svg", { x: 240, y: 1 }),
      new Costume("purple", "./FloorGlow/costumes/purple.svg", {
        x: 240,
        y: 1
      }),
      new Costume("pink", "./FloorGlow/costumes/pink.svg", { x: 240, y: 1 }),
      new Costume("pink2", "./FloorGlow/costumes/pink2.svg", { x: 240, y: 1 }),
      new Costume("red", "./FloorGlow/costumes/red.svg", { x: 240, y: 1 }),
      new Costume("yellow", "./FloorGlow/costumes/yellow.svg", {
        x: 240,
        y: 1
      }),
      new Costume("green", "./FloorGlow/costumes/green.svg", { x: 240, y: 1 }),
      new Costume("fly zone", "./FloorGlow/costumes/fly zone.png", {
        x: 480,
        y: 360
      }),
      new Costume("big floor3", "./FloorGlow/costumes/big floor3.png", {
        x: 478,
        y: 2
      }),
      new Costume("big floor4", "./FloorGlow/costumes/big floor4.png", {
        x: 480,
        y: 2
      })
    ];

    this.sounds = [new Sound("pop", "./FloorGlow/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(
        Trigger.BROADCAST,
        { name: "front2" },
        this.whenIReceiveFront2
      )
    ];

    this.vars.myX4 = 13;
    this.vars.myY4 = -76;
    this.vars.tileidx4 = 0;
    this.vars.typ6 = 0;
    this.vars.vis3 = 1;
    this.vars.myBright3 = 0;
    this.vars.flyzone = 9;
  }

  *whenIReceiveInit() {
    this.costume = "fly zone";
    this.vars.flyzone = this.costumeNumber;
    this.costume = "big floor";
    this.visible = true;
  }

  *whenIReceiveTick() {
    if (this.stage.vars.mode == 1) {
      if (!(this.vars.myBright3 == this.stage.vars.bright)) {
        this.effects.brightness = this.stage.vars.bright;
        this.vars.myBright3 = this.stage.vars.bright;
      }
      if (!(this.costumeNumber == this.sprites["Player"].vars["background"])) {
        this.costume = this.sprites["Player"].vars["background"];
      }
      yield* this.position(0, Math.round(-76 - this.stage.vars.scrollY));
    } else {
      if (!(this.costumeNumber == this.vars.flyzone)) {
        this.costume = this.vars.flyzone;
      }
      yield* this.position(0, Math.round(55 - this.stage.vars.scrollY));
      if (!(this.vars.myBright3 == 0)) {
        this.effects.brightness = 0;
        this.vars.myBright3 = this.stage.vars.bright;
      }
    }
  }

  *whenIReceiveFront2() {
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }

  *position(x14, y13) {
    this.goto(x14, y13);
    if (y13 == this.y) {
      if (this.vars.vis3 == 0) {
        this.vars.vis3 = 1;
        this.visible = true;
      }
    } else {
      if (this.vars.vis3 == 1) {
        this.vars.vis3 = 0;
        this.visible = false;
      }
    }
  }
}
