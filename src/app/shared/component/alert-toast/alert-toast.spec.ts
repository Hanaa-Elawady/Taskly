import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertToast } from './alert-toast';

describe('AlertToast', () => {
  let component: AlertToast;
  let fixture: ComponentFixture<AlertToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertToast],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertToast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
