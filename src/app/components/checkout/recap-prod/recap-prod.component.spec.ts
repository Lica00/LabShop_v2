import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapProdComponent } from './recap-prod.component';

describe('RecapProdComponent', () => {
  let component: RecapProdComponent;
  let fixture: ComponentFixture<RecapProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecapProdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecapProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
