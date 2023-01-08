import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import {StoreModule } from '@ngrx/store';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { initialState, issuesReducer } from './state/issues/issues.reducer';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { IssuesEffects } from './state/issues/issues.effect';

describe('AppComponent', () => {
  let component:AppComponent;
  let mockStore:MockStore
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchComponent
       
      ],
      imports:[
        HttpClientTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({issueState:issuesReducer}),
        FormsModule,
        HttpClientModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        EffectsModule.forRoot([IssuesEffects]),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          registrationStrategy: 'registerWhenStable:3000'
    })
      ],
      providers:[
        provideMockStore(({initialState}))
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore=TestBed.inject(MockStore)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it('should have initial state ',()=>{
    mockStore.subscribe((res)=>{
      
    expect(res).toEqual(initialState)
  })    
  })

 
});
