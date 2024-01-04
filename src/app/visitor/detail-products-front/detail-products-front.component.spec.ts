import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductsFrontComponent } from './detail-products-front.component';

describe('DetailProductsFrontComponent', () => {
  let component: DetailProductsFrontComponent;
  let fixture: ComponentFixture<DetailProductsFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProductsFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProductsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
