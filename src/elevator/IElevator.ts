import { TaskPack } from "./TaskPack";

export interface IElevator {
  run(queue: TaskPack[]);
  cargo: number;
  floor: number;
  open(): Promise<boolean>;
  close(): Promise<boolean>;
  doors: PIXI.Graphics;
}
