import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { peliculaResolver } from './guards/pelicula.resolver';

const routes: Routes = [
  {path:"", component:MovieComponent},
  {path:"new", component:MovieFormComponent, resolve:{pelicula:peliculaResolver}},
  {path:"edit/:id", component:MovieFormComponent, resolve:{pelicula:peliculaResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculaRoutingModule { }
