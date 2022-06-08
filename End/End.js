/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class End extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("END", "./End/costumes/END.svg", { x: -215, y: 180 })
    ];

    this.sounds = [new Sound("pop", "./End/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(
        Trigger.BROADCAST,
        { name: "front4" },
        this.whenIReceiveFront4
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.x17 = 23002;
    this.vars.y16 = 0;
    this.vars.sx6 = 0;
    this.vars.sy6 = 0;
    this.vars.typ8 = 0;
    this.vars.siz5 = 0;
    this.vars.ending = 0;
  }

  *whenIReceiveInit() {
    this.vars.typ8 = 0;
    this.stage.vars.stars = 0;
    this.vars.ending = 0;
    this.costume = "END";
    this.visible = false;
  }

  *whenIReceiveFront4() {
    /* TODO: Implement looks_gotofrontback */ null;
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
  }

  *whenIReceiveResetLevel() {
    this.vars.x17 = this.sprites["Player"].vars["maxX"];
    this.visible = false;
  }

  *whenIReceiveTick() {
    if (this.vars.x17 - this.stage.vars.scrollX < 18) {
      this.vars.ending = 1;
      this.goto(this.vars.x17 - this.stage.vars.scrollX, 0);
      this.visible = true;
    }
  }
}
