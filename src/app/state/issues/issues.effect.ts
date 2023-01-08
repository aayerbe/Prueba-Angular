import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { issuesListAction, searchIssuesAction } from './issues.action';
import { initialState } from './issues.reducer';

 
@Injectable()
export class IssuesEffects {
  

  issueListEffect$=createEffect(()=>{
    return this.actions$.pipe(
        ofType(searchIssuesAction),
        mergeMap((action)=>{
            return this.searchService.issues(action.url).pipe(
                map((res)=>{
                return issuesListAction({issues:{issuesList:res,loaded:true,errorMessage:''}})
                }
                ),             
                catchError((err)=>{
                  return of(issuesListAction({issues:
                    {issuesList:initialState.issuesList,loaded:false,errorMessage:err.error.message}
                  }))
                })
            ) 
        })
    )
  })
 
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
   
  ) {}
}