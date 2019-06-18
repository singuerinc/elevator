import * as PIXI from "pixi.js";
import { Command } from "./Command";
import { IElevator } from "./IElevator";

export class Elevator extends PIXI.Graphics implements IElevator {
  public doors: PIXI.Graphics;
  private _floorText: PIXI.Text;
  constructor() {
    super();
    this.beginFill(0x000000);
    this.drawRect(0, 0, 50, 50);
    this.endFill();

    this._floorText = new PIXI.Text("0", { fontSize: 20, fill: 0x000000 });
    this._floorText.x = 55;
    this.addChild(this._floorText);

    this.doors = new PIXI.Graphics();
    this.doors.beginFill(0xff0000);
    this.doors.drawRect(0, 0, 50, 50);
    this.doors.endFill();
    this.addChild(this.doors);
  }

  public setFloor(value: number) {
    this._floorText.text = value.toString();
  }

  run(queue: Command[]) {
    const [cmd, ...cmds] = queue;
    if (cmd) {
      cmd.run(cmd.queue).then(() => {
        console.log("idle");
        this.run(cmds);
      });
    }
  }
}
