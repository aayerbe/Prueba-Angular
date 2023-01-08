import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue } from '../interfaces/issue.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  issues(url:string):Observable<Array<Issue>>{

   return this.http.get<Array<Issue>>(url)
  
}

}