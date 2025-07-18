import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerData } from './summoner-data';

describe('SummonerData', () => {
  let component: SummonerData;
  let fixture: ComponentFixture<SummonerData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummonerData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummonerData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
