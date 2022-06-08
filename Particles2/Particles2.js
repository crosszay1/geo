/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Particles2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("die", "./Particles2/costumes/die.svg", { x: 8, y: 8 }),
      new Costume("jump", "./Particles2/costumes/jump.svg", { x: 8, y: 8 })
    ];

    this.sounds = [new Sound("pop", "./Particles2/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "front4" },
        this.whenIReceiveFront4
      ),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.x9 = 0;
    this.vars.y8 = 0;
    this.vars.sx3 = 0;
    this.vars.sy3 = 0;
    this.vars.typ3 = 0;
    this.vars.siz2 = 0;
  }

  *whenIReceiveInit() {
    this.vars.typ3 = 0;
    this.size = 20;
    this.effects.ghost = 20;
    this.visible = false;
  }

  *whenIReceiveResetLevel() {
    if (this.vars.typ3 > 0) {
      this.deleteThisClone();
    }
  }

  *whenIReceiveFront4() {
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }

  *whenIReceiveTick() {
    if (this.vars.typ3 > 0) {
      if (this.vars.typ3 == 1) {
        if (this.costumeNumber == 1) {
          0;
        } else {
          this.size = 700;
          this.effects.ghost = 40;
        }
        this.visible = true;
      } else {
        if (this.vars.typ3 > 22) {
          this.deleteThisClone();
        } else {
          0;
        }
      }
      this.goto(
        this.vars.x9 - this.stage.vars.scrollX,
        this.vars.y8 - this.stage.vars.scrollY - 65
      );
      if (this.costumeNumber == 1) {
        this.vars.typ3 += 1;
        this.size += 80;
        this.effects.ghost += 5;
      } else {
        this.vars.typ3 += 1;
        this.size = this.size * 0.85;
        this.effects.ghost += 5;
      }
    }
  }

  *spawn(x10, y9, spd2, ang2) {
    this.vars.x9 = x10;
    this.vars.y8 = y9;
    this.vars.typ3 = 1;
    this.vars.siz2 = 100 / ((spd2 - 1) / 4 + 1);
  }

  *startAsClone() {
    if (this.sprites["Player"].vars["die"] > 0) {
      this.costume = "die";
      yield* this.spawn(this.stage.vars.playerX, this.stage.vars.playerY, 0, 0);
    } else {
      this.vars.y8 = this.sprites["Player"].vars["bounceidx"];
      this.costume = "jump";
      yield* this.spawn(
        Math.floor(this.vars.y8 / this.stage.vars.lsy) * 26 + 26,
        Math.floor(this.vars.y8 % this.stage.vars.lsy) * 26 - 13,
        0,
        0
      );
    }
  }
}
