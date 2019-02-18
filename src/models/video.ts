import { Category } from 'src/models/category';
import { Identifiable } from './identifiable';
import { File } from './file';

export interface Video extends Identifiable {
  title: string;
  description: string;
  shortDescription: string;
  video: File;
  categories: Category[];
  videoSmall: File;
  thumbnail: File;
  watchCount: number;
}
