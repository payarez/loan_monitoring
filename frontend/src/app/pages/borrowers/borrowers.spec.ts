import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Borrowers } from './borrowers';

describe('Borrowers', () => {
  let component: Borrowers;
  let fixture: ComponentFixture<Borrowers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Borrowers],
    }).compileComponents();

    fixture = TestBed.createComponent(Borrowers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
