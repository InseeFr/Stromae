export class Deferred {
  pr;

  resolve;
  reject;

  constructor() {
    let resolve;
    let reject;

    this.pr = new Promise((resolve_, reject_) => {
      resolve = (value) => {
        this.isPending = false;
        resolve_(value);
      };

      reject = (error) => {
        this.isPending = false;
        reject_(error);
      };
    });

    this.resolve = resolve;
    this.reject = reject;
  }

  isPending = true;
}
