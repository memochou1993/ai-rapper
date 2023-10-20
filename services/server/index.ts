import {
  UberduckBackingTracking, UberduckFreestyle, UberduckLyrics, UberduckVoice,
} from '@/structures/uberduck';
import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
});

const service = {
  async fetchBackingTracks({
    detailed,
  }: {
    detailed: boolean;
  }) {
    const res = await client.get('/music/backing-tracks', {
      params: {
        detailed,
      },
    });
    return res.data.data.map((v: any) => new UberduckBackingTracking(v));
  },
  async fetchVoices({
    mode,
  }: {
    mode: string;
  }) {
    const res = await client.get('/music/voices', {
      params: {
        mode,
      },
    });
    return res.data.data.map((v: any) => new UberduckVoice(v));
  },
  async fetchVoice({
    id,
  }: {
    id: string;
  }) {
    const res = await client.get(`/music/voices/${id}`, {
      params: {
        id,
      },
    });
    return new UberduckVoice(res.data.data);
  },
  async generateLyrics({
    backingTrack,
    subject,
    lines,
  }: {
    backingTrack?: string;
    subject: string;
    lines?: number;
  }) {
    const res = await client.post('/music/lyrics', {
      backing_track: backingTrack || null,
      subject: subject || null,
      lines: lines || null,
    });
    return new UberduckLyrics(res.data.data);
  },
  async generateFreestyles({
    bpm,
    backingTrack,
    lyrics,
    voicemodelUuid,
  }: {
    bpm: number;
    backingTrack: string;
    lyrics: string[];
    voicemodelUuid: string;
  }) {
    const res = await client.post('/music/freestyles', {
      bpm: bpm || null,
      backing_track: backingTrack || null,
      lyrics: lyrics || null,
      voicemodel_uuid: voicemodelUuid || null,
    });
    return new UberduckFreestyle(res.data.data);
  },
};

export default service;
