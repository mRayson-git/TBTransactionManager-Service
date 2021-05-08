import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserInformationComponent } from './parser-information.component';

describe('ParserInformationComponent', () => {
  let component: ParserInformationComponent;
  let fixture: ComponentFixture<ParserInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParserInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
