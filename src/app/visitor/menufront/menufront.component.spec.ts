import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenufrontComponent } from './menufront.component';

describe('MenufrontComponent', () => {
  let component: MenufrontComponent;
  let fixture: ComponentFixture<MenufrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenufrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenufrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
