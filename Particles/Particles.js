/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Particles extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("particle", "./Particles/costumes/particle.svg", {
        x: 4,
        y: 4
      })
    ];

    this.sounds = [new Sound("pop", "./Particles/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "front4" },
        this.whenIReceiveFront4
      )
    ];

    this.vars.x7 = 0;
    this.vars.y6 = 0;
    this.vars.sx2 = 0;
    this.vars.sy2 = 0;
    this.vars.typ2 = 0;
    this.vars.siz = 0;
  }

  *whenIReceiveInit() {
    this.vars.typ2 = 0;
    this.visible = false;
  }

  *spawn(x8, y7, spd, ang) {
    this.vars.x7 = x8;
    this.vars.y6 = y7;
    this.vars.sx2 = spd * Math.sin(this.scratchToRad(ang));
    this.vars.sy2 = spd * Math.cos(this.scratchToRad(ang));
    this.vars.typ2 = 1;
    this.vars.siz = 130 / ((spd - 0.3) / 11 + 1);
  }

  *whenIReceiveTick() {
    if (this.vars.typ2 > 0) {
      if (this.vars.typ2 == 1) {
        this.size = this.vars.siz;
        this.effects.ghost = this.random(0, 40);
        this.visible = true;
      } else {
        if (this.vars.typ2 > 22) {
          this.deleteThisClone();
        } else {
          0;
        }
      }
      this.vars.typ2 += 1;
      this.vars.x7 += this.vars.sx2;
      this.vars.y6 += this.vars.sy2;
      this.goto(
        this.vars.x7 - this.stage.vars.scrollX,
        this.vars.y6 - this.stage.vars.scrollY - 63
      );
      this.effects.ghost += 3;
    }
  }

  *whenIReceiveResetLevel() {
    if (this.vars.typ2 > 0) {
      this.deleteThisClone();
    }
  }

  *startAsClone() {
    yield* this.spawn(
      this.stage.vars.playerX,
      this.stage.vars.playerY,
      this.random(0.3, 11),
      this.random(0, 359)
    );
  }

  *whenIReceiveFront4() {
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }
}
