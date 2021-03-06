import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  baseUrl: string = 'http://localhost:3000/providers/';

  constructor(private http: HttpClient) { }

  getProviders(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }


  getProvider(id): Observable<any> {
    return this.http.get<any>(this.baseUrl+id);
  }




  addProvider(body): Observable<any> {
    return this.http.post<any>(this.baseUrl,body);
  }

  updateProvider(body): Observable<any> {
    return this.http.put<any>(this.baseUrl,body);
  }


  deleteProvider(id):Observable<any>{
    return this.http.delete<any>(this.baseUrl+"/"+id);
  }

}
