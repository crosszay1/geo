/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Menu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("splash", "./Menu/costumes/splash.png", { x: 480, y: 360 }),
      new Costume("text", "./Menu/costumes/text.svg", {
        x: -40.052997500000004,
        y: 3.6215224999999975
      }),
      new Costume("border", "./Menu/costumes/border.svg", { x: 240, y: 180 }),
      new Costume("level1", "./Menu/costumes/level1.svg", { x: 960, y: 180 }),
      new Costume("title_l3", "./Menu/costumes/title_l3.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Menu/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "game on" },
        this.whenIReceiveGameOn
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Splash" },
        this.whenIReceiveSplash
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Menu In" },
        this.whenIReceiveMenuIn
      )
    ];

    this.vars.level2 = 1;
    this.vars.nx = 720;
    this.vars.mousedown = 0;
    this.vars.keydown = 0;
    this.vars.ofx = 1200;
  }

  *whenIReceiveGameOn() {
    this.deleteThisClone();
  }

  *loopTillStart() {
    this.vars.mousedown = 2;
    this.vars.keydown = 2;
    while (true) {
      if (this.mouse.down) {
        this.vars.mousedown += 1;
      } else {
        this.vars.mousedown = 0;
      }
      if (this.keyPressed("left arrow")) {
        if (this.vars.keydown == 0) {
          this.vars.level2 = ((this.vars.level2 - 2) % 3) + 1;
          yield* this.broadcastAndWait("Menu Level Change");
          this.broadcast("Show High Score Table");
          this.vars.keydown = 1;
        }
      } else {
        if (this.keyPressed("right arrow")) {
          if (this.vars.keydown == 0) {
            this.vars.level2 = (this.vars.level2 % 3) + 1;
            yield* this.broadcastAndWait("Menu Level Change");
            this.broadcast("Show High Score Table");
            this.vars.keydown = 1;
          }
        } else {
          this.vars.keydown = 0;
        }
      }
      this.vars.nx = this.vars.ofx - this.vars.level2 * 480;
      if (Math.abs(this.mouse.y - 20) < 40) {
        if (this.mouse.x > 200) {
          if (this.vars.mousedown == 1) {
            this.vars.level2 = (this.vars.level2 % 3) + 1;
            yield* this.broadcastAndWait("Menu Level Change");
            this.broadcast("Show High Score Table");
          }
          if (this.vars.level2 < 3) {
            this.vars.nx += -32;
          }
        } else {
          if (this.mouse.x < -200) {
            if (this.vars.mousedown == 1) {
              this.vars.level2 = ((this.vars.level2 - 2) % 3) + 1;
              yield* this.broadcastAndWait("Menu Level Change");
              this.broadcast("Show High Score Table");
            }
            if (this.vars.level2 > 1) {
              this.vars.nx += 32;
            }
          } else {
            0;
          }
        }
      }
      if (this.keyPressed("space")) {
        return;
      }
      if (this.vars.mousedown == 1) {
        if (Math.abs(this.mouse.x) < 175) {
          if (this.mouse.y > 30 && this.mouse.y < 160) {
            return;
          }
        }
      }
      this.x += (this.vars.nx - this.x) * 0.18;
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.scrollX = 240;
    this.goto(0, 0);
    this.costume = "splash";
    /* TODO: Implement looks_gotofrontback */ null;
    this.visible = true;
    yield* this.broadcastAndWait("init");
    /* TODO: Implement looks_gotofrontback */ null;
    yield* this.broadcastAndWait("front1");
    /* TODO: Implement looks_gotofrontback */ null;
    yield* this.broadcastAndWait("front2");
    /* TODO: Implement looks_gotofrontback */ null;
    yield* this.broadcastAndWait("front3");
    /* TODO: Implement looks_gotofrontback */ null;
    yield* this.broadcastAndWait("front4");
    /* TODO: Implement looks_gotofrontback */ null;
    this.broadcast("splash");
  }

  *whenIReceiveSplash() {
    this.costume = "splash";
    this.visible = true;
    /* TODO: Implement looks_gotofrontback */ null;
    while (!(this.timer > 2 || this.keyPressed("space"))) {
      yield;
    }
    while (!!this.keyPressed("space")) {
      yield;
    }
    yield* this.broadcastAndWait("fade to black");
    this.vars.level2 = 1;
    this.broadcast("Menu In");
  }

  *whenIReceiveMenuIn() {
    this.goto(0, 0);
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
    this.visible = true;
    this.costume = "border";
    this.createClone();
    this.costume = "text";
    this.createClone();
    this.costume = "level1";
    this.vars.ofx = 480 * 2.5;
    this.vars.nx = this.vars.ofx - this.vars.level2 * 480;
    this.goto(this.vars.nx, 0);
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
    yield* this.broadcastAndWait("Get Rank");
    this.stage.vars.yourBest = this.sprites["Cloudscore"].vars["bestScore"];
    yield* this.broadcastAndWait("fade back in");
    this.broadcast("Show High Score Table");
    while (!!(this.mouse.down || this.keyPressed("space"))) {
      yield;
    }
    this.vars.mousedown = 0;
    yield* this.loopTillStart();
    yield* this.broadcastAndWait("fade to black");
    this.visible = false;
    yield* this.broadcastAndWait("Get Rank");
    this.stage.vars.yourBest = this.sprites["Cloudscore"].vars["bestScore"];
    yield* this.broadcastAndWait("Load Level");
    this.broadcast("game on");
    return;
  }
}
