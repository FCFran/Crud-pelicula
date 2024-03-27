import { Component, ViewChild } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { PeliculaPage } from '../model/pelicula-page';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from '../model/pelicula';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  movie$:Observable<PeliculaPage>|null = null;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  pageIndex = 0;
  pageSize = 0;



  constructor(
    private movieService:MovieService,
    private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private _snackBar:MatSnackBar
    ){
    this.refresh()
  }
  refresh(pageEvent:PageEvent={length:0, pageIndex:0, pageSize:10} ){
    this.movie$ = this.movieService.listAll(pageEvent.pageIndex, pageEvent.pageSize).pipe(
      tap(() =>{
        this.pageIndex = pageEvent.pageIndex
        this.pageSize = pageEvent.pageSize
      }
      ),
      catchError(error =>{
      this.onError("Error al cargar los datos de las Peliculas")
      return of({pelicula:[], totalElements:0, totalPages:0})
    } )
    )
    //console.log(this.movie$.subscribe())
  }

  onError(msg:string){
    this.dialog.open(ErrorDialogComponent,{
      data:msg
    })
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo:this.route})
  }

  onEdit(pelicula:Pelicula){
    this.router.navigate(['edit', pelicula.idPelicula], {relativeTo:this.route})
  }

  onDelete(pelicula:Pelicula){
   const dialogRef =  this.dialog.open(ConfirmationDialogComponent,{
      data:'¿Tiene certeza de eliminar esta Película?',
      width: '350px',
      enterAnimationDuration:'1000ms', // duracion de mostrarse
      exitAnimationDuration:'1050ms' // duracion que demora en desvanecerse
    });

    dialogRef.afterClosed().subscribe((result:boolean) =>{
      if(result){
        this.movieService.delete(pelicula.idPelicula).subscribe(
          () =>{
            this.refresh();
            this._snackBar.open("Película removida con Exito", "X", {
                duration:5000,
                verticalPosition:'top',
                horizontalPosition:'center',
                panelClass:'light-success-snackbar'
            })
          },
          error =>{
            this.onError("Error al Eliminar Película")
          }

        )
      }
    })
  }
}
