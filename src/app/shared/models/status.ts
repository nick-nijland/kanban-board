export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export const statuses: Status[] = ['TODO', 'IN_PROGRESS', 'DONE'];

export const STATUS_I18N_KEYS: Record<Status, string> = {
  TODO: 'board.status.todo',
  IN_PROGRESS: 'board.status.inProgress',
  DONE: 'board.status.done',
};
