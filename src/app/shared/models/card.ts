import {Status} from './status';

export interface Card extends NewCard{
  id: number;
  title: string;
  description: string;
  status: Status;
}

export interface NewCard {
  title: string;
  description: string;
}
