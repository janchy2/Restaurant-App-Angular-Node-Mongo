import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObradaRezervacijeComponent } from './obrada-rezervacije.component';

describe('ObradaRezervacijeComponent', () => {
  let component: ObradaRezervacijeComponent;
  let fixture: ComponentFixture<ObradaRezervacijeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObradaRezervacijeComponent]
    });
    fixture = TestBed.createComponent(ObradaRezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
