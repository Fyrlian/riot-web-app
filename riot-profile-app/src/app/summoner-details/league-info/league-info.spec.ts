import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueInfo } from './league-info';

describe('LeagueInfo', () => {
  let component: LeagueInfo;
  let fixture: ComponentFixture<LeagueInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
