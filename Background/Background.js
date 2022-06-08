/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Background extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("back-fade", "./Background/costumes/back-fade.svg", {
        x: 480,
        y: 180
      }),
      new Costume("back-fade-2", "./Background/costumes/back-fade-2.svg", {
        x: 480,
        y: 180
      })
    ];

    this.sounds = [new Sound("meow", "./Background/sounds/meow.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit)
    ];

    this.vars.myX = 0;
    this.vars.myBright2 = 0;
  }

  *whenIReceiveTick() {
    yield* this.position(
      (Math.floor(this.vars.myX - this.stage.vars.scrollX / 9) % 480) - 240
    );
  }

  *whenIReceiveResetLevel() {
    this.costume = "background";
  }

  *whenIReceiveInit() {
    this.goto(0, 0);
    this.costume = "back-fade-2";
    this.vars.myX = 0;
  }

  *position(x5) {
    this.x = x5;
  }
}
