import * as PIXI from "pixi.js";
import {
  OpenDoorsTask,
  MoveDownTask,
  MoveUpTask,
  CloseDoorsTask,
  WaitTask,
  UpdateFloorNumberTask,
  PlayBellTask,
  PeopleInTask,
  PeopleOutTask
} from "./elevator/tasks";
import { IElevator } from "./elevator/IElevator";
import { TaskPack } from "./elevator/TaskPack";
import { Elevator } from "./elevator/Elevator";

const upFactory = (el: IElevator) => (floor: number) =>
  new TaskPack(el, [
    new OpenDoorsTask(),
    new PeopleInTask(3),
    new CloseDoorsTask(),
    new MoveUpTask(floor),
    new UpdateFloorNumberTask(floor),
    new PlayBellTask(),
    new OpenDoorsTask(),
    new PeopleOutTask(1),
    new WaitTask()
  ]);

const downFactory = (el: IElevator) => (floor: number) =>
  new TaskPack(el, [
    new OpenDoorsTask(),
    new PeopleInTask(2),
    new CloseDoorsTask(),
    new MoveDownTask(floor),
    new UpdateFloorNumberTask(floor),
    new PlayBellTask(),
    new OpenDoorsTask(),
    new PeopleOutTask(4),
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
