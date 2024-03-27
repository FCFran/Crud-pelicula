import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PeliculaModule } from './pelicula/pelicula.module';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"movie",
  loadChildren:() => import("./pelicula/pelicula.module").then(m => PeliculaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
