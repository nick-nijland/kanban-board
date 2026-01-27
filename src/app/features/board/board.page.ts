import { Component } from '@angular/core';
import {Column} from './components/column/column';
import {Card} from './components/card/card';

@Component({
  selector: 'app-board-page',
  imports: [
    Column,
    Card
  ],
  templateUrl: './board.page.html',
  styleUrl: './board.page.scss',
})
export class BoardPage {

}
