/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Curtain extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("curtain", "./Curtain/costumes/curtain.png", {
        x: 480,
        y: 360
      }),
      new Costume("complete", "./Curtain/costumes/complete.svg", {
        x: 240,
        y: 180
      })
    ];

    this.sounds = [new Sound("pop", "./Curtain/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(
        Trigger.BROADCAST,
        { name: "complete!" },
        this.whenIReceiveComplete
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "fade to black" },
        this.whenIReceiveFadeToBlack
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "fade back in" },
        this.whenIReceiveFadeBackIn
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "snap out of black" },
        this.whenIReceiveSnapOutOfBlack
      )
    ];
  }

  *whenIReceiveInit() {
    this.costume = "curtain";
    this.visible = false;
  }

  *whenIReceiveComplete() {
    this.goto(0, 0);
    this.costume = "complete";
    /* TODO: Implement looks_gotofrontback */ null;
    this.effects.ghost = 100;
    this.visible = true;
    for (let i = 0; i < 50; i++) {
      this.effects.ghost += -2;
      yield;
    }
    yield* this.broadcastAndWait("END LOOP");
    yield* this.broadcastAndWait("reset level");
    yield* this.wait(4);
    while (!(this.sprites["Cloudscore"].vars["saving"] < 1)) {
      yield* this.wait(1);
      yield;
    }
    this.broadcast("Menu In");
  }

  *whenIReceiveFadeToBlack() {
    this.goto(0, 0);
    /* TODO: Implement looks_gotofrontback */ null;
    this.effects.ghost = 100;
    this.visible = true;
    for (let i = 0; i < 20; i++) {
      this.effects.ghost += -5;
      yield;
    }
  }

  *whenIReceiveFadeBackIn() {
    this.goto(0, 0);
    /* TODO: Implement looks_gotofrontback */ null;
    for (let i = 0; i < 20; i++) {
      this.effects.ghost += 5;
      yield;
    }
    this.visible = false;
    this.costume = "curtain";
  }

  *whenIReceiveSnapOutOfBlack() {
    this.visible = false;
  }
}
