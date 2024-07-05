import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeRestoranaComponent } from './dodavanje-restorana.component';

describe('DodavanjeRestoranaComponent', () => {
  let component: DodavanjeRestoranaComponent;
  let fixture: ComponentFixture<DodavanjeRestoranaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodavanjeRestoranaComponent]
    });
    fixture = TestBed.createComponent(DodavanjeRestoranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
