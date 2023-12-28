import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsFrontComponent } from './list-products-front.component';

describe('ListProductsFrontComponent', () => {
  let component: ListProductsFrontComponent;
  let fixture: ComponentFixture<ListProductsFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
