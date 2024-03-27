import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Pelicula } from '../model/pelicula';
import { MovieService } from '../service/movie.service';


export const peliculaResolver: ResolveFn<Pelicula> = (route, state) => {

  const movieService = inject(MovieService);

  if(route.params && route.params['id']){
    return movieService.findById(Number(route.params['id']))
  }
  return {idPelicula:0, titulo:'', director:'', fechaEstreno:new Date, genero:{id:0, name:'', description:''}};
};
