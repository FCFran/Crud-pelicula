import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genero } from '../model/genero';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  private readonly Api = "http://localhost:8080/genero"
  constructor(private httpClient:HttpClient) {}

  listAllGenero(){
    return this.httpClient.get<Genero[]>(this.Api).pipe(
      first()
    );
  }
}
