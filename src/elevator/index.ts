import anime from "animejs";
import { IElevator } from "./IElevator";
import { ITask } from "./ITask";

export class PlayBellTask implements ITask {
  run = (el: IElevator) => {
    //@ts-ignore
    const audio = new Audio(require("../bell.mp3"));
    audio.play();
    return Promise.resolve(true);
  };
}

export class UpdateFloorNumberTask implements ITask {
  constructor(private floor: number) {}
  run = (el: IElevator) => {
    el.setFloor(this.floor);
    return Promise.resolve(true);
  };
}

export class MoveUpTask implements ITask {
  run = (el: IElevator) =>
    anime({
      targets: el,
      easing: "easeInOutQuad",
      y: "+=50",
      duration: 2000
    }).finished;
}

export class MoveDownTask implements ITask {
  run = (el: IElevator) =>
    anime({
      targets: el,
      easing: "easeInOutQuad",
      y: "-=50",
      duration: 2000
    }).finished;
}

export class OpenDoorsTask implements ITask {
  run = (el: IElevator) =>
    anime({
      targets: el.doors,
      delay: 500,
      easing: "easeInOutQuad",
      width: 0,
      duration: 1000
    }).finished;
}

export class CloseDoorsTask implements ITask {
  run = (el: IElevator) =>
    anime({
      targets: el.doors,
      easing: "easeInOutQuad",
      delay: 500,
      width: 50,
      duration: 1000
    }).finished;
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
