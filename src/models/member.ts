import { Identifiable } from './identifiable';
import { File } from './file';

export interface TeamMember extends Identifiable {
  name: string;
  description: string;
  picture: File;
  startedAt: Date;
  email: string;
}
