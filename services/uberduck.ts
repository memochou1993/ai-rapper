const baseURL = process.env.NEXT_PUBLIC_UBERDUCK_API_URL;

const revalidate = 60 * 60;

const client = {
  async fetchVoices(params: URLSearchParams): Promise<Response> {
    return fetch(`${baseURL}/voices?${params.toString()}`, {
      next: {
        revalidate,
        tags: params.toString().split('&'),
      },
    });
  },
};

export default client;
