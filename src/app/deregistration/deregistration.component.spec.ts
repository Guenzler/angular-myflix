import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeregistrationComponent } from './deregistration.component';

describe('DeregistrationComponent', () => {
  let component: DeregistrationComponent;
  let fixture: ComponentFixture<DeregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeregistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
