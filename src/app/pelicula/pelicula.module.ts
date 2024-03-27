import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { MovieComponent } from './movie/movie.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MovieComponent,
    MovieFormComponent,
    MovieListComponent
  ],
  imports: [
    CommonModule,
    PeliculaRoutingModule,
    AppMaterialModule,
    SharedModule

  ]
})
export class PeliculaModule { }
