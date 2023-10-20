export interface UberduckVerseParams {
  label: string;
  start: number;
  length_in_measures: number;
  lengthInMeasures: number;
}

export default class UberduckVerse {
  label: string;

  start: number;

  lengthInMeasures;

  constructor(params: UberduckVerseParams) {
    this.label = params.label;
    this.start = params.start;
    this.lengthInMeasures = params.length_in_measures ?? params.lengthInMeasures;
  }
}
