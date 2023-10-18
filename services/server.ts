const client = {
  async fetchVoices({
    mode,
  }: {
    mode: string;
  }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const params = (new URLSearchParams({ mode })).toString();
      const res = await fetch(`/api/voices?${params}`);
      const data = await res.json();
      res.ok ? resolve(data) : reject(data);
    });
  },
};

export default client;
