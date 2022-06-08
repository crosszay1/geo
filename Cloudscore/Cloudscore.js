/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cloudscore extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Save-icon", "./Cloudscore/costumes/Save-icon.png", {
        x: 26,
        y: 25
      })
    ];

    this.sounds = [new Sound("pop", "./Cloudscore/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Show High Score Table" },
        this.whenIReceiveShowHighScoreTable
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Get Rank" },
        this.whenIReceiveGetRank
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over Menu" },
        this.whenIReceiveGameOverMenu
      ),
      new Trigger(Trigger.BROADCAST, { name: "init" }, this.whenIReceiveInit),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Store My High Score" },
        this.whenIReceiveStoreMyHighScore
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "game on" },
        this.whenIReceiveGameOn
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.i = "968   . .  griffpatch";
    this.vars.number = 753;
    this.vars.cIndex = 19;
    this.vars.ascii =
      "0123456789 abcdefghijklmnopqrstuvwxyz!\"£$%^&*()_+[]{};'#:@~,./<>?\\|`¬-";
    this.vars.text = "968   . .  griffpatch";
    this.vars.full = null;
    this.vars.c = "753   . .  ";
    this.vars.c2 = 6;
    this.vars.prevLength = 1;
    this.vars.backup = 0;
    this.vars.bestRank = 10;
    this.vars.found = 0;
    this.vars.bestScore = 968;
    this.vars.count2 = 499;
    this.vars.saving = 0;
    this.vars.temp = [];
    this.vars.scores = [];
    this.vars.users = [];
    this.vars.highScoreTable = [];
  }

  *whenIReceiveShowHighScoreTable() {
    yield* this.textToNumber(/* no username */ "");
    yield* this.numberToText(this.vars.number);
    yield* this.getScoreAndRanking(this.vars.text);
    yield* this.showHighScoreTable();
    if (this.vars.prevLength > 0) {
      this.vars.text = this.vars.highScoreTable[
        this.vars.highScoreTable.length - 1
      ];
      yield* this.wait(0);
      if (this.vars.prevLength > 8) {
        this.vars.text = this.vars.highScoreTable[this.vars.prevLength - 8 - 1];
      } else {
        this.vars.text = this.vars.highScoreTable[1 - 1];
      }
      yield* this.wait(0);
      this.vars.text = this.vars.highScoreTable[this.vars.prevLength - 1];
      yield* this.wait(0.1);
      for (let i = 0; i < 2; i++) {
        this.vars.highScoreTable.splice(
          this.vars.prevLength - 1,
          1,
          this.vars.text
        );
        yield* this.wait(0.4);
        this.vars.highScoreTable.splice(
          this.vars.prevLength - 1,
          1,
          "" + this.vars.text + "   <==="
        );
        yield* this.wait(0.5);
        yield;
      }
    } else {
      this.vars.text = this.vars.highScoreTable[1 - 1];
    }
  }

  *showHighScoreTable() {
    /* TODO: Implement data_hidelist */ null;
    this.vars.highScoreTable = [];
    this.vars.prevLength = 0;
    this.vars.i = 1;
    for (let i = 0; i < this.vars.users.length; i++) {
      this.vars.text = this.vars.users[this.vars.i - 1];
      if (this.vars.text == /* no username */ "") {
        this.vars.prevLength = this.vars.i;
      }
      this.vars.c = this.vars.scores[this.vars.i - 1];
      if (this.vars.c.length == 1) {
        this.vars.c = "" + this.vars.c + "   . . .  ";
      } else {
        if (this.vars.c.length == 2) {
          this.vars.c = "" + this.vars.c + "  . . .  ";
        } else {
          this.vars.c = "" + this.vars.c + "   . .  ";
        }
      }
      this.vars.highScoreTable.push("" + this.vars.c + this.vars.text);
      this.vars.i += 1;
      yield;
    }
    this.vars.i = this.vars.highScoreTable[1 - 1];
    /* TODO: Implement data_showlist */ null;
  }

  *whenIReceiveGetRank() {
    yield* this.textToNumber(/* no username */ "");
    yield* this.numberToText(this.vars.number);
    yield* this.getScoreAndRanking(this.vars.text);
  }

  *recordScore(user, score2) {
    this.vars.temp = [];
    yield* this.getCloudList();
    this.vars.i = 1;
    this.vars.prevLength = 0;
    this.vars.found = 0;
    this.vars.count2 = 0;
    while (!(this.vars.i > this.vars.full.length || this.vars.count2 > 499)) {
      yield* this.readStringDump();
      yield* this.readNumberDump();
      if (this.vars.found == 0 && score2 > this.vars.number) {
        this.vars.found = 1;
        while (!(this.vars.temp.length == this.vars.prevLength)) {
          this.vars.temp.splice(this.vars.temp.length - 1, 1);
          yield;
        }
        yield* this.textDump(user);
        yield* this.numberDump(score2);
        if (!(user == this.vars.text)) {
          yield* this.textDump(this.vars.text);
          yield* this.numberDump(this.vars.number);
          this.vars.count2 += 1;
        }
      } else {
        if (user == this.vars.text) {
          if (this.vars.found == 0) {
            this.vars.found = 1;
          } else {
            while (!(this.vars.temp.length == this.vars.prevLength)) {
              this.vars.temp.splice(this.vars.temp.length - 1, 1);
              yield;
            }
          }
        }
      }
      this.vars.count2 += 1;
      this.vars.prevLength = this.vars.temp.length;
      yield;
    }
    if (this.vars.found == 0) {
      if (this.vars.count2 < 500) {
        yield* this.textDump(user);
        yield* this.numberDump(score2);
      } else {
        this.vars.temp = [];
        this.vars.count2 = 999999;
        return;
      }
    }
    yield* this.setCloudList();
    this.vars.temp = [];
  }

  *numberToText(num) {
    this.vars.text = 0;
    this.vars.i = 1;
    for (let i = 0; i < num.length / 2; i++) {
      this.vars.cIndex = "" + num[this.vars.i - 1] + num[this.vars.i + 1 - 1];
      this.vars.text =
        "" + this.vars.text + this.vars.ascii[this.vars.cIndex - 1];
      this.vars.i += 2;
      yield;
    }
  }

  *readStringDump() {
    yield* this.readNumberDump();
    this.vars.text = 0;
    for (let i = 0; i < this.vars.number; i++) {
      this.vars.c = this.vars.full[this.vars.i - 1];
      this.vars.temp.push(this.vars.c);
      this.vars.i += 1;
      this.vars.c2 = this.vars.full[this.vars.i - 1];
      this.vars.temp.push(this.vars.c2);
      this.vars.i += 1;
      this.vars.text =
        "" +
        this.vars.text +
        this.vars.ascii["" + this.vars.c + this.vars.c2 - 1];
      yield;
    }
  }

  *readString() {
    yield* this.readNumber();
    this.vars.text = 0;
    for (let i = 0; i < this.vars.number; i++) {
      this.vars.c = this.vars.full[this.vars.i - 1];
      this.vars.i += 1;
      this.vars.c2 = this.vars.full[this.vars.i - 1];
      this.vars.i += 1;
      this.vars.text =
        "" +
        this.vars.text +
        this.vars.ascii["" + this.vars.c + this.vars.c2 - 1];
      yield;
    }
  }

  *textDump(text2) {
    yield* this.numberDump(text2.length);
    this.vars.c2 = 1;
    for (let i = 0; i < text2.length; i++) {
      yield* this.getCharIndex(text2[this.vars.c2 - 1]);
      if (this.vars.cIndex < 10) {
        this.vars.temp.push(0);
        this.vars.temp.push(this.vars.cIndex[1 - 1]);
      } else {
        this.vars.temp.push(this.vars.cIndex[1 - 1]);
        this.vars.temp.push(this.vars.cIndex[2 - 1]);
      }
      this.vars.c2 += 1;
      yield;
    }
  }

  *numberDump(number2) {
    this.vars.temp.push(number2.length[1 - 1]);
    this.vars.c2 = 1;
    for (let i = 0; i < number2.length; i++) {
      this.vars.temp.push(number2[this.vars.c2 - 1]);
      this.vars.c2 += 1;
      yield;
    }
  }

  *safeSaveScore(codedUser, tries) {
    this.vars.saving = 1;
    /* TODO: Implement looks_gotofrontback */ null;
    if (tries > 1) {
      this.say("" + "Saving Score (try #" + ("" + tries + ")"));
    } else {
      0;
    }
    yield* this.recordScore(codedUser, this.vars.bestScore);
    if (this.vars.count2 > 9999) {
      this.visible = false;
      this.vars.saving = 0;
      this.broadcast("Score Done");
      return;
    }
    yield* this.wait(2);
    yield* this.getScoreAndRanking(codedUser);
    if (this.stage.vars.points == this.vars.bestScore) {
      this.say(0);
      this.visible = false;
      this.vars.saving = 0;
      this.broadcast("Score Done");
    } else {
      if (tries < 4) {
        yield* this.wait(this.random(0.5, 1.5));
        yield* this.safeSaveScore(codedUser, tries + 1);
      } else {
        /* TODO: Implement looks_gotofrontback */ null;
        yield* this.sayAndWait("Failed to save score :(", 4);
        this.visible = false;
        this.vars.saving = -1;
        this.broadcast("Score Done");
      }
    }
  }

  *whenIReceiveGameOverMenu() {
    if (this.stage.vars.points > this.vars.bestScore) {
      this.vars.bestScore = this.stage.vars.points;
      yield* this.textToNumber(/* no username */ "");
      yield* this.numberToText(this.vars.number);
      yield* this.safeSaveScore(this.vars.text, 1);
    }
    yield* this.broadcastAndWait("Clear Save Game");
    yield* this.broadcastAndWait("Show High Score Table");
    this.vars.temp = [];
    this.vars.scores = [];
    this.vars.users = [];
    this.vars.highScoreTable = [];
  }

  *whenIReceiveInit() {
    /* TODO: Implement data_hidelist */ null;
    this.vars.temp = [];
    this.vars.scores = [];
    this.vars.users = [];
    this.vars.highScoreTable = [];
    this.goto(217, -154);
  }

  *whenIReceiveStoreMyHighScore() {
    if (this.stage.vars.points > this.vars.bestScore) {
      this.visible = true;
      this.vars.bestScore = this.stage.vars.points;
      yield* this.textToNumber(/* no username */ "");
      yield* this.numberToText(this.vars.number);
      yield* this.safeSaveScore(this.vars.text, 1);
    } else {
      this.broadcast("Score Done");
    }
    this.vars.temp = [];
    this.vars.scores = [];
    this.vars.users = [];
    this.vars.highScoreTable = [];
  }

  *trim(count3) {
    yield* this.getScoreAndRanking(/* no username */ "");
    yield* this.showHighScoreTable();
    this.vars.temp = [];
    this.vars.i = 1;
    for (let i = 0; i < count3; i++) {
      yield* this.textDump(this.vars.users[this.vars.i - 1]);
      yield* this.numberDump(this.vars.scores[this.vars.i - 1]);
      this.vars.i += 1;
      yield;
    }
    yield* this.setCloudList();
    this.vars.temp = [];
  }

  *whenIReceiveGameOn() {
    this.say(0);
    /* TODO: Implement data_hidelist */ null;
  }

  *textToNumber(text3) {
    this.vars.i = 1;
    this.vars.number = 0;
    for (let i = 0; i < text3.length; i++) {
      yield* this.getCharIndex(text3[this.vars.i - 1]);
      if (this.vars.cIndex < 10) {
        this.vars.number = "" + this.vars.number + ("" + 0 + this.vars.cIndex);
      } else {
        this.vars.number = "" + this.vars.number + this.vars.cIndex;
      }
      this.vars.i += 1;
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.vars.saving = 0;
  }

  *getCharIndex(char) {
    this.vars.cIndex = this.vars.ascii.length;
    while (
      !(this.vars.cIndex < 1 || this.vars.ascii[this.vars.cIndex - 1] == char)
    ) {
      this.vars.cIndex += -1;
      yield;
    }
  }

  *getScoreAndRanking(user2) {
    this.vars.users = [];
    this.vars.scores = [];
    yield* this.getCloudList();
    this.vars.i = 1;
    this.vars.bestScore = 0;
    while (!(this.vars.i > this.vars.full.length)) {
      yield* this.readStringDump();
      this.vars.users.push(this.vars.text);
      yield* this.readNumberDump();
      this.vars.scores.push(this.vars.number);
      if (this.vars.text == user2) {
        this.vars.bestScore = this.vars.number;
      }
      yield;
    }
  }

  *readNumber() {
    this.vars.number = 0;
    this.vars.c = this.vars.full[this.vars.i - 1];
    for (let i = 0; i < this.vars.c; i++) {
      this.vars.i += 1;
      this.vars.c = this.vars.full[this.vars.i - 1];
      this.vars.number = "" + this.vars.number + this.vars.c;
      yield;
    }
    this.vars.i += 1;
  }

  *setCloudList() {
    if (this.sprites["Editor"].vars["level3"] == 1) {
      this.stage.vars.CloudList = this.vars.temp.join(" ");
    } else {
      if (this.sprites["Editor"].vars["level3"] == 2) {
        this.stage.vars.CloudList2 = this.vars.temp.join(" ");
      } else {
        this.stage.vars.CloudList3 = this.vars.temp.join(" ");
      }
    }
  }

  *getCloudList() {
    if (this.sprites["Editor"].vars["level3"] == 1) {
      this.vars.full = this.stage.vars.CloudList;
    } else {
      if (this.sprites["Editor"].vars["level3"] == 2) {
        this.vars.full = this.stage.vars.CloudList2;
      } else {
        this.vars.full = this.stage.vars.CloudList3;
      }
    }
  }

  *readNumberDump() {
    this.vars.number = 0;
    this.vars.c = this.vars.full[this.vars.i - 1];
    this.vars.temp.push(this.vars.c);
    for (let i = 0; i < this.vars.c; i++) {
      this.vars.i += 1;
      this.vars.c = this.vars.full[this.vars.i - 1];
      this.vars.temp.push(this.vars.c);
      this.vars.number = "" + this.vars.number + this.vars.c;
      yield;
    }
    this.vars.i += 1;
  }

  *deleteScore(user3) {
    this.vars.temp = [];
    yield* this.getCloudList();
    this.vars.i = 1;
    this.vars.prevLength = 0;
    this.vars.found = 0;
    this.vars.count2 = 0;
    while (!(this.vars.i > this.vars.full.length)) {
      yield* this.readStringDump();
      yield* this.readNumberDump();
      if (user3 == this.vars.text) {
        while (!(this.vars.temp.length == this.vars.prevLength)) {
          this.vars.temp.splice(this.vars.temp.length - 1, 1);
          yield;
        }
      }
      this.vars.count2 += 1;
      this.vars.prevLength = this.vars.temp.length;
      yield;
    }
    yield* this.setCloudList();
    this.vars.temp = [];
  }
}
