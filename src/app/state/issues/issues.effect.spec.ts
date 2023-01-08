import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { IssuesEffects } from "./issues.effect"
import { initialState } from "./issues.reducer";
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject } from "rxjs";
import { SearchService } from "src/app/services/search.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
describe('Effect',()=>{
   let effect:IssuesEffects
   let actions$:Observable<any>
   let mockStore:MockStore
  let service: SearchService;
  let httpClientSpy:{get:jasmine.Spy}

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers:[
                 IssuesEffects,
                provideMockStore({initialState}),
                 provideMockActions(()=>actions$),
                 SearchService,
                 HttpClient,
                 HttpHandler
                
            ]
         
        });
     httpClientSpy=jasmine.createSpyObj('HttpClient',['get'])
     service=new SearchService(httpClientSpy as any)
    effect=TestBed.inject(IssuesEffects)   
    mockStore=TestBed.inject(MockStore)
        
      });

      it('should be created', () => {
        expect(effect).toBeTruthy(); 
    });    
    
})


