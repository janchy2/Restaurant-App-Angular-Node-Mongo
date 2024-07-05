import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorudzbineKonobarComponent } from './porudzbine-konobar.component';

describe('PorudzbineKonobarComponent', () => {
  let component: PorudzbineKonobarComponent;
  let fixture: ComponentFixture<PorudzbineKonobarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorudzbineKonobarComponent]
    });
    fixture = TestBed.createComponent(PorudzbineKonobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
