'use client';

import { server } from '@/services';
import { useEffect, useState } from 'react';

export default function Home() {
  const [voices, setVoices] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      try {
        const voices = await server.fetchVoices({ mode: 'tts-basic' });
        setVoices(voices);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <main className="flex flex-col p-24">
      <label htmlFor="voices" className="flex">
        <div className="mr-2">
          Voice:
        </div>
        <select id="voices">
          <option selected>Choose a voice</option>
          {voices.map((voice) => (
            <option value="voice.voicemodel_uuid">{voice.name}</option>
          ))}
        </select>
      </label>
    </main>
  );
}
