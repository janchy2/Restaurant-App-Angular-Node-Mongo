import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorudzbineGostComponent } from './porudzbine-gost.component';

describe('PorudzbineGostComponent', () => {
  let component: PorudzbineGostComponent;
  let fixture: ComponentFixture<PorudzbineGostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorudzbineGostComponent]
    });
    fixture = TestBed.createComponent(PorudzbineGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
