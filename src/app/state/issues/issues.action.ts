import { createAction, props } from "@ngrx/store";

import { IssuesState } from "./issues.state";

export const searchIssuesAction=createAction(
    '[Search Component] Search', props<{url:string}>()
)

export const issuesListAction=createAction(
    '[List Component] Issues list loaded', props<{issues:IssuesState}>()
)

export const initalStateIssueAction=createAction(
    '[List component] Restart state'
)

