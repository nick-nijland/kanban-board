export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
export interface StatusTotal {
  status: Status;
  total: number;
}
export const statuses: Status[] = ['TODO', 'IN_PROGRESS', 'DONE'];
