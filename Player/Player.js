/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("geometry-01", "./Player/costumes/geometry-01.png", {
        x: 26,
        y: 26
      }),
      new Costume("cubeFly", "./Player/costumes/cubeFly.svg", { x: 17, y: 17 }),
      new Costume("cubeFly3", "./Player/costumes/cubeFly3.svg", {
        x: 17,
        y: 17
      }),
      new Costume("geometry-3", "./Player/costumes/geometry-3.png", {
        x: 26,
        y: 26
      }),
      new Costume("cubeFly2", "./Player/costumes/cubeFly2.svg", {
        x: 19,
        y: 18
      }),
      new Costume("geometry-2", "./Player/costumes/geometry-2.svg", {
        x: 13,
        y: 13
      })
    ];

    this.sounds = [
      new Sound("endStart_02.mp3", "./Player/sounds/endStart_02.mp3.wav")
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "reset level" },
        this.whenIReceiveResetLevel
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "END LOOP" },
        this.whenIReceiveEndLoop
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "game on" },
        this.whenIReceiveGameOn
      ),
      new Trigger(Trigger.KEY_PRESSED, { key: "l" }, this.whenKeyLPressed),
      new Trigger(Trigger.KEY_PRESSED, { key: "g" }, this.whenKeyGPressed),
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit)
    ];

    this.vars.jump = 0;
    this.vars.sy = 0;
    this.vars.myY = 0;
    this.vars.tile = 0;
    this.vars.tileidx = 208;
    this.vars.solid = 0;
    this.vars.die = 0;
    this.vars.t = 0;
    this.vars.ny = 182;
    this.vars.sx = 9;
    this.vars.spike = 0;
    this.vars.frame = 37;
    this.vars.nextsecond = 4;
    this.vars.fps = 30;
    this.vars.jumppress = 0;
    this.vars.GetDirection = 96.34019174591006;
    this.vars.shakeY = 0;
    this.vars.coins = 0;
    this.vars.background = 1;
    this.vars.maxX = 23002;
    this.vars.overridelag = 0;
    this.vars.bounceidx = 19516;
    this.vars.levelsBy = "griffpatch";
    this.vars.collect = [];
  }

  *orissolid(x, y) {
    if (y < 0) {
      this.vars.tileidx = -1;
      this.vars.tile = 3;
      this.vars.solid = this.stage.vars.tiletype[this.vars.tile - 1][1 - 1];
      this.vars.spike = 0;
    } else {
      this.vars.tileidx =
        Math.floor(x / 26) * this.stage.vars.lsy + Math.floor(y / 26);
      this.vars.tile = this.stage.vars.level[this.vars.tileidx - 1];
      if (this.vars.tile < 0) {
        this.vars.tileidx = 0 - this.vars.tile;
        this.vars.tile = this.stage.vars.level[this.vars.tileidx - 1];
      }
      this.vars.t = this.stage.vars.tiletype[this.vars.tile - 1][1 - 1];
      if (this.vars.t > this.vars.solid) {
        this.vars.solid = this.vars.t;
      }
    }
  }

  *getDirection(dx, dy) {
    if (dy == 0) {
      if (dx > 0) {
        this.vars.GetDirection = 90;
      } else {
        this.vars.GetDirection = -90;
      }
    } else {
      this.vars.GetDirection = this.radToScratch(Math.atan(dx / dy));
      if (dy < 0) {
        if (dx > 0) {
          this.vars.GetDirection += 180;
        } else {
          if (dx < 0) {
            this.vars.GetDirection += -180;
          } else {
            this.vars.GetDirection = 180;
          }
        }
      }
    }
  }

  *tickMode3End() {
    if (this.stage.vars.stars < 20) {
      if (this.stage.vars.quality > 0) {
        this.sprites["Stars"].createClone();
      }
    }
    if (this.stage.vars.playerX - this.stage.vars.scrollX < 40) {
      if (this.vars.sx > 3) {
        this.vars.sx = this.vars.sx * 0.8;
      }
    } else {
      this.vars.sx = this.vars.sx * 1.1;
    }
    this.direction += 15;
    if (this.stage.vars.playerX - this.stage.vars.scrollX < 240) {
      this.stage.vars.playerX += this.vars.sx;
      if (!(this.stage.vars.playerX - this.stage.vars.scrollX < 240)) {
        yield* this.recordScore();
        this.visible = false;
        this.broadcast("complete!");
      }
    }
  }

  *issolid(x2, y2) {
    if (y2 < 0) {
      this.vars.tileidx = -1;
      this.vars.tile = 3;
      this.vars.solid = this.stage.vars.tiletype[this.vars.tile - 1][1 - 1];
      this.vars.spike = 0;
    } else {
      if (this.stage.vars.mode == 2 && y2 > 26 * 10) {
        this.vars.tileidx = -1;
        this.vars.tile = 3;
        this.vars.solid = this.stage.vars.tiletype[this.vars.tile - 1][1 - 1];
        this.vars.spike = 0;
      } else {
        this.vars.tileidx =
          Math.floor(x2 / 26) * this.stage.vars.lsy + Math.floor(y2 / 26);
        this.vars.tile = this.stage.vars.level[this.vars.tileidx - 1];
        if (this.vars.tile < 0) {
          this.vars.tileidx = 0 - this.vars.tile;
          this.vars.tile = this.stage.vars.level[this.vars.tileidx - 1];
        }
        this.vars.solid = this.stage.vars.tiletype[this.vars.tile - 1][1 - 1];
        this.vars.t = this.stage.vars.tiletype[this.vars.tile - 1][2 - 1];
        if (this.vars.t > 0) {
          this.vars.spike = 1;
        } else {
          this.vars.spike = 0;
        }
      }
    }
  }

  *whenIReceiveResetLevel() {
    this.vars.jump = 5;
    this.stage.vars.scrollY = 0;
    this.stage.vars.playerX = 13;
    this.stage.vars.playerY = 0;
    this.vars.sx = 9;
    this.vars.sy = 0;
    this.vars.die = 0;
    this.vars.shakeY = 0;
    this.vars.nextsecond = 4;
    this.vars.frame = 0;
    this.vars.coins = 0;
    this.stage.vars.ticker = 0;
    this.stage.vars.score = 0;
    this.vars.collect = [];
    yield* this.setScroll();
    this.effects.ghost = 100;
    this.direction = 90;
    this.visible = true;
  }

  *whenIReceiveEndLoop() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *setModeBackground(mode2, bg) {
    this.vars.background = bg;
    if (mode2 == this.stage.vars.mode) {
      return;
    }
    this.stage.vars.mode = mode2;
    this.costume = mode2;
    if (mode2 < 3) {
      this.direction = 90;
    } else {
      yield* this.startSound("endStart_02.mp3");
    }
    this.vars.sy = 0;
  }

  *recordScore() {
    if (this.sprites["Editor"].vars["editor"] == -1) {
      if (this.stage.vars.score > this.stage.vars.yourBest) {
        this.stage.vars.yourBest = this.stage.vars.score;
      }
      this.stage.vars.points = this.stage.vars.score;
      this.broadcast("Store My High Score");
    }
  }

  *checkProgress() {
    if (this.sprites["Editor"].vars["level3"] == 1) {
      if (this.stage.vars.scrollX < 6582) {
        if (this.stage.vars.scrollX < 4033) {
          yield* this.setModeBackground(1, 2);
        } else {
          yield* this.setModeBackground(1, 3);
        }
      } else {
        if (this.stage.vars.scrollX < 7060) {
          yield* this.setModeBackground(1, 3);
          if (this.stage.vars.bright > -80) {
            this.stage.vars.bright += -1;
          }
        } else {
          if (this.stage.vars.scrollX < 11092) {
            yield* this.setModeBackground(2, 5);
            if (this.stage.vars.bright < 0) {
              this.stage.vars.bright += 10;
            }
          } else {
            if (this.stage.vars.scrollX < 20010) {
              if (this.stage.vars.scrollX < 13431) {
                yield* this.setModeBackground(1, 3);
              } else {
                yield* this.setModeBackground(1, 6);
              }
            } else {
              if (this.stage.vars.scrollX < this.vars.maxX) {
                yield* this.setModeBackground(2, 4);
              } else {
                yield* this.setModeBackground(3, 4);
              }
            }
          }
        }
      }
    } else {
      if (this.sprites["Editor"].vars["level3"] == 2) {
        if (this.stage.vars.scrollX < 11144) {
          if (this.stage.vars.scrollX < 3785) {
            yield* this.setModeBackground(1, 4);
          } else {
            yield* this.setModeBackground(1, 5);
          }
        } else {
          if (this.stage.vars.scrollX < 14581) {
            yield* this.setModeBackground(2, 2);
          } else {
            if (this.stage.vars.scrollX < this.vars.maxX) {
              if (this.stage.vars.scrollX < 18665) {
                yield* this.setModeBackground(1, 4);
              } else {
                yield* this.setModeBackground(1, 1);
              }
            } else {
              yield* this.setModeBackground(4, 1);
            }
          }
        }
      } else {
        if (this.stage.vars.scrollX < 2138) {
          yield* this.setModeBackground(1, 8);
        } else {
          if (this.stage.vars.scrollX < 8510) {
            if (this.stage.vars.scrollX < 5290) {
              yield* this.setModeBackground(1, 7);
            } else {
              yield* this.setModeBackground(1, 4);
            }
          } else {
            if (this.stage.vars.scrollX < 11647) {
              if (this.stage.vars.scrollX < 10851) {
                yield* this.setModeBackground(2, 4);
                if (this.stage.vars.bright > -100) {
                  this.stage.vars.bright += -5;
                }
              } else {
                yield* this.setModeBackground(2, 1);
                if (this.stage.vars.bright < 0) {
                  this.stage.vars.bright += 0.75;
                }
              }
            } else {
              if (this.stage.vars.scrollX < this.vars.maxX) {
                if (this.stage.vars.scrollX < 17980) {
                  yield* this.setModeBackground(1, 1);
                  if (this.stage.vars.bright < 0) {
                    this.stage.vars.bright += 20;
                  }
                } else {
                  if (this.stage.vars.scrollX < 21212) {
                    yield* this.setModeBackground(1, 1);
                    if (this.stage.vars.bright > -50) {
                      this.stage.vars.bright += -1;
                    }
                  } else {
                    yield* this.setModeBackground(1, 8);
                    if (this.stage.vars.bright < 0) {
                      this.stage.vars.bright += 20;
                    }
                  }
                }
              } else {
                yield* this.setModeBackground(4, 8);
              }
            }
          }
        }
      }
    }
  }

  *doDie() {
    if (
      this.sprites["Editor"].vars["editor"] < 0 ||
      this.keyPressed("down arrow")
    ) {
      this.vars.die = 1;
      this.stage.vars.scrollY += -10;
      this.vars.shakeY = 20;
      this.visible = false;
      for (let i = 0; i < 25; i++) {
        this.sprites["Particles"].createClone();
        yield;
      }
      this.sprites["Particles2"].createClone();
      this.broadcast("die");
      yield* this.recordScore();
    } else {
      this.vars.sy = 16;
      this.vars.shakeY = 32;
    }
  }

  *tickMode1Cube() {
    yield* this.issolid(this.stage.vars.playerX, this.stage.vars.playerY + 13);
    if (this.vars.tile == 68) {
      if (!this.vars.collect.includes(this.vars.tileidx)) {
        this.vars.coins += 1;
        this.vars.collect.push(this.vars.tileidx);
        this.broadcast("Collect");
      }
    }
    if (this.vars.tile == 74 || this.vars.tile == 80) {
      this.vars.sy = 20;
      this.vars.jump = 2000;
    }
    if (this.vars.jumppress == 1) {
      yield* this.airJump(
        this.stage.vars.playerX - 12,
        this.stage.vars.playerY + 12
      );
      yield* this.airJump(
        this.stage.vars.playerX + 12,
        this.stage.vars.playerY + 12
      );
      yield* this.airJump(
        this.stage.vars.playerX - 12,
        this.stage.vars.playerY - 12
      );
      yield* this.airJump(
        this.stage.vars.playerX + 12,
        this.stage.vars.playerY - 12
      );
    }
    yield* this.bounceJump(
      this.stage.vars.playerX,
      this.stage.vars.playerY + 6
    );
    yield* this.bounceJump(
      this.stage.vars.playerX + 13,
      this.stage.vars.playerY + 6
    );
    this.stage.vars.playerX += this.vars.sx;
    if (this.vars.die > 0) {
      this.stage.vars.playerY += this.vars.sy;
      if (this.vars.sx > 0.5) {
        this.vars.sx = this.vars.sx * 0.9;
      } else {
        this.vars.sx = 0;
      }
    } else {
      yield* this.issolid(
        this.stage.vars.playerX + 13,
        this.stage.vars.playerY
      );
      yield* this.orissolid(
        this.stage.vars.playerX + 13,
        this.stage.vars.playerY + 20
      );
      if (this.vars.solid > 0) {
        if (this.stage.vars.playerY % 26 > 14) {
          this.vars.ny = (Math.floor(this.stage.vars.playerY / 26) + 1) * 26;
          yield* this.issolid(this.stage.vars.playerX + 13, this.vars.ny);
          yield* this.orissolid(
            this.stage.vars.playerX + 13,
            this.vars.ny + 20
          );
          if (this.vars.solid > 0) {
            yield* this.doDie();
          } else {
            this.stage.vars.playerY = this.vars.ny - (this.vars.sy - 3);
          }
        } else {
          yield* this.doDie();
        }
      }
      if (this.vars.die > 0) {
        this.stage.vars.playerX =
          Math.floor((this.stage.vars.playerX + 13) / 26) * 26 - 13;
      } else {
        if (this.vars.jump > 2) {
          0;
        } else {
          if (this.vars.jumppress > 0) {
            this.vars.jump = 501;
            this.vars.sy = 23;
          }
        }
        if (this.vars.jump < 2000) {
          if (this.vars.sy < 4) {
            this.vars.sy += -2.25;
          } else {
            this.vars.sy += -4;
          }
        } else {
          if (this.vars.jump < 2009) {
            if (this.vars.sy < 39) {
              this.vars.sy += 3;
            }
          } else {
            this.vars.sy = 18;
            this.vars.jump = 1000;
          }
        }
        this.stage.vars.playerY += this.vars.sy;
        if (this.vars.sy > 0) {
          yield* this.issolid(
            this.stage.vars.playerX - 12,
            this.stage.vars.playerY + 20
          );
          yield* this.orissolid(
            this.stage.vars.playerX + 12,
            this.stage.vars.playerY + 20
          );
          if (this.vars.solid > 0) {
            yield* this.doDie();
            return;
          } else {
            0;
          }
          this.vars.jump += 1;
        } else {
          yield* this.issolid(
            this.stage.vars.playerX - 12,
            this.stage.vars.playerY
          );
          yield* this.orissolid(
            this.stage.vars.playerX + 12,
            this.stage.vars.playerY
          );
          if (this.vars.solid > 0) {
            while (!!(this.vars.solid > 0)) {
              this.stage.vars.playerY =
                (Math.floor(this.stage.vars.playerY / 26) + 1) * 26;
              yield* this.issolid(
                this.stage.vars.playerX - 12,
                this.stage.vars.playerY
              );
              yield* this.orissolid(
                this.stage.vars.playerX + 12,
                this.stage.vars.playerY
              );
              yield;
            }
            this.vars.sy = 0;
            this.vars.jump = 0;
            if (this.stage.vars.quality > 0) {
              0;
            }
          } else {
            this.vars.jump += 1;
          }
        }
        if (this.vars.jump > 0) {
          this.direction += 15;
        } else {
          if (!(this.direction % 90 == 0)) {
            if (this.direction % 90 > 35) {
              this.direction += 90 - (this.direction % 90);
            } else {
              this.direction -= this.direction % 90;
            }
          }
        }
      }
      yield* this.issolid(
        this.stage.vars.playerX - 8,
        this.stage.vars.playerY + 13
      );
      yield* this.orissolid(
        this.stage.vars.playerX + 8,
        this.stage.vars.playerY + 13
      );
      if (this.vars.spike > 0) {
        yield* this.doDie();
      }
    }
  }

  *respawn() {
    this.stage.vars.scrollY = 0;
    this.vars.jump = 0;
    this.stage.vars.playerX = 13;
    this.stage.vars.playerY = 96;
    this.vars.sx = 9;
    this.vars.sy = 0;
    this.vars.die = 0;
    this.stage.vars.bright = 0;
    this.stage.vars.mode = 1;
    yield* this.setScroll();
    yield* this.broadcastAndWait("reset level");
    yield* this.broadcastAndWait("start music");
    this.costume = "geometry-01";
    this.visible = true;
  }

  *airJump(x3, y3) {
    yield* this.issolid(x3 + this.vars.sx, y3 + 8);
    if (this.vars.tile == 86) {
      this.stage.vars.playerY = (this.vars.tileidx % this.stage.vars.lsy) * 26;
      this.vars.sy = 22;
      this.vars.jump = 1000;
      this.vars.bounceidx = this.vars.tileidx;
      this.sprites["Particles2"].createClone();
    }
  }

  *bounceJump(x4, y4) {
    yield* this.issolid(x4, y4);
    if (this.vars.tile == 69) {
      this.vars.sy = 33;
      this.vars.jump = 1000;
    }
    if (this.vars.tile == 74 || this.vars.tile == 80) {
      this.vars.sy = 20;
      this.vars.jump = 2000;
    }
  }

  *tickMode2Fly() {
    if (this.stage.vars.stars < 20) {
      if (this.stage.vars.quality > 0) {
        this.sprites["Stars"].createClone();
      }
    }
    this.stage.vars.playerX += this.vars.sx;
    if (this.vars.die > 0) {
      if (this.vars.sx > 0.5) {
        this.vars.sx = this.vars.sx * 0.9;
      } else {
        this.vars.sx = 0;
      }
    } else {
      yield* this.issolid(
        this.stage.vars.playerX + 13,
        this.stage.vars.playerY + 1
      );
      yield* this.orissolid(
        this.stage.vars.playerX + 13,
        this.stage.vars.playerY + 1
      );
      yield* this.orissolid(
        this.stage.vars.playerX - 13,
        this.stage.vars.playerY + 24
      );
      yield* this.orissolid(
        this.stage.vars.playerX - 13,
        this.stage.vars.playerY + 24
      );
      if (this.vars.solid > 0) {
        yield* this.doDie();
        return;
      }
      if (this.vars.jumppress > 0) {
        this.vars.sy += 1.2;
        if (this.vars.sy > 9) {
          this.vars.sy = 9;
        }
      } else {
        this.vars.sy += -1;
        if (this.vars.sy < -9) {
          this.vars.sy = -9;
        }
      }
      this.stage.vars.playerY += this.vars.sy;
      yield* this.issolid(
        this.stage.vars.playerX - 12,
        this.stage.vars.playerY + 13
      );
      yield* this.orissolid(
        this.stage.vars.playerX + 12,
        this.stage.vars.playerY + 13
      );
      if (this.vars.spike > 0) {
        yield* this.doDie();
        return;
      }
      if (this.vars.sy > 0) {
        yield* this.issolid(
          this.stage.vars.playerX - 12,
          this.stage.vars.playerY + 25
        );
        yield* this.orissolid(
          this.stage.vars.playerX + 12,
          this.stage.vars.playerY + 25
        );
        if (this.vars.solid > 0) {
          while (!!(this.vars.solid > 0)) {
            this.stage.vars.playerY =
              (Math.floor((this.stage.vars.playerY + 25) / 26) - 1) * 26;
            yield* this.issolid(
              this.stage.vars.playerX - 12,
              this.stage.vars.playerY + 25
            );
            yield* this.orissolid(
              this.stage.vars.playerX + 12,
              this.stage.vars.playerY + 25
            );
            if (this.stage.vars.playerY < 0) {
              yield* this.doDie();
              return;
            }
            yield;
          }
          this.vars.sy = this.vars.sy * 0.5;
        } else {
          0;
        }
      } else {
        yield* this.issolid(
          this.stage.vars.playerX - 12,
          this.stage.vars.playerY
        );
        yield* this.orissolid(
          this.stage.vars.playerX + 12,
          this.stage.vars.playerY
        );
        if (this.vars.solid > 0) {
          while (!!(this.vars.solid > 0)) {
            this.stage.vars.playerY =
              (Math.floor(this.stage.vars.playerY / 26) + 1) * 26;
            yield* this.issolid(
              this.stage.vars.playerX - 12,
              this.stage.vars.playerY
            );
            yield* this.orissolid(
              this.stage.vars.playerX + 12,
              this.stage.vars.playerY
            );
            if (this.stage.vars.playerY > 800) {
              yield* this.doDie();
              return;
            }
            yield;
          }
          this.vars.sy = this.vars.sy * 0.5;
        } else {
          0;
        }
      }
      if (this.vars.jump > 0) {
        this.direction += 15;
      } else {
        if (!(this.direction % 90 == 0)) {
          if (this.direction % 90 < 45) {
            this.direction -= this.direction % 90;
          } else {
            this.direction += 90 - (this.direction % 90);
          }
        }
      }
      yield* this.issolid(
        this.stage.vars.playerX,
        this.stage.vars.playerY + 13
      );
      if (this.vars.tile == 68) {
        if (!this.vars.collect.includes(this.vars.tileidx)) {
          this.vars.coins += 1;
          this.vars.collect.push(this.vars.tileidx);
          this.broadcast("Collect");
        }
      }
      yield* this.getDirection(this.vars.sx, this.vars.sy);
      this.direction = this.vars.GetDirection;
    }
  }

  *whenIReceiveGameOn() {
    if (this.sprites["Editor"].vars["level3"] == 1) {
      this.vars.maxX = 23002;
    } else {
      if (this.sprites["Editor"].vars["level3"] == 2) {
        this.vars.maxX = 21762;
      } else {
        this.vars.maxX = 24051;
      }
    }
    this.direction = 90;
    /* TODO: Implement looks_gotofrontback */ null;
    yield* this.respawn();
    this.vars.frame = 0;
    this.vars.fps = 0;
    this.vars.nextsecond = this.timer + 4;
    this.stage.vars.mode = 1;
    /* TODO: Implement data_hidevariable */ null;
    /* TODO: Implement data_showvariable */ null;
    /* TODO: Implement data_hidevariable */ null;
    /* TODO: Implement data_showvariable */ null;
    /* TODO: Implement data_hidevariable */ null;
    yield* this.broadcastAndWait("snap out of black");
    while (true) {
      this.stage.vars.ticker += 1;
      if (this.vars.die == 0) {
        this.stage.vars.score =
          Math.round(this.stage.vars.playerX / 26) + this.vars.coins * 25;
      }
      if (this.timer > this.vars.nextsecond && this.stage.vars.mode < 3) {
        this.vars.nextsecond += 4;
        this.vars.fps = Math.round(this.vars.frame / 4);
        this.vars.frame = 0;
        if (this.vars.overridelag == 0) {
          if (this.vars.fps < 28) {
            /* TODO: Implement data_showvariable */ null;
            this.stage.vars.quality = 0;
          }
          if (this.vars.fps > 29) {
            /* TODO: Implement data_hidevariable */ null;
            this.stage.vars.quality = 1;
          }
        }
      }
      this.vars.frame += 1;
      if (this.keyPressed(0) || (this.mouse.down && this.mouse.y < 178)) {
        this.vars.jumppress += 1;
      } else {
        if (this.keyPressed("space") || this.keyPressed("w")) {
          this.vars.jumppress += 1;
        } else {
          if (this.keyPressed("up arrow")) {
            this.vars.jumppress += 1;
          } else {
            this.vars.jumppress = 0;
          }
        }
      }
      if (this.vars.die > 0) {
        this.vars.die += 1;
        if (
          (this.vars.die > 25 && this.vars.jumppress > 0) ||
          this.vars.die > 50
        ) {
          yield* this.respawn();
        }
      }
      yield* this.checkProgress();
      if (this.keyPressed("p")) {
        this.stopAllSounds();
        while (!!this.keyPressed("p")) {
          yield;
        }
        while (
          !(
            this.keyPressed("p") ||
            (this.keyPressed("z") && this.keyPressed("m"))
          )
        ) {
          yield;
        }
        if (this.keyPressed("p")) {
          while (!!this.keyPressed("p")) {
            yield;
          }
          this.broadcast("start music");
        } else {
          yield* this.broadcastAndWait("level editor");
          yield* this.outOfEditor();
        }
      }
      if (this.keyPressed("z") && this.keyPressed("m")) {
        this.stopAllSounds();
        yield* this.broadcastAndWait("level editor");
        yield* this.outOfEditor();
      }
      if (this.stage.vars.mode == 1) {
        yield* this.tickMode1Cube();
      } else {
        if (this.stage.vars.mode == 2) {
          yield* this.tickMode2Fly();
        } else {
          yield* this.tickMode3End();
        }
      }
      yield* this.setScroll();
      this.goto(
        this.stage.vars.playerX - this.stage.vars.scrollX,
        this.stage.vars.playerY - this.stage.vars.scrollY - 63
      );
      if (this.stage.vars.playerX < 140) {
        this.effects.ghost += -10;
      }
      yield* this.broadcastAndWait("tick");
      yield;
    }
  }

  *whenKeyLPressed() {
    this.vars.overridelag = 1;
    this.stage.vars.quality = 1 - this.stage.vars.quality;
    /* TODO: Implement data_showvariable */ null;
    yield* this.wait(1);
    /* TODO: Implement data_hidevariable */ null;
  }

  *outOfEditor() {
    this.vars.die = 0;
    this.vars.sx = 9;
    this.vars.sy = 0;
    this.vars.nextsecond = this.timer + 4;
    this.vars.frame = 0;
    this.visible = true;
    this.effects.ghost = 0;
  }

  *whenKeyGPressed() {
    yield* this.issolid(this.stage.vars.playerX, 8 * 26);
    this.stage.vars.level.splice(this.vars.tileidx - 1, 1, 2);
  }

  *setScroll() {
    if (this.stage.vars.playerX < 140) {
      this.stage.vars.scrollX = 240;
    } else {
      if (this.stage.vars.playerX > this.vars.maxX - 100) {
        this.stage.vars.scrollX = this.vars.maxX;
      } else {
        this.stage.vars.scrollX = this.stage.vars.playerX + 100;
      }
    }
    if (this.vars.die == 0) {
      if (this.stage.vars.mode == 1) {
        if (this.stage.vars.scrollY > this.stage.vars.playerY - 20) {
          this.stage.vars.scrollY +=
            (this.stage.vars.playerY - 20 - this.stage.vars.scrollY) * 0.2;
          if (this.stage.vars.scrollY < 0) {
            this.stage.vars.scrollY = 0;
          }
        } else {
          if (this.stage.vars.playerY > this.stage.vars.scrollY + 126) {
            this.stage.vars.scrollY +=
              (this.stage.vars.playerY - (this.stage.vars.scrollY + 126)) * 0.2;
          }
        }
      } else {
        this.stage.vars.scrollY += (55 - this.stage.vars.scrollY) * 0.2;
      }
    } else {
      0;
    }
    this.stage.vars.scrollY += this.vars.shakeY;
    this.vars.shakeY = -0.7 * this.vars.shakeY;
  }

  *whenIReceiveInit() {
    this.vars.levelsBy = "griffpatch";
    this.size = 100;
    this.goto(-80, -68);
    this.audioEffects.volume = 100;
    this.direction = 90;
    this.stage.vars.yourBest = 0;
    this.stage.vars.quality = 1;
    /* TODO: Implement data_hidevariable */ null;
    /* TODO: Implement data_hidevariable */ null;
    /* TODO: Implement data_hidevariable */ null;
    this.vars.background = 1;
    this.vars.overridelag = 0;
  }
}
