import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorReservasComponent } from './monitor-reservas.component';

describe('MonitorReservasComponent', () => {
  let component: MonitorReservasComponent;
  let fixture: ComponentFixture<MonitorReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitorReservasComponent]
    });
    fixture = TestBed.createComponent(MonitorReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
