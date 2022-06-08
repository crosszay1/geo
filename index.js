import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Blank from "./Blank/Blank.js";
import Player from "./Player/Player.js";
import Background from "./Background/Background.js";
import Level from "./Level/Level.js";
import Particles from "./Particles/Particles.js";
import Particles2 from "./Particles2/Particles2.js";
import JumpParticles from "./JumpParticles/JumpParticles.js";
import Floor from "./Floor/Floor.js";
import FloorGlow from "./FloorGlow/FloorGlow.js";
import LeftFade from "./LeftFade/LeftFade.js";
import Stars from "./Stars/Stars.js";
import End from "./End/End.js";
import Curtain from "./Curtain/Curtain.js";
import Menu from "./Menu/Menu.js";
import Editor from "./Editor/Editor.js";
import Cloudscore from "./Cloudscore/Cloudscore.js";
import Crossfade from "./Crossfade/Crossfade.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Blank: new Blank({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Player: new Player({
    x: -80,
    y: -68,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Background: new Background({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: true
  }),
  Level: new Level({
    x: 193,
    y: 181,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Particles: new Particles({
    x: -99,
    y: 33,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Particles2: new Particles2({
    x: -190,
    y: -30,
    direction: 90,
    costumeNumber: 1,
    size: 29.67359319159109,
    visible: false
  }),
  JumpParticles: new JumpParticles({
    x: -119.58366479119996,
    y: -67.81228041,
    direction: 90,
    costumeNumber: 1,
    size: 57.47126562779011,
    visible: false
  }),
  Floor: new Floor({
    x: -202,
    y: -76,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  FloorGlow: new FloorGlow({
    x: 0,
    y: -76,
    direction: 90,
    costumeNumber: 9,
    size: 100,
    visible: true
  }),
  LeftFade: new LeftFade({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: true
  }),
  Stars: new Stars({
    x: 181,
    y: -9,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  End: new End({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Curtain: new Curtain({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Menu: new Menu({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Editor: new Editor({
    x: -15,
    y: -38,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Cloudscore: new Cloudscore({
    x: 217,
    y: -154,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Crossfade: new Crossfade({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
