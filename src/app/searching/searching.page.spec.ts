import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingPage } from './searching.page';

describe('SearchingPage', () => {
  let component: SearchingPage;
  let fixture: ComponentFixture<SearchingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
