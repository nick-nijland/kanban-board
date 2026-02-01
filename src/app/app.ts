import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardStore } from './features/board/store/board.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [BoardStore],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
