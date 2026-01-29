import {Component, output} from '@angular/core';
import {Button} from "../../../../../shared/components/button/button";
import {Card} from '../../../../../shared/models/card';

@Component({
  selector: 'app-header',
    imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public onCreateTicket = output();
}
