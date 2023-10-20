/* eslint-disable camelcase */

interface Word {
  word: string;
  start: number;
  end: number;
}

interface Line {
  words: Word[];
  text: string;
  start: number;
  end: number;
}

interface FreestyleOptions {
  mix_url: string;
  vocals_url: string;
  lines: Line[];
  title: string;
  render_uuid: string;
  render_video_response: any;
}

class Freestyle {
  mixUrl: string;

  vocalsUrl: string;

  lines: Line[];

  title: string;

  renderUuid: string;

  renderVideoResponse: any;

  constructor({
    mix_url,
    vocals_url,
    lines,
    title,
    render_uuid,
    render_video_response,
  }: FreestyleOptions) {
    this.mixUrl = mix_url;
    this.vocalsUrl = vocals_url;
    this.lines = lines;
    this.title = title;
    this.renderUuid = render_uuid;
    this.renderVideoResponse = render_video_response;
  }
}

export default Freestyle;
