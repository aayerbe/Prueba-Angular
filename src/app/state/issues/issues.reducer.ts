
import { createReducer, on } from "@ngrx/store";
import { Issue } from "../../interfaces/issue.interface";
import { initalStateIssueAction, issuesListAction } from "./issues.action";
import { IssuesState } from "./issues.state";


export const initialState:IssuesState={
   issuesList:[{
    title:'',
    number:0,
    label:[''],
    user:''
   }],
   loaded:false,
   errorMessage:''

   
}

export const issuesReducer=createReducer(
    initialState,
    on(issuesListAction,(state,{issues})=>({issuesList:issues.issuesList,loaded:issues.loaded,errorMessage:issues.errorMessage})),
    on(initalStateIssueAction,(state)=>({issuesList:initialState.issuesList,loaded:false,errorMessage:''}))
)