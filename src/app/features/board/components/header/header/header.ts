import {Component, input, output} from '@angular/core';
import {Button} from "../../../../../shared/components/button/button";
import {StatusTotal} from '../../../../../shared/models/status';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [Button, MatChipSet, MatChip, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public onCreateTicket = output();
  public statuses = input.required<StatusTotal[]>();
}
