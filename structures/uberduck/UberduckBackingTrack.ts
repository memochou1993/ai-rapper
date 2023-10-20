import UberduckVerse, { UberduckVerseParams } from './UberduckVerse';

export interface BackingTrackParams {
  name: string;
  uuid: string;
  source: string;
  bpm: number;
  verses: UberduckVerseParams[];
  timeline_origin: number;
  timelineOrigin: number;
  is_public: boolean;
  isPublic: boolean;
  url: string;
}

export default class BackingTrack {
  name: string;

  uuid: string;

  source: string;

  bpm: number;

  verses: UberduckVerse[];

  timelineOrigin: number;

  isPublic: boolean;

  url: string;

  constructor(params: BackingTrackParams) {
    this.name = params.name;
    this.uuid = params.uuid;
    this.source = params.source;
    this.bpm = params.bpm;
    this.verses = params.verses.map((v) => new UberduckVerse(v));
    this.timelineOrigin = params.timeline_origin ?? params.timelineOrigin;
    this.isPublic = params.is_public ?? params.isPublic;
    this.url = params.url;
  }
}
