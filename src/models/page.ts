import { File } from './file';
import { Identifiable } from './identifiable';

export interface Page extends Identifiable {
  title: string;
  slug: string;
  content: string;
  header: File;
}
