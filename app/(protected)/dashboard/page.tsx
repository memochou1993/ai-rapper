'use client';

import { server } from '@/services';
import { UberduckBackingTracking, UberduckFreestyle, UberduckVoice } from '@/structures/uberduck';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  console.log('session', session);

  const [beats, setBeats] = useState<UberduckBackingTracking[]>([]);
  const [subject, setSubject] = useState<string>('Hello, World');
  const [title, setTitle] = useState<string>('');
  const [lyrics, setLyrics] = useState<string>('');
  const [voices, setVoices] = useState<UberduckVoice[]>([]);
  const [selectedBeatId, setSelectedBeatId] = useState<string>('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');
  const [freestyle, setFreestyle] = useState<UberduckFreestyle|null>(null);

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

  const fetchVoice = async (id: string) => {
    try {
      const data = await server.fetchVoice({
        id,
      });
      const updated = voices.map((voice) => {
        if (voice.voicemodelUuid === id) {
          return Object.assign(voice, {
            samples: data.samples,
          });
        }
        return voice;
      });
      setVoices(updated);
    } catch (e) {
      console.log(e);
    }
  };

  const generateLyrics = async () => {
    try {
      const data = await server.generateLyrics({
        subject,
        ...(selectedBeatId ? { backingTrack: selectedBeatId } : { lines: 4 }),
      });
      const { title, lyrics } = data;
      setTitle(title);
      setLyrics(lyrics.length > 0 ? lyrics[0].join('\n') : '');
    } catch (e) {
      console.log(e);
    }
  };

  const generateFreestyles = async () => {
    try {
      const data = await server.generateFreestyles({
        bpm: 90,
        backingTrack: selectedBeatId,
        lyrics: lyrics.split('\n'),
        voicemodelUuid: selectedVoiceId,
      });
      setFreestyle(data);
    } catch (e) {
      console.log(e);
    }
  };

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
              <div key={i} className="mb-4">
                <label
                  htmlFor={`beat-${i}`}
                >
                  <input
                    id={`beat-${i}`}
                    type="radio"
                    value={beat.uuid}
                    checked={beat.uuid === selectedBeatId}
                    onChange={(v) => setSelectedBeatId(v.target.value)}
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
            Voice:
          </div>
          <div className="basis-10/12 flex-col h-72 overflow-auto outlined">
            {voices.map((voice, i) => (
              <div key={i} className="mb-4">
                <label
                  htmlFor={`voice-${i}`}
                >
                  <input
                    id={`voice-${i}`}
                    type="radio"
                    value={voice.voicemodelUuid}
                    checked={voice.voicemodelUuid === selectedVoiceId}
                    onChange={(e) => setSelectedVoiceId(e.target.value)}
                  />
                  {voice.name}
                </label>
                {
                  voice.imageUrl && (
                    <Image
                      alt={voice.displayName}
                      src={voice.imageUrl}
                      height={100}
                      width={100}
                    />
                  )
                }
                <button
                  type="button"
                  className="bg-gray-300"
                  onClick={() => fetchVoice(voice.voicemodelUuid)}
                >
                  Show Samples
                </button>
                {voice.samples && (
                  voice.samples.map((sample, i) => (
                    <div key={i}>
                      <audio
                        src={sample.url}
                        controls
                      >
                        <track kind="captions" />
                      </audio>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-center my-4">
          <div className="basis-12/12 flex">
            <button
              type="button"
              className="bg-gray-300"
              onClick={generateFreestyles}
            >
              Generate
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-center my-4">
          <div className="basis-12/12 flex">
            {freestyle && (
              <div>
                <audio
                  src={freestyle.mixUrl}
                  controls
                >
                  <track kind="captions" />
                </audio>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
