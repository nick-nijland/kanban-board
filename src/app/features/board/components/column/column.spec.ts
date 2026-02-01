import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Column } from './column';
import { Ticket } from '../ticket/ticket';
import { Card } from '../../../../shared/models/card';
import { Status, statuses } from '../../../../shared/models/status';
import { CdkDrag, CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import {inputBinding} from '@angular/core';

describe('Column Component', () => {
  let fixture: ComponentFixture<Column>;
  let component: Column;

  const mockStatus: Status = 'TODO';
  const mockCards: Card[] = [
    { id: 1, title: 'Card 1', description: 'Desc 1', status: 'TODO' },
    { id: 2, title: 'Card 2', description: 'Desc 2', status: 'TODO' },
  ];
  const mockConnectedTo: Status[] = ['TODO', 'DONE'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Column,
        Ticket,
        CdkDrag,
        CdkDropList,
        TranslateModule.forRoot(), // Provides TranslateService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Column, {
      bindings: [
        inputBinding('status', () => mockStatus),
        inputBinding('cards', () => mockCards),
        inputBinding('connectedTo', () => mockConnectedTo),
      ]
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have status input set', () => {
    expect(component.status()).toBe(mockStatus);
  });

  it('should have cards input set', () => {
    expect(component.cards()).toEqual(mockCards);
  });

  it('should have connectedTo input set', () => {
    expect(component.connectedTo()).toEqual(mockConnectedTo);
  });

  it('should return connectedTo IDs correctly', () => {
    const expectedIds = mockConnectedTo.map(status => component.idPrefix + status);
    expect(component.getConnectedTo()).toEqual(expectedIds);
  });
});
