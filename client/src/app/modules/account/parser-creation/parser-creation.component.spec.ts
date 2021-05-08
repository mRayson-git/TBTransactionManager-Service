import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserCreationComponent } from './parser-creation.component';

describe('ParserCreationComponent', () => {
  let component: ParserCreationComponent;
  let fixture: ComponentFixture<ParserCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParserCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
