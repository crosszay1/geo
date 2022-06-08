/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class LeftFade extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("blue1", "./LeftFade/costumes/blue1.svg", { x: 240, y: 180 }),
      new Costume("blue2", "./LeftFade/costumes/blue2.svg", { x: 240, y: 180 }),
      new Costume("purple", "./LeftFade/costumes/purple.svg", {
        x: 240,
        y: 180
      }),
      new Costume("pink", "./LeftFade/costumes/pink.svg", { x: 240, y: 180 }),
      new Costume("pink2", "./LeftFade/costumes/pink2.svg", { x: 240, y: 180 }),
      new Costume("red", "./LeftFade/costumes/red.svg", { x: 240, y: 180 }),
      new Costume("yellow", "./LeftFade/costumes/yellow.svg", {
        x: 240,
        y: 180
      }),
      new Costume("green", "./LeftFade/costumes/green.svg", { x: 240, y: 180 }),
      new Costume("left-fade2", "./LeftFade/costumes/left-fade2.png", {
        x: 35,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./LeftFade/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "front1" },
        this.whenIReceiveFront1
      )
    ];

    this.vars.myBright4 = 0;
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
  }

  *whenIReceiveTick() {
    if (!(this.vars.myBright4 == this.stage.vars.bright)) {
      this.effects.brightness = this.stage.vars.bright;
      this.vars.myBright4 = this.stage.vars.bright;
    }
    if (!(this.costumeNumber == this.sprites["Player"].vars["background"])) {
      this.costume = this.sprites["Player"].vars["background"];
    }
  }

  *whenIReceiveResetLevel() {
    this.costume = "left fade";
  }

  *whenIReceiveFront1() {
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }
}
