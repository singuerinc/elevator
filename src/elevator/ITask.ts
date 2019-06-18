import { IElevator } from "./IElevator";

export interface ITask {
  run: (el: IElevator) => Promise<boolean>;
}
