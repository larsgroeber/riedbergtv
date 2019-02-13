import { Identifiable } from './identifiable';
import { File } from './file';

export interface TeamMember extends Identifiable {
  name: string;
  picture: File;
  startedAt: Date;
  email: string;
  active: boolean;
  leftAt: Date;
  workAreas: string;
}
