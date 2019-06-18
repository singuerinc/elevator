import { IElevator } from "./IElevator";
import { ITask } from "./ITask";

export class TaskPack {
  constructor(public el: IElevator, public queue: ITask[]) {}
  run(queue: ITask[]) {
    console.log(`running TaskPack`);
    return new Promise(resolve => {
      const [task, ...tasks] = queue;
      task.run(this.el).then(() => {
        console.log("tasks.length", tasks.length);
        if (tasks.length === 0) {
          console.log(`done with TaskPack`);
          resolve();
        } else {
          this.run(tasks).then(resolve);
        }
      });
    });
  }
}
