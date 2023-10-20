const {
  NEXT_PUBLIC_UBERDUCK_API_URL: baseURL,
  NEXT_PUBLIC_UBERDUCK_API_PUBLIC_KEY: publicKey,
  NEXT_PUBLIC_UBERDUCK_API_SECRET_KEY: secretKey,
} = process.env;

const revalidate = 60 * 60;
const token = Buffer.from(`${publicKey}:${secretKey}`).toString('base64');

const service = {
  async fetchBackingTracks(params: URLSearchParams): Promise<Response> {
    // Return fake data for testing
    if (process.env.APP_ENV === 'local') {
      return fetch('https://json.epoch.tw/api/records/wMvbmw0eYA');
    }
    return fetch(`${baseURL}/reference-audio/backing-tracks?${params.toString()}`, {
      method: 'GET',
      next: {
        revalidate,
        tags: params.toString().split('&'),
      },
    });
  },
  async fetchVoices(params: URLSearchParams): Promise<Response> {
    // Return fake data for testing
    if (process.env.APP_ENV === 'local') {
      return fetch('https://json.epoch.tw/api/records/Volej25ejN');
    }
    return fetch(`${baseURL}/voices?${params.toString()}`, {
      method: 'GET',
      next: {
        revalidate,
        tags: params.toString().split('&'),
      },
    });
  },
  async fetchVoice(id: string): Promise<Response> {
    // Return fake data for testing
    if (process.env.APP_ENV === 'local') {
      return fetch('https://json.epoch.tw/api/records/WJxboYKegw');
    }
    return fetch(`${baseURL}/voices/${id}/detail`, {
      method: 'GET',
      next: {
        revalidate,
        tags: [`id=${id}`],
      },
    });
  },
  async generateLyrics(data: any): Promise<Response> {
    // Return fake data for testing
    if (process.env.APP_ENV === 'local') {
      return fetch('https://json.epoch.tw/api/records/OpnelO6dKB');
    }
    return fetch(`${baseURL}/tts/lyrics`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Basic ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },
  async generateFreestyle(data: any): Promise<Response> {
    // Return fake data for testing
    if (process.env.APP_ENV === 'local') {
      return fetch('https://json.epoch.tw/api/records/4openZle7A');
    }
    return fetch(`${baseURL}/tts/freestyle`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Basic ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },
};

export default service;
