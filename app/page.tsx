'use client';

import { server } from '@/services';
import { useEffect, useState } from 'react';

export default function Home() {
  const [beats, setBeats] = useState<Array<any>>([]);
  const [subject, setSubject] = useState<string>('Hello, World');
  const [title, setTitle] = useState<string>('');
  const [lyrics, setLyrics] = useState<string>('');
  const [voices, setVoices] = useState<Array<any>>([]);

  const generateLyrics = async () => {
    try {
      const data = await server.generateLyrics({
        subject,
        lines: 4,
      });
      const { title, lyrics } = data;
      setTitle(title);
      setLyrics(lyrics.join('\n'));
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const voices = await server.fetchVoices({ mode: 'tts-basic' });
        setVoices(voices);
      } catch (e) {
        console.log(e);
      }
      try {
        const beats = await server.fetchBackingTracks();
        setBeats(beats);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <main className="h-screen flex flex-col bg-violet-300 p-24">
      <div className="flex justify-center">
        <h1 className="text-2xl">
          AI Wrapper
        </h1>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col">
        <div className="flex flex-row my-4">
          <div className="basis-2/12 text-right px-4">
            <label htmlFor="beats">
              Beat:
            </label>
          </div>
          <div className="basis-10/12 flex">
            <select
              id="beats"
              className="w-full"
            >
              <option value="">Choose a beat</option>
              {beats.map((beat, i) => (
                <option
                  key={i}
                  value={beat.uuid}
                >
                  {beat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-row my-4">
          <div className="basis-2/12 text-right px-4">
            <label htmlFor="subject">
              Subject:
            </label>
          </div>
          <div className="basis-10/12 flex">
            <input
              id="subject"
              value={subject}
              className="w-full"
              onChange={(e) => setSubject(e.target.value)}
            />
            <button
              type="button"
              className="bg-gray-300"
              onClick={generateLyrics}
            >
              Generate
            </button>
          </div>
        </div>
        <div className="flex flex-row my-4">
          <div className="basis-2/12 text-right px-4">
            <label htmlFor="title">
              Title:
            </label>
          </div>
          <div className="basis-10/12 flex">
            <input
              id="title"
              value={title}
              className="w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row my-4">
          <div className="basis-2/12 text-right px-4">
            <label htmlFor="lyrics">
              Lyrics:
            </label>
          </div>
          <div className="basis-10/12 flex">
            <textarea
              id="lyrics"
              value={lyrics}
              rows={4}
              className="w-full"
              onChange={(e) => setLyrics(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row my-4">
          <div className="basis-2/12 text-right px-4">
            <label htmlFor="voices">
              Voice:
            </label>
          </div>
          <div className="basis-10/12 flex">
            <select
              id="voices"
              className="w-full"
            >
              <option value="">Choose a voice</option>
              {voices.map((voice, i) => (
                <option
                  key={i}
                  value={voice.voicemodel_uuid}
                >
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </main>
  );
}
