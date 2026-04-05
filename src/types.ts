export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

export type MediaStore = Record<number, MediaItem[]>;
