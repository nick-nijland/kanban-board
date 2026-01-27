import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button} from './shared/components/button/button';
import {BoardPage} from './features/board/board.page';

@Component({
  selector: 'app-root',
  imports: [
    BoardPage
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('kanban-board');
}
