export interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

export type MediaStore = Record<number, MediaItem[]>;
