/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Crossfade extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("blue1", "./Crossfade/costumes/blue1.png", {
        x: 480,
        y: 360
      }),
      new Costume("blue2", "./Crossfade/costumes/blue2.png", {
        x: 480,
        y: 360
      }),
      new Costume("purple", "./Crossfade/costumes/purple.png", {
        x: 480,
        y: 360
      }),
      new Costume("pink", "./Crossfade/costumes/pink.png", { x: 480, y: 360 }),
      new Costume("pink2", "./Crossfade/costumes/pink2.png", {
        x: 480,
        y: 360
      }),
      new Costume("red", "./Crossfade/costumes/red.png", { x: 480, y: 360 }),
      new Costume("yellow", "./Crossfade/costumes/yellow.png", {
        x: 480,
        y: 360
      }),
      new Costume("green", "./Crossfade/costumes/green.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Crossfade/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(
        Trigger.BROADCAST,
        { name: "front4" },
        this.whenIReceiveFront4
      )
    ];

    this.vars.fade = 0;
  }

  *whenIReceiveInit() {
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
    this.goto(0, 0);
  }

  *whenIReceiveResetLevel() {
    this.vars.fade = 0;
    this.visible = false;
  }

  *whenIReceiveTick() {
    if (
      this.stage.vars.quality == 0 ||
      this.sprites["Editor"].vars["level3"] == 3
    ) {
      if (this.vars.fade > -1) {
        this.costume = this.sprites["Player"].vars["background"];
        this.effects.ghost = 0;
        this.vars.fade = -1;
        this.visible = false;
      }
    } else {
      if (this.vars.fade > 0) {
        this.vars.fade += -1;
        this.effects.ghost += 4;
        if (this.vars.fade < 1) {
          this.visible = false;
          this.costume = this.sprites["Player"].vars["background"];
          this.effects.ghost = 0;
        }
      } else {
        if (
          !(
            this.stage.costumeNumber ==
            this.sprites["Player"].vars["background"]
          )
        ) {
          if (this.stage.vars.ticker < 60) {
            this.visible = false;
            this.costume = this.sprites["Player"].vars["background"];
            this.effects.ghost = 0;
            this.vars.fade = 0;
          } else {
            this.vars.fade = 25;
            this.visible = true;
          }
        }
      }
    }
  }

  *whenIReceiveFront4() {
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }
}
