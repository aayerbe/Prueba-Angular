import { Issue } from "src/app/interfaces/issue.interface";

export interface IssuesState{
    issuesList:Array<Issue>,
    loaded:boolean,
    errorMessage:string
}