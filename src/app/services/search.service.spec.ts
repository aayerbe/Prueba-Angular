import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpClientSpy:{get:jasmine.Spy}

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy=jasmine.createSpyObj('HttpClient',['get'])
    service=new SearchService(httpClientSpy as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return issues array',(done:DoneFn)=>{
    const mockIssueList=[{
      title:"Create script to fill database with mock-data",
      number:150,
      label:["backend,ml"],
      user:"Alex"
    }]
    const url="https://api.github.com/repos/OPEN_AI/Open-Assistant/issues?per_page=100"
    httpClientSpy.get.and.returnValue(of(mockIssueList))
    service.issues(url).subscribe((res)=>{
      expect(res).toEqual(mockIssueList)
      done()
    })
  })
});
