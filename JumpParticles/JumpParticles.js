/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class JumpParticles extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("jump", "./JumpParticles/costumes/jump.svg", { x: 4, y: 4 }),
      new Costume("jet", "./JumpParticles/costumes/jet.svg", { x: 7, y: 4 }),
      new Costume("jet2", "./JumpParticles/costumes/jet2.svg", { x: 16, y: 4 })
    ];

    this.sounds = [new Sound("pop", "./JumpParticles/sounds/pop.wav")];

    this.triggers = [
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
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.x11 = 335.41633520880004;
    this.vars.y10 = -4.812280410000001;
    this.vars.sx4 = 2.8054450696;
    this.vars.sy4 = 2.39590653;
    this.vars.typ4 = 0;
    this.vars.siz3 = 0;
    this.vars.id = 8;
    this.vars.GetDirection2 = 90;
  }

  *init() {
    this.vars.typ4 = 0;
    this.vars.id = 0;
    for (let i = 0; i < 8; i++) {
      this.createClone();
      this.vars.id += 1;
      yield;
    }
  }

  *whenIReceiveResetLevel() {}

  *whenIReceiveFront4() {
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }

  *tick() {
    if (this.vars.typ4 > 8) {
      this.visible = false;
      this.vars.typ4 = 0;
      return;
    }
    this.vars.typ4 += 1;
    this.vars.x11 += this.vars.sx4;
    this.vars.y10 += this.vars.sy4;
    this.goto(
      this.vars.x11 - this.stage.vars.scrollX,
      this.vars.y10 - this.stage.vars.scrollY - 63
    );
    this.effects.ghost += 7;
  }

  *getDirection(dx2, dy2) {
    if (dy2 == 0) {
      if (dx2 > 0) {
        this.vars.GetDirection2 = 90;
      } else {
        this.vars.GetDirection2 = -90;
      }
    } else {
      this.vars.GetDirection2 = this.radToScratch(Math.atan(dx2 / dy2));
      if (dy2 < 0) {
        if (dx2 > 0) {
          this.vars.GetDirection2 += 180;
        } else {
          if (dx2 < 0) {
            this.vars.GetDirection2 += -180;
          } else {
            this.vars.GetDirection2 = 180;
          }
        }
      }
    }
  }

  *startAsClone() {
    this.vars.siz3 = this.random(20, 75);
    this.size = this.vars.siz3;
  }

  *whenIReceiveInit() {
    this.visible = false;
    yield* this.init();
  }

  *spawn(x12, y11, spd3, ang3) {
    this.vars.x11 = x12;
    this.vars.y10 = y11;
    this.vars.sx4 = spd3 * Math.sin(this.scratchToRad(ang3)) + 1;
    this.vars.sy4 = spd3 * Math.cos(this.scratchToRad(ang3));
    this.vars.typ4 = 1;
  }

  *whenIReceiveTick() {
    if (this.vars.typ4 > 0) {
      yield* this.tick();
    } else {
      if (this.stage.vars.ticker % 9 == this.vars.id) {
        if (
          this.stage.vars.quality > 0 &&
          this.sprites["Player"].vars["die"] == 0
        ) {
          if (
            this.stage.vars.mode == 1 &&
            this.sprites["Player"].vars["jump"] < 1001
          ) {
            if (this.sprites["Player"].vars["jump"] == 0) {
              if (!(this.costumeNumber == 1)) {
                this.direction = 90;
                this.costume = "jump";
              }
              yield* this.spawn(
                this.stage.vars.playerX - 10,
                this.stage.vars.playerY - 12,
                this.random(1, 4),
                this.random(-80, 80)
              );
              this.size = this.vars.siz3;
              this.effects.ghost = this.random(0, 40);
              this.visible = true;
              yield* this.tick();
            }
          } else {
            if (this.stage.vars.mode == 1 || this.stage.vars.mode == 4) {
              if (!(this.costumeNumber == 3)) {
                this.costume = "jet2";
              }
              yield* this.getDirection(
                this.sprites["Player"].vars["sx"],
                this.sprites["Player"].vars["sy"]
              );
              this.direction = this.vars.GetDirection2 + 0;
              yield* this.spawn(
                this.stage.vars.playerX,
                this.stage.vars.playerY + 4,
                0,
                0
              );
            } else {
              if (!(this.costumeNumber == 2)) {
                this.costume = "jet";
              }
              this.direction = this.sprites["Player"].direction;
              yield* this.spawn(
                this.stage.vars.playerX -
                  22 * Math.sin(this.scratchToRad(this.direction - 16)),
                this.stage.vars.playerY -
                  22 * Math.cos(this.scratchToRad(this.direction - 16)),
                0,
                0
              );
            }
            this.vars.sx4 = 0;
            this.size = 100;
            this.effects.ghost = 40;
            this.visible = true;
            yield* this.tick();
          }
        }
      }
    }
  }
}
