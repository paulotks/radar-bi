import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiCardComponent } from './bi-card.component';

describe('BiCardComponent', () => {
  let component: BiCardComponent;
  let fixture: ComponentFixture<BiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
