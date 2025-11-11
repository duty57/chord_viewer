export class Chord {
  get fingerings(): Array<string> {
    return this._fingerings;
  }

  set fingerings(value: Array<string>) {
    this._fingerings = value;
  }

  get positions(): Array<string> {
    return this._positions;
  }

  set positions(value: Array<string>) {
    this._positions = value;
  }

  get chordName(): string {
    return this._chordName;
  }

  set chordName(value: string) {
    this._chordName = value;
  }

  private _chordName: string;
  private _positions: Array<string>;
  private _fingerings: Array<string>;

  constructor(chordName: string = 'C',
              positions: Array<string> = new Array<string>('x', '3', '2', '0', '1', '0'),
              fingerings: Array<string> = new Array<string>('0', '3', '2', '0', '1', '0')) {
    this._chordName = chordName;
    this._positions = positions;
    this._fingerings = fingerings;
  }

}
