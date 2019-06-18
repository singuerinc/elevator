import anime from "animejs";
import { IElevator } from "./IElevator";
import { ITask } from "./ITask";
import { Elevator } from "./Elevator";

export class PlayBellTask implements ITask {
  run = (el: IElevator) => {
    console.log(`\trunning task PlayBellTask`);
    //@ts-ignore
    const audio = new Audio(require("../bell.mp3"));
    audio.play();
    return Promise.resolve(true);
  };
}

export class UpdateFloorNumberTask implements ITask {
  constructor(private floor: number) {}
  run = (el: IElevator) => {
    console.log(`\trunning task UpdateFloorNumberTask`);
    el.floor = this.floor;
    return Promise.resolve(true);
  };
}

export class PeopleInTask implements ITask {
  constructor(private num: number) {}
  run = (el: IElevator) => {
    console.log(`\trunning task PeopleInTask`);
    return anime({
      targets: el,
      easing: "linear",
      cargo: [el.cargo, Math.min(Elevator.MAX_CAPACITY, el.cargo + this.num)],
      duration: 1000 * this.num,
      round: 1
    }).finished;
  };
}

export class PeopleOutTask implements ITask {
  constructor(private num: number) {}
  run = (el: IElevator) => {
    console.log(`\trunning task PeopleOutTask`);
    return anime({
      targets: el,
      easing: "linear",
      cargo: [el.cargo, Math.max(0, el.cargo - this.num)],
      duration: 1000 * this.num,
      round: 1
    }).finished;
  };
}

export class MoveUpTask implements ITask {
  constructor(private to: number) {}
  run = (el: IElevator) => {
    console.log(`\trunning task MoveUpTask`);
    return anime({
      targets: el,
      easing: "easeInOutQuad",
      y: `+=${50 * (this.to - el.floor)}`,
      duration: 2000
    }).finished;
  };
}

export class MoveDownTask implements ITask {
  constructor(private to: number) {}
  run = (el: IElevator) => {
    console.log(`\trunning task MoveDownTask`);
    return anime({
      targets: el,
      easing: "easeInOutQuad",
      y: `-=${50 * (el.floor - this.to)}`,
      duration: 2000
    }).finished;
  };
}

export class OpenDoorsTask implements ITask {
  run = (el: IElevator) => {
    console.log(`\trunning task OpenDoorsTask`);
    return el.open();
  };
}

export class CloseDoorsTask implements ITask {
  run = (el: IElevator) => {
    console.log(`\trunning task CloseDoorsTask`);
    return el.close();
  };
}

export class WaitTask implements ITask {
  run(el: IElevator) {
    console.log(`\trunning task WaitTask`);
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        console.log(`\tdone with task WaitTask`);
        resolve(true);
      }, 1000);
    });
  }
}
