export class SimpleCache {
  private _datetime: number;
  private _data: any;
  private _ttl = 120;

  public get expired() {
    return !this._datetime || this._datetime + this._ttl * 1e3 < Date.now();
  }

  public set data(data) {
    this._data = data;
    this._datetime = Date.now();
  }

  public get data() {
    return this.expired ? undefined : this._data;
  }

  public get ttl() {
    return this._ttl;
  }

  public set ttl(value: number) {
    this._ttl = value;
  }
}
