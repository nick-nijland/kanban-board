import {Component, OnInit, signal} from '@angular/core';
import {BoardPage} from './features/board/board.page';
import {HttpClient} from '@angular/common/http';
import {Card} from './shared/models/card';

@Component({
  selector: 'app-root',
  imports: [
    BoardPage
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('kanban-board');

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.http.get<Card[]>('/api/tickets').subscribe(tickets => {
      console.warn(tickets);
    });
  };

}

