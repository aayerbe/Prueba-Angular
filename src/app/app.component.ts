import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IssuesState } from './state/issues/issues.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  issues$:Observable<IssuesState>
  loaded:boolean
  
  constructor(
    private store:Store<{issueState:IssuesState}>
  ){
    this.issues$=store.select('issueState')
    this.loaded=false
 
  }
 
  ngOnInit(): void {
   this.issues$.subscribe((res)=>{
    this.loaded=res.loaded
   })
  }
}
