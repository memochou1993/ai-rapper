'use client';

import Image from 'next/image';
import { server } from '@/services';
import { useEffect, useState } from 'react';

export default function Home() {
  const [beats, setBeats] = useState<Array<any>>([]);
  const [subject, setSubject] = useState<string>('Hello, World');
  const [title, setTitle] = useState<string>('');
  const [lyrics, setLyrics] = useState<string>('');
  const [voices, setVoices] = useState<Array<any>>([]);
  const [selectedBeatId, setSelectedBeatId] = useState<string>('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');

  const generateLyrics = async () => {
    try {
      const data = await server.generateLyrics({
        subject,
        ...(selectedBeatId ? { backingTrack: selectedBeatId } : { lines: 4 }),
      });
      const { title, lyrics } = data;
      setTitle(title);
      setLyrics(lyrics.length > 0 ? lyrics.pop().join('\n') : '');
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
        const beats = await server.fetchBackingTracks({ detailed: true });
        setBeats(beats);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-violet-300 p-24">
      <div className="flex justify-center">
        <h1 className="text-2xl">
          AI Wrapper
        </h1>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col">
        <div className="flex flex-row my-4">
          <div className="basis-2/12 text-right px-4">
            Beat:
          </div>
          <div className="basis-10/12 flex flex-col h-36 overflow-auto outlined">
            {beats.map((beat, i) => (
              <div key={i}>
                <label
                  htmlFor={`beat-${i}`}
                >
                  <input
                    id={`beat-${i}`}
                    type="radio"
                    value={beat.uuid}
                    checked={beat.uuid === selectedBeatId}
                    onChange={() => setSelectedBeatId(beat.uuid)}
                  />
                  {beat.name}
                </label>
                <audio
                  src={beat.url}
                  controls
                >
                  <track kind="captions" />
                </audio>
              </div>
            ))}
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
          <div className="basis-10/12 flex-col h-72 overflow-auto outlined">
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
            {voices.map((voice, i) => (
              <div key={i}>
                <label
                  htmlFor={`voice-${i}`}
                >
                  <input
                    id={`voice-${i}`}
                    type="radio"
                    value={voice.uuid}
                    checked={voice.voicemodel_uuid === selectedVoiceId}
                    onChange={() => setSelectedVoiceId(voice.voicemodel_uuid)}
                  />
                  {voice.name}
                </label>
                {
                  voice.image_url && (
                    <Image
                      alt={voice.display_name}
                      src={voice.image_url}
                      height={100}
                      width={100}
                    />
                  )
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
