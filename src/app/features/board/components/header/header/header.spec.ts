import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Header} from './header';
import {inputBinding} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';


describe('Header Component', () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Header,
        TranslateModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header, {
      bindings: [
        inputBinding('statuses', () => ["TODO", "DONE"]),
      ]
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
