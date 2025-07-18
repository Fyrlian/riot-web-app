import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonerDetails } from './summoner-details';

describe('SummonerDetails', () => {
  let component: SummonerDetails;
  let fixture: ComponentFixture<SummonerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummonerDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummonerDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
