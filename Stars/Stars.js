/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stars extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("particle", "./Stars/costumes/particle.svg", { x: 4, y: 4 })
    ];

    this.sounds = [new Sound("pop", "./Stars/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(
        Trigger.BROADCAST,
        { name: "front4" },
        this.whenIReceiveFront4
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "level editor" },
        this.whenIReceiveLevelEditor
      ),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.x15 = 0;
    this.vars.y14 = 0;
    this.vars.sx5 = 0;
    this.vars.sy5 = 0;
    this.vars.typ7 = 0;
    this.vars.siz4 = 0;
  }

  *whenIReceiveResetLevel() {
    if (this.vars.typ7 > 0) {
      this.deleteThisClone();
    }
  }

  *whenIReceiveInit() {
    this.vars.typ7 = 0;
    this.stage.vars.stars = 0;
    this.costume = "particle";
    this.visible = false;
  }

  *spawn(x16, y15, spd4, ang4) {
    this.vars.x15 = x16;
    this.vars.y14 = y15;
    this.vars.sx5 = spd4 * Math.sin(this.scratchToRad(ang4));
    this.vars.sy5 = spd4 * Math.cos(this.scratchToRad(ang4));
    this.vars.siz4 = 90 / ((spd4 - 0.2) / 0.8 + 1);
    if (this.stage.vars.mode > 2) {
      this.vars.sx5 = 1;
      this.vars.sy5 = 0;
    }
  }

  *whenIReceiveFront4() {
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }

  *startAsClone() {
    this.vars.typ7 = 1;
    this.stage.vars.stars += 1;
  }

  *whenIReceiveLevelEditor() {
    if (this.vars.typ7 > 0) {
      this.deleteThisClone();
    }
  }

  *whenIReceiveTick() {
    if (this.stage.vars.mode > 1) {
      if (this.vars.typ7 > 0) {
        if (this.vars.typ7 == 1) {
          yield* this.spawn(
            this.stage.vars.scrollX + this.random(-180, 270),
            this.stage.vars.scrollY + this.random(-100, 220),
            this.random(0.2, 0.8),
            this.random(0, 359)
          );
          this.size = this.vars.siz4;
          this.effects.ghost = this.random(0, 10);
          this.visible = true;
          this.vars.typ7 = this.random(1, 3);
        }
        this.vars.typ7 += 1;
        this.vars.x15 += this.vars.sx5;
        this.vars.y14 += this.vars.sy5;
        this.goto(
          this.vars.x15 - this.stage.vars.scrollX,
          this.vars.y14 - this.stage.vars.scrollY - 63
        );
        this.effects.ghost += 4;
        if (this.vars.typ7 > 25) {
          this.vars.typ7 = 1;
        }
        if (this.stage.vars.mode > 2) {
          this.vars.sx5 += (23260 - this.vars.x15) / 200;
          this.vars.sy5 += (120 - this.vars.y14) / 350;
          if (this.vars.x15 > 23260) {
            this.vars.typ7 = 1;
          }
        }
      }
    } else {
      if (this.vars.typ7 > 0) {
        this.deleteThisClone();
      } else {
        this.stage.vars.stars = 0;
      }
    }
  }
}
