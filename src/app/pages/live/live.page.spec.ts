import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LivePage } from './live.page';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: LivePage;
  let fixture: ComponentFixture<LivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LivePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [TranslateModule.forRoot(), RouterTestingModule, NgxWebstorageModule.forRoot(), HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
