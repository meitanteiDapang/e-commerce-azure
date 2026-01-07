import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DapangButton } from './dapang-button';

describe('DapangButton', () => {
  let component: DapangButton;
  let fixture: ComponentFixture<DapangButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DapangButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DapangButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
