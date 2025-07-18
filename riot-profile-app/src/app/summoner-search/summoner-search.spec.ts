import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerSearch } from './summoner-search';

describe('SummonerSearch', () => {
  let component: SummonerSearch;
  let fixture: ComponentFixture<SummonerSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummonerSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummonerSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
