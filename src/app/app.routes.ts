import { Routes } from '@angular/router';
import { BoardPage } from './features/board/board.page';

export const routes: Routes = [
  { path: '', component: BoardPage },
  { path: '**', redirectTo: '' },
];
