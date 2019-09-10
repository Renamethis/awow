import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansPage } from './clans.page';

describe('ClansPage', () => {
  let component: ClansPage;
  let fixture: ComponentFixture<ClansPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClansPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
