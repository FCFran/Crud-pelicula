import { Pelicula } from './pelicula';
export interface PeliculaPage {
  pelicula: Pelicula[];
  totalElements:number;
  totalPages:number;
}
