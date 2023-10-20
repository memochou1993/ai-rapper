import axios from 'axios';
import { Freestyle } from './models';

const client = axios.create({
  baseURL: '/api',
});

const service = {
  async fetchBackingTracks({
    detailed,
  }: {
    detailed: boolean;
  }) {
    const res = await client.get('/backing-tracks', {
      params: {
        detailed,
      },
    });
    return res.data;
  },
  async fetchVoices({
    mode,
  }: {
    mode: string;
  }) {
    const res = await client.get('/voices', {
      params: {
        mode,
      },
    });
    return res.data;
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
    const res = await client.post('/lyrics', {
      backing_track: backingTrack || null,
      subject: subject || null,
      lines: lines || null,
    });
    return res.data;
  },
  async generateFreestyles({
    bpm,
    backingTrack,
    lyrics,
    voicemodelUuid,
  }: {
    bpm: number;
    backingTrack: string;
    lyrics: Array<string>;
    voicemodelUuid: string;
  }): Promise<Freestyle> {
    const res = await client.post('/freestyles', {
      bpm: bpm || null,
      backing_track: backingTrack || null,
      lyrics: lyrics || null,
      voicemodel_uuid: voicemodelUuid || null,
    });
    return new Freestyle(res.data);
  },
};

export default service;
