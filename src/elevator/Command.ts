import { IElevator } from "./IElevator";
import { ITask } from "./ITask";

export class Command {
  constructor(public el: IElevator, public queue: ITask[]) {}
  run(queue: ITask[]) {
    console.log(`running command`);
    return new Promise(resolve => {
      const [task, ...tasks] = queue;
      task.run(this.el).then(() => {
        console.log("tasks.length", tasks.length);
        if (tasks.length === 0) {
          console.log(`done with command`);
          resolve();
        } else {
          this.run(tasks).then(resolve);
        }
      });
    });
  }
}
