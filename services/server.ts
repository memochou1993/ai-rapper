const client = {
  async fetchBackingTracks(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const params = (new URLSearchParams()).toString();
      const res = await fetch(`/api/backing-tracks?${params}`, {
        method: 'GET',
      });
      const data = await res.json();
      res.ok ? resolve(data) : reject(data);
    });
  },
  async fetchVoices({
    mode,
  }: {
    mode: string;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const params = (new URLSearchParams({ mode })).toString();
      const res = await fetch(`/api/voices?${params}`, {
        method: 'GET',
      });
      const data = await res.json();
      res.ok ? resolve(data) : reject(data);
    });
  },
  async generateLyrics({
    backingTrack,
    subject,
    lines,
  }: {
    backingTrack?: string;
    subject: string;
    lines: number,
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const res = await fetch('/api/lyrics', {
        method: 'POST',
        body: JSON.stringify({
          backing_track: backingTrack,
          subject,
          lines,
        }),
      });
      const data = await res.json();
      res.ok ? resolve(data) : reject(data);
    });
  },
};

export default client;
