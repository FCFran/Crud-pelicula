import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { PeliculaPage } from '../model/pelicula-page';
import { Pelicula } from '../model/pelicula';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly API = "http://localhost:8080/pelicula";

  constructor(private httpClient:HttpClient) { }

  listAll(page=0, size=10){
    return this.httpClient.get<PeliculaPage>(this.API,{params:{page,size}}).pipe(
      first(),
      tap(movie => console.log(movie))
    );
  }

  findById(id:number){
    return this.httpClient.get<Pelicula>(`${this.API}/${id}`)
  }

  save(record:Partial<Pelicula>){
    
    if(record.idPelicula != 0){
      return this.update(record)
    }
    return this.create(record)
  }

  create(record:Partial<Pelicula>){
    return this.httpClient.post<Pelicula>(this.API, record).pipe(first());
  }

  update(record:Partial<Pelicula>){
    return this.httpClient.put<Pelicula>(`${this.API}/${record.idPelicula}`, record).pipe(first())
  }

  delete(id:number){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first())
  }




}
