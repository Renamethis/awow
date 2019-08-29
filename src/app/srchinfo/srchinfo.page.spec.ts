import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrchinfoPage } from './srchinfo.page';

describe('SrchinfoPage', () => {
  let component: SrchinfoPage;
  let fixture: ComponentFixture<SrchinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrchinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrchinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
