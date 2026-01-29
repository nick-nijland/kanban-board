export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
export interface StatusTotal {
  status: string;
  total: number;
}
export const statuses: Status[] = ['TODO', 'IN_PROGRESS', 'DONE'];
