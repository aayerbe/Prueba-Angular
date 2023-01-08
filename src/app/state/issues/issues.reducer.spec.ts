
import { initalStateIssueAction, issuesListAction } from './issues.action';
import { initialState, issuesReducer } from "./issues.reducer";
import { IssuesState } from './issues.state';
describe('Reducer', () => {

  it('should have initial state of loaded false', () => {
    const action = { type: 'foo' } as any;
    expect(issuesReducer(undefined,action)).toEqual(initialState);
  });

  it('should have a loaded set to true', () => {
    const newState:IssuesState=
    {
      issuesList:[{
        title:"Create script to fill database with mock-data",
        number:150,
        label:["backend,ml"],
        user:"Alex"
      }],
      loaded:true,
      errorMessage:''
    }

     const action=issuesListAction({issues:newState})
     const expectedState:IssuesState={
      ...initialState,issuesList:newState.issuesList,loaded:newState.loaded,errorMessage:newState.errorMessage}
     const result=issuesReducer(initialState,action)
     expect(result).toEqual(expectedState)
  });

  it('should restart the state',()=>{
    const state:IssuesState={      
      issuesList:[{
        title:"Create script to fill database with mock-data",
        number:150,
        label:["backend,ml"],
        user:"Alex"
      }],
        loaded:true,
        errorMessage:''
     }
    const expectedState={
      ...state,issuesList:initialState.issuesList,loaded:initialState.loaded,errorMessage:initialState.errorMessage
    }
    const action=initalStateIssueAction()
    const result=issuesReducer(state,action)
    expect(result).toEqual(expectedState)
  })
});