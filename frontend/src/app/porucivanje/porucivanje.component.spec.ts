import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorucivanjeComponent } from './porucivanje.component';

describe('PorucivanjeComponent', () => {
  let component: PorucivanjeComponent;
  let fixture: ComponentFixture<PorucivanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorucivanjeComponent]
    });
    fixture = TestBed.createComponent(PorucivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
