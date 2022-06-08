/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Level extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("blank", "./Level/costumes/blank.png", { x: 0, y: 0 }),
      new Costume("big floor", "./Level/costumes/big floor.svg", {
        x: 7,
        y: -5
      }),
      new Costume("geometry-01", "./Level/costumes/geometry-01.png", {
        x: 28,
        y: 2
      }),
      new Costume("geometry-02", "./Level/costumes/geometry-02.png", {
        x: 28,
        y: 2
      }),
      new Costume("geometry-04", "./Level/costumes/geometry-04.svg", {
        x: 15,
        y: 3
      }),
      new Costume("geometry-05", "./Level/costumes/geometry-05.svg", {
        x: 16,
        y: -11
      }),
      new Costume("geometry-03", "./Level/costumes/geometry-03.png", {
        x: 28,
        y: 2
      }),
      new Costume("blkFull3", "./Level/costumes/blkFull3.svg", {
        x: 240,
        y: 180
      }),
      new Costume("blkFull4", "./Level/costumes/blkFull4.svg", {
        x: 13,
        y: -10
      }),
      new Costume("blkFull5", "./Level/costumes/blkFull5.svg", {
        x: 14,
        y: -2
      }),
      new Costume("blkFull6", "./Level/costumes/blkFull6.svg", {
        x: 14,
        y: -5
      }),
      new Costume("blkFull7", "./Level/costumes/blkFull7.svg", { x: 13, y: 1 }),
      new Costume("geometry-06", "./Level/costumes/geometry-06.png", {
        x: 28,
        y: 2
      }),
      new Costume("geometry-22", "./Level/costumes/geometry-22.png", {
        x: 28,
        y: -8
      }),
      new Costume("geometry-21", "./Level/costumes/geometry-21.png", {
        x: 28,
        y: -8
      }),
      new Costume("geometry-23", "./Level/costumes/geometry-23.png", {
        x: 28,
        y: 2
      }),
      new Costume("geometry-24", "./Level/costumes/geometry-24.png", {
        x: 14,
        y: 2
      }),
      new Costume("geometry-25", "./Level/costumes/geometry-25.png", {
        x: 14,
        y: 2
      }),
      new Costume("geometry-08", "./Level/costumes/geometry-08.png", {
        x: 28,
        y: 2
      }),
      new Costume("geometry-09", "./Level/costumes/geometry-09.png", {
        x: 26,
        y: 2
      }),
      new Costume("geometry-10", "./Level/costumes/geometry-10.png", {
        x: 24,
        y: 2
      }),
      new Costume("geometry-11", "./Level/costumes/geometry-11.png", {
        x: 28,
        y: -10
      }),
      new Costume("geometry-13", "./Level/costumes/geometry-13.png", {
        x: 8,
        y: -14
      }),
      new Costume("geometry-12", "./Level/costumes/geometry-12.png", {
        x: 28,
        y: -10
      }),
      new Costume("geometry-14", "./Level/costumes/geometry-14.png", {
        x: 14,
        y: -18
      }),
      new Costume("geometry-15", "./Level/costumes/geometry-15.png", {
        x: 14,
        y: -12
      }),
      new Costume("geometry-16", "./Level/costumes/geometry-16.png", {
        x: 8,
        y: -18
      }),
      new Costume("geometry-19", "./Level/costumes/geometry-19.png", {
        x: 8,
        y: -18
      }),
      new Costume("geometry-20", "./Level/costumes/geometry-20.png", {
        x: 8,
        y: -18
      }),
      new Costume("geometry-17", "./Level/costumes/geometry-17.png", {
        x: 8,
        y: -18
      }),
      new Costume("geometry-18", "./Level/costumes/geometry-18.png", {
        x: 8,
        y: -18
      }),
      new Costume("geometry-26", "./Level/costumes/geometry-26.svg", {
        x: 80,
        y: 128
      }),
      new Costume("geometry-2", "./Level/costumes/geometry-2.png", {
        x: 26,
        y: 2
      }),
      new Costume("geometry-3", "./Level/costumes/geometry-3.png", {
        x: 28,
        y: -10
      }),
      new Costume("geometry-4", "./Level/costumes/geometry-4.png", {
        x: 8,
        y: -14
      }),
      new Costume("geometry-5", "./Level/costumes/geometry-5.png", {
        x: 14,
        y: -18
      }),
      new Costume("geometry-6", "./Level/costumes/geometry-6.png", {
        x: 14,
        y: 2
      }),
      new Costume("geometry-7", "./Level/costumes/geometry-7.svg", {
        x: 15,
        y: 1
      }),
      new Costume("geometry-8", "./Level/costumes/geometry-8.png", {
        x: 28,
        y: -8
      }),
      new Costume("geometry-9", "./Level/costumes/geometry-9.png", {
        x: 8,
        y: -18
      }),
      new Costume("geometry-27", "./Level/costumes/geometry-27.png", {
        x: 28,
        y: 2
      }),
      new Costume("geometry-29", "./Level/costumes/geometry-29.svg", {
        x: 8,
        y: 1
      }),
      new Costume("geometry-28", "./Level/costumes/geometry-28.svg", {
        x: 7,
        y: 1
      }),
      new Costume("geometry-30", "./Level/costumes/geometry-30.svg", {
        x: 6,
        y: 1
      }),
      new Costume("geometry-31", "./Level/costumes/geometry-31.svg", {
        x: 3,
        y: 1
      }),
      new Costume("geometry-32", "./Level/costumes/geometry-32.svg", {
        x: 2,
        y: 1
      }),
      new Costume("geometry-33", "./Level/costumes/geometry-33.svg", {
        x: 8,
        y: 14
      }),
      new Costume("geometry-34", "./Level/costumes/geometry-34.svg", {
        x: 7,
        y: 14
      }),
      new Costume("geometry-35", "./Level/costumes/geometry-35.svg", {
        x: 6,
        y: 14
      }),
      new Costume("geometry-36", "./Level/costumes/geometry-36.svg", {
        x: 3,
        y: 14
      }),
      new Costume("geometry-37", "./Level/costumes/geometry-37.svg", {
        x: 2,
        y: 14
      }),
      new Costume("geometry-38", "./Level/costumes/geometry-38.svg", {
        x: 8,
        y: 20
      }),
      new Costume("geometry-39", "./Level/costumes/geometry-39.svg", {
        x: 8,
        y: 20
      }),
      new Costume("geometry-40", "./Level/costumes/geometry-40.svg", {
        x: 6,
        y: 19
      }),
      new Costume("geometry-41", "./Level/costumes/geometry-41.svg", {
        x: 5,
        y: 17
      }),
      new Costume("geometry-42", "./Level/costumes/geometry-42.svg", {
        x: 2,
        y: 14
      }),
      new Costume("geometry-43", "./Level/costumes/geometry-43.svg", {
        x: 8,
        y: 36
      }),
      new Costume("blkFull8", "./Level/costumes/blkFull8.svg", {
        x: 13,
        y: -10
      }),
      new Costume("blkFull2", "./Level/costumes/blkFull2.svg", { x: 13, y: 1 }),
      new Costume("blkFull9", "./Level/costumes/blkFull9.svg", { x: 13, y: 2 }),
      new Costume("blkFull10", "./Level/costumes/blkFull10.svg", {
        x: 13,
        y: -1
      }),
      new Costume("geometry-44", "./Level/costumes/geometry-44.svg", {
        x: 15,
        y: 3
      }),
      new Costume("geometry-45", "./Level/costumes/geometry-45.svg", {
        x: 15,
        y: 1
      }),
      new Costume("geometry-46", "./Level/costumes/geometry-46.png", {
        x: 8,
        y: -18
      }),
      new Costume("geometry-47", "./Level/costumes/geometry-47.png", {
        x: 8,
        y: -18
      }),
      new Costume("geometry-48", "./Level/costumes/geometry-48.png", {
        x: 28,
        y: 2
      }),
      new Costume("geometry-49", "./Level/costumes/geometry-49.png", {
        x: 24,
        y: -2
      }),
      new Costume("secretCoin", "./Level/costumes/secretCoin.png", {
        x: 7,
        y: -18
      }),
      new Costume("geometry-50", "./Level/costumes/geometry-50.png", {
        x: 27,
        y: -2
      }),
      new Costume("geometry-51", "./Level/costumes/geometry-51.png", {
        x: 27,
        y: -10
      }),
      new Costume("geometry-52", "./Level/costumes/geometry-52.png", {
        x: 27,
        y: -12
      }),
      new Costume("geometry-53", "./Level/costumes/geometry-53.png", {
        x: 27,
        y: -14
      }),
      new Costume("geometry-54", "./Level/costumes/geometry-54.png", {
        x: 27,
        y: -10
      }),
      new Costume("geometry-56", "./Level/costumes/geometry-56.png", {
        x: 27,
        y: -2
      }),
      new Costume("geometry-57", "./Level/costumes/geometry-57.png", {
        x: 27,
        y: -10
      }),
      new Costume("geometry-58", "./Level/costumes/geometry-58.png", {
        x: 27,
        y: -12
      }),
      new Costume("geometry-59", "./Level/costumes/geometry-59.png", {
        x: 27,
        y: -14
      }),
      new Costume("geometry-60", "./Level/costumes/geometry-60.png", {
        x: 27,
        y: -10
      }),
      new Costume("hidden1", "./Level/costumes/hidden1.svg", { x: 65, y: -28 }),
      new Costume("bouncer01b", "./Level/costumes/bouncer01b.png", {
        x: 26,
        y: -2
      }),
      new Costume("bouncer02b", "./Level/costumes/bouncer02b.png", {
        x: 26,
        y: -10
      }),
      new Costume("bouncer03b", "./Level/costumes/bouncer03b.png", {
        x: 26,
        y: -12
      }),
      new Costume("bouncer04b", "./Level/costumes/bouncer04b.png", {
        x: 26,
        y: -14
      }),
      new Costume("bouncer05b", "./Level/costumes/bouncer05b.png", {
        x: 26,
        y: -10
      }),
      new Costume("hidden2", "./Level/costumes/hidden2.svg", { x: 15, y: -18 }),
      new Costume("geometry-65", "./Level/costumes/geometry-65.svg", {
        x: 0,
        y: -15
      }),
      new Costume("geometry-64", "./Level/costumes/geometry-64.svg", {
        x: -1,
        y: -16
      }),
      new Costume("geometry-62", "./Level/costumes/geometry-62.svg", {
        x: -1,
        y: -16
      }),
      new Costume("geometry-61", "./Level/costumes/geometry-61.svg", {
        x: -4,
        y: -19
      }),
      new Costume("geometry-63", "./Level/costumes/geometry-63.svg", {
        x: -6,
        y: -21
      }),
      new Costume("geometry-66", "./Level/costumes/geometry-66.svg", {
        x: 15,
        y: 3
      }),
      new Costume("geometry-55", "./Level/costumes/geometry-55.png", {
        x: 27,
        y: -40
      })
    ];

    this.sounds = [new Sound("pop", "./Level/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(
        Trigger.BROADCAST,
        { name: "release tiles" },
        this.whenIReceiveReleaseTiles
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Collect" },
        this.whenIReceiveCollect
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "redraw" },
        this.whenIReceiveRedraw
      ),
      new Trigger(Trigger.BROADCAST, { name: "tick" }, this.whenIReceiveTick)
    ];

    this.vars.myX2 = 13;
    this.vars.myY2 = 366;
    this.vars.tileidx2 = -1;
    this.vars.typ = 0;
    this.vars.linkid = 76;
    this.vars.vis = 0;
  }

  *whenIReceiveInit() {
    this.costume = "blank";
    this.size = 100;
    this.visible = false;
    this.vars.myX2 = 13;
    this.vars.tileidx2 = -1;
    this.vars.linkid = 0;
    this.stage.vars.sprlink = [];
    this.stage.vars.sprpool = [];
    yield* this.init();
  }

  *new() {
    while (!(this.vars.myX2 > this.stage.vars.scrollX + 260)) {
      this.vars.myY2 = -50;
      for (let i = 0; i < this.stage.vars.lsy; i++) {
        if (this.stage.vars.level[this.vars.tileidx2 - 1] > 1) {
          if (this.stage.vars.sprpool.length == 0) {
            /* TODO: Implement stop all */ null;
          } else {
            this.stage.vars.sprlink.splice(
              this.stage.vars.sprpool[1 - 1] - 1,
              1,
              this.vars.tileidx2
            );
            this.stage.vars.sprpool.splice(1 - 1, 1);
          }
        }
        this.vars.tileidx2 += 1;
        this.vars.myY2 += 26;
        yield;
      }
      this.vars.myX2 += 26;
      yield;
    }
  }

  *levelEditor() {
    this.goto(
      this.sprites["Editor"].vars["brushX"] * 26 - this.stage.vars.scrollX + 13,
      this.sprites["Editor"].vars["brushY"] * 26 - 50 - this.stage.vars.scrollY
    );
    if (!(this.costumeNumber == this.sprites["Editor"].vars["brush"])) {
      this.size = 100;
      this.costume = this.sprites["Editor"].vars["brush"];
    }
    this.visible = true;
  }

  *whenIReceiveReleaseTiles() {
    if (this.vars.typ == 0) {
      if (this.sprites["Editor"].vars["editor"] == 0) {
        this.visible = false;
      }
    } else {
      if (this.vars.tileidx2 > -1) {
        yield* this.releaseTile(0);
      }
    }
  }

  *position(x6, y5) {
    if (this.vars.vis == -1) {
      if (!(this.costumeNumber == this.vars.typ)) {
        this.costume = this.vars.typ;
      }
      this.vars.vis = 0;
    }
    this.goto(x6, y5);
    if (this.vars.vis > 1) {
      this.vars.vis += 3;
      this.vars.myY2 += 26 - this.vars.vis;
      if (this.vars.myY2 < -180) {
        yield* this.releaseTile(!0);
      }
    } else {
      if (this.x == x6 && this.y == y5) {
        if (this.vars.vis == 0) {
          this.vars.vis = 1;
          this.visible = true;
        }
        if (this.stage.vars.quality > 0) {
          if (
            this.vars.typ == 42 ||
            this.vars.typ == 47 || this.vars.typ == 52
          ) {
            yield* this.setCostume(Math.floor(((this.timer * 2.65) % 1) * 8));
          } else {
            if (
              this.vars.typ == 69 ||
              this.vars.typ == 74 || this.vars.typ == 80
            ) {
              this.costume =
                this.vars.typ + (Math.floor(this.stage.vars.ticker / 2) % 5);
            } else {
              if (this.vars.typ == 86) {
                if ((this.timer * 2.65) % 2 > 1) {
                  yield* this.setCostume(4);
                } else {
                  yield* this.setCostume(
                    Math.floor(((this.timer * 2.65) % 1) * 8)
                  );
                }
              } else {
                0;
              }
            }
          }
        }
      } else {
        if (this.vars.vis == 1) {
          this.vars.vis = 0;
          this.visible = false;
        }
      }
      if (this.x < -220) {
        if (this.x == x6) {
          0;
        } else {
          yield* this.releaseTile(!0);
        }
      }
    }
  }

  *setCostume(cost) {
    if (cost < 4) {
      this.costume = this.vars.typ + cost;
    } else {
      if (cost < 7) {
        this.costume = this.vars.typ + 4;
      } else {
        this.costume = this.vars.typ;
      }
    }
  }

  *whenIReceiveResetLevel() {
    if (this.vars.typ == 0) {
      this.vars.myX2 = Math.floor((this.stage.vars.scrollX - 320) / 26);
      if (this.vars.myX2 < 0) {
        this.vars.myX2 = 0;
      }
      this.vars.tileidx2 = this.vars.myX2 * this.stage.vars.lsy;
      this.vars.myX2 = this.vars.myX2 * 26 + 13;
      this.visible = false;
      this.costume = "blank";
    } else {
      if (this.vars.tileidx2 > -1) {
        yield* this.releaseTile(!0);
      }
    }
  }

  *releaseTile(now) {
    if (
      this.vars.linkid < 1 ||
      this.stage.vars.sprpool.includes(this.vars.linkid)
    ) {
      this.stage.vars.sprpool.push(this.vars.linkid);
      /* TODO: Implement stop all */ null;
    }
    this.vars.tileidx2 = -1;
    this.stage.vars.sprlink.splice(this.vars.linkid - 1, 1, 0);
    this.stage.vars.sprpool.push(this.vars.linkid);
    if (now) {
      this.vars.vis = -1;
      this.visible = false;
    } else {
      this.vars.vis = -2;
    }
  }

  *whenIReceiveCollect() {
    if (this.vars.typ == 68) {
      this.vars.vis = 2;
    }
  }

  *reuseTile() {
    this.vars.tileidx2 = this.stage.vars.sprlink[this.vars.linkid - 1];
    this.vars.typ = this.stage.vars.level[this.vars.tileidx2 - 1];
    if (this.vars.typ > 0) {
      this.vars.myX2 =
        Math.floor(this.vars.tileidx2 / this.stage.vars.lsy) * 26 + 13;
      this.vars.myY2 = (this.vars.tileidx2 % this.stage.vars.lsy) * 26 - 50;
      this.vars.vis = -1;
      yield* this.position(
        Math.round(this.vars.myX2 - this.stage.vars.scrollX),
        this.vars.myY2 - this.stage.vars.scrollY
      );
    } else {
      this.vars.typ = 1;
      yield* this.releaseTile(!0);
    }
  }

  *whenIReceiveRedraw() {
    if (this.vars.typ == 0) {
      this.vars.myX2 = Math.floor((this.stage.vars.scrollX - 320) / 26);
      this.vars.tileidx2 = this.vars.myX2 * this.stage.vars.lsy;
      this.vars.myX2 = this.vars.myX2 * 26 + 13;
      yield* this.new();
    } else {
      0;
    }
  }

  *whenIReceiveTick() {
    if (this.vars.typ == 0) {
      yield* this.new();
      if (this.sprites["Editor"].vars["editor"] > 0) {
        yield* this.levelEditor();
      }
    } else {
      if (this.vars.tileidx2 == -1) {
        if (this.stage.vars.sprlink[this.vars.linkid - 1] > 0) {
          yield* this.reuseTile();
        } else {
          if (this.vars.vis == -2) {
            this.visible = false;
            this.vars.vis = -1;
          }
        }
      } else {
        yield* this.position(
          Math.round(this.vars.myX2 - this.stage.vars.scrollX),
          Math.round(this.vars.myY2 - this.stage.vars.scrollY)
        );
      }
    }
  }

  *init() {
    this.visible = false;
    this.costume = "blank";
    this.vars.typ = 1;
    this.vars.linkid = 1;
    this.vars.vis = 0;
    for (let i = 0; i < 75; i++) {
      this.stage.vars.sprlink.push(0);
      this.stage.vars.sprpool.push(this.vars.linkid);
      this.createClone();
      this.vars.linkid += 1;
      yield;
    }
    this.vars.typ = 0;
  }
}
