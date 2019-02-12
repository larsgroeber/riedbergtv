import { Video } from 'src/models/video';
import { Identifiable } from './identifiable';

export interface Category extends Identifiable {
  name: string;
  videos: Video[];
}
