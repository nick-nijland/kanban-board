import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Button } from './button';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { inputBinding } from '@angular/core';

describe('Button Component', () => {
  let fixture: ComponentFixture<Button>;
  let component: Button;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Button, {
      bindings: [
        inputBinding('text', () => 'Klik hier'),
        inputBinding('disabled', () => false),
        inputBinding('type', () => 'outlined' as MatButtonAppearance),
      ],
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
