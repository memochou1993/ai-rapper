export interface VoiceParams {
  added_at: number;
  addedAt: number;
  architecture: string;
  category: string;
  contributors: any[];
  controls: boolean;
  display_name: string;
  displayName: string;
  is_active: boolean;
  isActive: boolean;
  memberships: any[];
  is_private: boolean;
  isPrivate: boolean;
  is_primary: boolean;
  isPrimary: boolean;
  name: string;
  symbol_set: string;
  symbolSet: string;
  voicemodel_uuid: string;
  voicemodelUuid: string;
  hifi_gan_vocoder: string;
  hifiGanVocoder: string;
  ml_model_id: number;
  mlModelId: number;
  speaker_id: number;
  speakerId: number;
  language: string;
  gender: string;
  mood: string;
  style: string;
  accent: string;
  age: string;
  description: string | null;
  image_url: string;
  imageUrl: string;
}

export default class Voice {
  addedAt: number;

  architecture: string;

  category: string;

  contributors: any[];

  controls: boolean;

  displayName: string;

  isActive: boolean;

  memberships: any[];

  isPrivate: boolean;

  isPrimary: boolean;

  name: string;

  symbolSet: string;

  voicemodelUuid: string;

  hifiGanVocoder: string;

  mlModelId: number;

  speakerId: number;

  language: string;

  gender: string;

  mood: string;

  style: string;

  accent: string;

  age: string;

  description: string | null;

  imageUrl: string;

  constructor(params: VoiceParams) {
    this.addedAt = params.added_at ?? params.addedAt;
    this.architecture = params.architecture;
    this.category = params.category;
    this.contributors = params.contributors;
    this.controls = params.controls;
    this.displayName = params.display_name ?? params.displayName;
    this.isActive = params.is_active ?? params.isActive;
    this.memberships = params.memberships;
    this.isPrivate = params.is_private ?? params.isPrivate;
    this.isPrimary = params.is_primary ?? params.isPrimary;
    this.name = params.name;
    this.symbolSet = params.symbol_set ?? params.symbolSet;
    this.voicemodelUuid = params.voicemodel_uuid ?? params.voicemodelUuid;
    this.hifiGanVocoder = params.hifi_gan_vocoder ?? params.hifiGanVocoder;
    this.mlModelId = params.ml_model_id ?? params.mlModelId;
    this.speakerId = params.speaker_id ?? params.speakerId;
    this.language = params.language;
    this.gender = params.gender;
    this.mood = params.mood;
    this.style = params.style;
    this.accent = params.accent;
    this.age = params.age;
    this.description = params.description;
    this.imageUrl = params.image_url ?? params.imageUrl;
  }
}
