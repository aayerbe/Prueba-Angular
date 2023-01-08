import { HttpClientModule } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IssuesEffects } from 'src/app/state/issues/issues.effect';
import { initialState, issuesReducer } from 'src/app/state/issues/issues.reducer';
import { IssuesState } from 'src/app/state/issues/issues.state';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockStore:MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers:[
        provideMockStore({initialState}),
      ],
      imports:[
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
      registrationStrategy: 'registerWhenStable:30000'
    })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore=TestBed.inject(MockStore)
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should test the data table',()=>{
    const issueState:IssuesState={      
        issuesList:[{
          title:"Create script to fill database with mock-data",
          number:150,
          label:["backend,ml"],
          user:"Alex"
        }],
        loaded:true,
        errorMessage:''
     }
     const tableData:IssuesState={      
      issuesList:[{
        title:"Create script to fill database with mock-data",
        number:150,
        label:["backend,ml"],
        user:"Alex"
      }],
      loaded:true,
      errorMessage:''
   }
     mockStore.setState(issueState)
     fixture.detectChanges()
     mockStore.subscribe((res)=>{
      expect(tableData).toEqual(issueState)
     })
  })
  
});
