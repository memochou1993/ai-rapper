export interface Word {
  word: string;
  start: number;
  end: number;
}

export interface Line {
  words: Word[];
  text: string;
  start: number;
  end: number;
}

export interface UberduckFreestyleParams {
  mix_url: string;
  mixUrl: string;
  vocals_url: string;
  vocalsUrl: string;
  lines: Line[];
  title: string;
  render_uuid: string;
  renderUuid: string;
  render_video_response: any;
  renderVideoResponse: any;
}

export default class UberduckFreestyle {
  mixUrl: string;

  vocalsUrl: string;

  lines: Line[];

  title: string;

  renderUuid: string;

  renderVideoResponse: any;

  constructor(params: UberduckFreestyleParams) {
    this.mixUrl = params.mix_url ?? params.mixUrl;
    this.vocalsUrl = params.vocals_url ?? params.vocalsUrl;
    this.lines = params.lines;
    this.title = params.title;
    this.renderUuid = params.render_uuid ?? params.renderUuid;
    this.renderVideoResponse = params.render_video_response ?? params.renderVideoResponse;
  }
}
