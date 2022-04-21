import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from './Endereco';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EnderecosService {
  // url = 'https://localhost:5001/api/enderecos';
  url = 'https://localhost:5001/api/endereco';
  constructor(private http: HttpClient) { }

  GetAll(): Observable<Endereco[]>{
    return this.http.get<Endereco[]>(this.url);
  }

  GetById(id: number): Observable<Endereco>{
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Endereco>(apiUrl);
  }

  Post(endereco: Endereco): Observable<any>{
    return this.http.post<Endereco>(this.url, endereco, httpOptions);
  }

  // Update(endereco: Endereco): Observable<any>{
  //   return this.http.put<Endereco>(this.url, endereco, httpOptions);
  // }
  
  Update(endereco: Endereco): Observable<Endereco>{
    return this.http.put<Endereco>(this.url + '/' + endereco.id , endereco, httpOptions);
  }
  
  // Delete(enderecoId: number): Observable<any>{
  //   const apiUrl = `${this.url}/${enderecoId}`;
  //   return this.http.delete<number>(apiUrl, httpOptions);
  // }

  Delete(endereco: Endereco){
    // const apiUrl = `${this.url}/${enderecoId}`;
    return this.http.delete<Endereco>(this.url + '/' + endereco, httpOptions);
  }

}
