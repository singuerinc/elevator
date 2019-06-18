import anime from "animejs";
import * as PIXI from "pixi.js";
import { TaskPack } from "./TaskPack";
import { IElevator } from "./IElevator";

export class Elevator extends PIXI.Graphics implements IElevator {
  public doors: PIXI.Graphics;
  private _floorTxt: PIXI.Text;
  private _cargoTxt: PIXI.Text;
  private _floor: number = 0;
  private _cargo: number = 0;
  private _isOpen: boolean = false;
  static MAX_CAPACITY: number = 12;
  constructor() {
    super();
    this.beginFill(0x000000);
    this.drawRect(0, 0, 50, 50);
    this.endFill();

    this._floorTxt = new PIXI.Text(this._floor.toString(), {
      fontSize: 20,
      fill: 0xffffff
    });
    this._floorTxt.x = 55;
    this.addChild(this._floorTxt);

    this._cargoTxt = new PIXI.Text(this._cargo.toString(), {
      fontSize: 16,
      fill: 0xffffff
    });
    this._cargoTxt.x = 55;
    this._cargoTxt.y = 25;
    this.addChild(this._cargoTxt);

    this.doors = new PIXI.Graphics();
    this.doors.beginFill(0xff0000);
    this.doors.drawRect(0, 0, 50, 50);
    this.doors.endFill();
    this.addChild(this.doors);
  }

  public open(): Promise<boolean> {
    this._isOpen = true;
    this.doors.clear();
    this.doors.beginFill(0x00ff00);
    this.doors.drawRect(0, 0, 50, 50);
    this.doors.endFill();

    return anime({
      targets: this.doors,
      delay: 500,
      easing: "easeInOutQuad",
      width: 0,
      duration: 1000
    }).finished;
  }

  public close(): Promise<boolean> {
    this._isOpen = false;
    this.doors.clear();
    this.doors.beginFill(0xff0000);
    this.doors.drawRect(0, 0, 50, 50);
    this.doors.endFill();

    return anime({
      targets: this.doors,
      easing: "easeInOutQuad",
      delay: 500,
      width: 50,
      duration: 1000
    }).finished;
  }

  public get isOpen() {
    return this._isOpen;
  }

  public get floor() {
    return this._floor;
  }

  public set floor(value: number) {
    this._floor = value;
    this._floorTxt.text = value.toString();
  }

  public get cargo() {
    return this._cargo;
  }

  public set cargo(value: number) {
    this._cargo = value;
    this._cargoTxt.text = value.toString();
  }

  run(queue: TaskPack[]) {
    const [cmd, ...cmds] = queue;
    if (cmd) {
      cmd.run(cmd.queue).then(() => {
        console.log("idle");
        this.run(cmds);
      });
    }
  }
}
