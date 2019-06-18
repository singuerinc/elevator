import { Command } from "./Command";

export interface IElevator {
  run(queue: Command[]);
  setFloor(value: number);
  doors: PIXI.Graphics;
}
