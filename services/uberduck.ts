const {
  NEXT_PUBLIC_UBERDUCK_API_URL: baseURL,
  NEXT_PUBLIC_UBERDUCK_API_PUBLIC_KEY: publicKey,
  NEXT_PUBLIC_UBERDUCK_API_SECRET_KEY: secretKey,
} = process.env;

const revalidate = 60 * 60;
const token = Buffer.from(`${publicKey}:${secretKey}`).toString('base64');

const client = {
  async fetchBackingTracks(params: URLSearchParams): Promise<Response> {
    return fetch(`${baseURL}/reference-audio/backing-tracks?${params.toString()}`, {
      method: 'GET',
      next: {
        revalidate,
        tags: params.toString().split('&'),
      },
    });
  },
  async fetchVoices(params: URLSearchParams): Promise<Response> {
    return fetch(`${baseURL}/voices?${params.toString()}`, {
      method: 'GET',
      next: {
        revalidate,
        tags: params.toString().split('&'),
      },
    });
  },
  async generateLyrics(data: any): Promise<Response> {
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
};

export default client;
