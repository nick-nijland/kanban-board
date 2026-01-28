import {Component} from '@angular/core';
import {BoardStore} from './features/board/store/board.store';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [BoardStore],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}

