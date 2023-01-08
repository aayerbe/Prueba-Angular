import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initialState, issuesReducer } from 'src/app/state/issues/issues.reducer';
import { StoreModule } from '@ngrx/store';
import { SearchComponent } from './search.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { IssuesEffects } from 'src/app/state/issues/issues.effect';


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockStore:MockStore
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers:[
        provideMockStore({initialState})
        
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

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockStore=TestBed.inject(MockStore)
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial state of loaded false', () => {
     
     mockStore.subscribe((res:any)=>{
      expect(res.loaded).toBeFalse()
     })
  });
  it('Search button should be disabled if Owner or Repository are empty',()=>{
    const btn=fixture.debugElement.query(By.css('button'))
    component.ownerUrl=''
    component.repoUrl=''
    fixture.detectChanges()
     expect(btn.nativeElement.disabled).toBeTrue()
  })
  it('Search button should not be disabled if Owner or Repository are not empty',()=>{
    const btn=fixture.debugElement.query(By.css('button'))
    component.ownerUrl='Owner'
    component.repoUrl='Repository'
    fixture.detectChanges()
     expect(btn.nativeElement.disabled).toBeFalse()
  })
  it('Should be an error message if something went wrong',()=>{
    component.showError=true
    fixture.detectChanges()
    const error=fixture.debugElement.query(By.css('label.error'))
    mockStore.subscribe((res)=>{
       expect(error.nativeElement).toBeTruthy()
    })
  })


});
