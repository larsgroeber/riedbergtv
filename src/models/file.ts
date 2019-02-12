import { Identifiable } from './identifiable';
export interface File extends Identifiable {
  name: string;
  url: string;
}
