import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { SearchComponent } from './components/search/search.component';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { issuesReducer } from './state/issues/issues.reducer';
import { IssuesEffects } from './state/issues/issues.effect';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ListComponent } from './components/list/list.component'
import {MatTableModule} from '@angular/material/table';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent
  ],
  imports: [
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
    
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
