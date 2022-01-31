export class Task {
  constructor(taskName, timestampCreated) {
    this.id = `${timestampCreated}`;
    this.taskName = taskName;
    this.timestampCreated = timestampCreated;
    this.done = false;
  }
}
