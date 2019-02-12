import { Identifiable } from './identifiable';

export interface Faq extends Identifiable {
  question: string;
  answer: string;
}
