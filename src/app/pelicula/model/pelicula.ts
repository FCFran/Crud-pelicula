import { Genero } from '../../generos/model/genero';
export interface Pelicula {
  idPelicula:number;
  titulo:string;
  director:string;
  fechaEstreno:Date;
  genero:Genero;
}
