import { Status } from './status';

export interface Card extends NewCard {
  id: number;
  status: Status;
}

export interface NewCard {
  title: string;
  description: string;
}
