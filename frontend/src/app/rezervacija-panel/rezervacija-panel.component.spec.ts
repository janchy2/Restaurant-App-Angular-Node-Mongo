import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijaPanelComponent } from './rezervacija-panel.component';

describe('RezervacijaPanelComponent', () => {
  let component: RezervacijaPanelComponent;
  let fixture: ComponentFixture<RezervacijaPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RezervacijaPanelComponent]
    });
    fixture = TestBed.createComponent(RezervacijaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
