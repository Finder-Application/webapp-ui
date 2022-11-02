import { UserEntity } from './User';

export interface PostEntity {
  id: number;

  userId: number;

  title: string | null;

  fullName: string | null;

  nickname: string | null;

  dateOfBirth: string | null;

  gender: boolean | null;

  hometownRegion: string | null;

  hometownState: string | null;

  hometownCommune: string | null;

  hometownHamlet: string | null;

  relevantPosts: string | null;

  missingRegion: string | null;

  missingState: string | null;

  missingHamlet: string | null;

  missingTime: string | null;

  photos: string | null;

  missingCommune: string | null;

  relationship: string | null;

  description: string | null;

  shareCount: number | null;

  updatedAt: Date;

  createdAt: Date;

  user: UserEntity;
}
