export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  title?: string;
  description?: string;
}

export type MediaStore = Record<number, MediaItem[]>;
