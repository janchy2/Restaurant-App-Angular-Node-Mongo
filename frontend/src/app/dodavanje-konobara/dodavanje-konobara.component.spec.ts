import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeKonobaraComponent } from './dodavanje-konobara.component';

describe('DodavanjeKonobaraComponent', () => {
  let component: DodavanjeKonobaraComponent;
  let fixture: ComponentFixture<DodavanjeKonobaraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodavanjeKonobaraComponent]
    });
    fixture = TestBed.createComponent(DodavanjeKonobaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
