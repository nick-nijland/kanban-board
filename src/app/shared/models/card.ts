import {Status} from './status';

export interface Card {
  id: number;
  title: string;
  description: string;
  status: Status;
}
