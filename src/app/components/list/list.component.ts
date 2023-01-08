import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Issue } from 'src/app/interfaces/issue.interface';
import { initalStateIssueAction } from 'src/app/state/issues/issues.action';
import { IssuesState } from 'src/app/state/issues/issues.state';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  issues$:Observable<IssuesState>
  dataSource:MatTableDataSource<Issue>
  displayedColumns: string[] = ['title','label'];
  color:string='#BD5AE7'
  date:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store:Store<{issueState:IssuesState}>,
    
  )
  {
    this.issues$=store.select('issueState')
    this.dataSource = new MatTableDataSource<Issue>();
    this.date=Date.now()
  }

  ngOnInit(): void {
    this.issues$.subscribe((res)=>{
     this.dataSource = new MatTableDataSource<Issue>(res.issuesList)
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  anotherSearch(){
    this.store.dispatch(initalStateIssueAction())
  }
  createdAt(data:string){
    const timestamp=new Date(data).getTime()
    const minutes=Math.trunc((this.date-timestamp)/60000)
    const hours=Math.trunc((this.date-timestamp)/3600000)
    const days=Math.trunc((this.date-timestamp)/86400000)
    if(days>0) return `created ${days} days ago`
    else if(days==0 && hours>0) return `created ${hours} hours ago`
    else if(days==0 && hours==0)return `created ${minutes} minutes ago`
    else return ""
  }
}
