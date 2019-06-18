import * as PIXI from "pixi.js";
import {
  OpenDoorsTask,
  MoveDownTask,
  MoveUpTask,
  CloseDoorsTask,
  WaitTask,
  UpdateFloorNumberTask,
  PlayBellTask
} from "./elevator/index";
import { IElevator } from "./elevator/IElevator";
import { Command } from "./elevator/Command";
import { Elevator } from "./elevator/Elevator";

const upFactory = (el: IElevator) => (floor: number) =>
  new Command(el, [
    new CloseDoorsTask(),
    new MoveUpTask(),
    new UpdateFloorNumberTask(floor),
    new PlayBellTask(),
    new OpenDoorsTask(),
    new WaitTask()
  ]);

const downFactory = (el: IElevator) => (floor: number) =>
  new Command(el, [
    new CloseDoorsTask(),
    new MoveDownTask(),
    new UpdateFloorNumberTask(floor),
    new PlayBellTask(),
    new OpenDoorsTask(),
    new WaitTask()
  ]);

const elevator: IElevator = new Elevator();
const queue = [
  ...[1, 2].map(upFactory(elevator)),
  ...[1, 0].map(downFactory(elevator))
];

elevator.run(queue);

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x222222,
  resolution: window.devicePixelRatio || 1
});

document.body.appendChild(app.view);

const container = new PIXI.Container();
container.addChild(elevator as Elevator);
app.stage.addChild(container);

// Listen for animate update
app.ticker.add(delta => {
  // rotate the container!
  // use delta to create frame-independent transform
  // container.rotation -= 0.01 * delta;
});
