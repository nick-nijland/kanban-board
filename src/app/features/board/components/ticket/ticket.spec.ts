import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ticket } from './ticket';
import { Card } from '../../../../shared/models/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button } from '../../../../shared/components/button/button';
import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
import { inputBinding } from '@angular/core';

describe('Ticket Component', () => {
  let fixture: ComponentFixture<Ticket>;
  let component: Ticket;

  const mockCard: Card = {
    status: 'TODO',
    title: 'Dit is een titel',
    description: 'description',
    id: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Ticket,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        TranslatePipe,
        Button,
        TruncatePipe,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Ticket, {
      bindings: [
        inputBinding('card', () => mockCard as Card),
        inputBinding('statuses', () => ['TODO', 'DONE']),
      ],
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have card input set', () => {
    expect(component.card()).toEqual(mockCard);
  });

  it('should have statuses input set', () => {
    expect(component.statuses()).toEqual(['TODO', 'DONE']);
  });
});
