export interface UberduckLyricsParams {
  title: string;
  lyrics: string[][];
}

export default class UberduckLyrics {
  title: string;

  lyrics: string[][];

  constructor(params: UberduckLyricsParams) {
    this.title = params.title;
    this.lyrics = params.lyrics;
  }
}
