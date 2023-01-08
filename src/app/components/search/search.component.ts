import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { searchIssuesAction } from 'src/app/state/issues/issues.action';
import { IssuesState } from 'src/app/state/issues/issues.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  ownerUrl:string
  repoUrl:string
  error$:Observable<IssuesState>
  showError:boolean
  constructor(
    private store:Store<{issueState:IssuesState }>
  ){
    this.ownerUrl=''
    this.repoUrl=''
    this.error$=store.select('issueState')
    this.showError=false
  }
 
  getIssues(){
    const url=`https://api.github.com/repos/${this.ownerUrl}/${this.repoUrl}/issues?per_page=100`
    this.store.dispatch(searchIssuesAction({url}))
   this.error$.subscribe((res)=>{
      if(res.errorMessage!='') this.showError=true
   })
  }

  
  

}
