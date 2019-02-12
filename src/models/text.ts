import { Identifiable } from './identifiable';
export interface Text extends Identifiable {
  name: string;
  text: string;
}
