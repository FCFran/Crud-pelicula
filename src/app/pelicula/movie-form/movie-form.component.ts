
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Pelicula } from '../model/pelicula';
import { Router, ActivatedRoute } from '@angular/router';

import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { GeneroService } from '../../generos/services/genero.service';
import { tap } from 'rxjs';
import { MovieService } from '../service/movie.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Genero } from '../../generos/model/genero';


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']

})
export class MovieFormComponent implements OnInit {


  generos: Genero [] = []

  nuevoGenero: Genero = {id:0, name:"", description:""};

  constructor(
    private route:ActivatedRoute,
    private formBuilder : NonNullableFormBuilder,
    private generoService:GeneroService,
    private movieService:MovieService,
    private location:Location,
    private _snackBar:MatSnackBar,
    /* fecha */
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,

  ){

     /* fecha  */
     this._locale = 'fr';
     this._adapter.setLocale(this._locale);
     this.updateCloseButtonLabel('Fermer le calendrier');
     /* fin Fecha*/

     /* Listar todos los generos de peliculas */
     this.generoService.listAllGenero().subscribe(
       data => {
         this.generos = data
         console.log(data)}
     )


  }

  form = this.formBuilder.group({
    idPelicula:0,
    titulo:["", [Validators.required,
                 Validators.minLength(2),
                 Validators.maxLength(100)]],
    director:["",Validators.required],
    fechaEstreno: [new Date(), Validators.required],
    genero: this.generos
  })




  ngOnInit(): void {
    const pelicula: Pelicula = this.route.snapshot.data["pelicula"]

    this.form.setValue({
      idPelicula:Number(pelicula.idPelicula),
      titulo: pelicula.titulo,
      director: pelicula.director,
      fechaEstreno: pelicula.fechaEstreno,
      genero:pelicula.genero
    })
  }


  /* fecha */

  getDateFormatString(): string {
  return 'DD/MM/YYYY';
}


updateCloseButtonLabel(label: string) {
  this._intl.closeCalendarLabel = label;
  this._intl.changes.next();
}


compararCargos(obj:any , obj2:any){
  return obj && obj2 && obj.id == obj2.id
}

 /* Mensajes de guardado y actualizado */
  onSuccess(msg:string , color:string){
    this._snackBar.open(msg, 'X', {
      duration:50000,
      panelClass:[color]
    })
  }
  /* Mensaje de error */
  onError(){
    this._snackBar.open("Error al guardar Pelicula", 'X', {
      duration:50000,
      panelClass:['error-snackbar']
    })
  }

 /* guardar y actulizar */
  onSubmit(){
    this.movieService.save(this.form.value).subscribe(
      data =>{
        const pelicula: Pelicula = this.route.snapshot.data["pelicula"]
        if(data.idPelicula == pelicula.idPelicula){
          this.onSuccess("Pelicula Actulizado con éxito", 'success-snackbar')
        }else{
          this.onSuccess("Pelicula se guardo con éxito",'success-snackbar')
        }
      },
      error => {this.onError();}
    )
  }


  onCancel(){
    this.location.back()
  }


  /* mensaje de error en los validadores de input */

  getErrorMessage(fileName:string){

    const field = this.form.get(fileName)

    if(field != null && field.hasError('required')){
      return `Campo requerido`
    }

    if(field?.hasError('pattern'))
    return 'campo permite solo dígitos';

    if(field?.hasError('minlength')){
      const requiredLength:number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamaño minimo ${requiredLength} caracteres`
    }
    if(field?.hasError('maxlength')){
      const requiredLength:number = field.errors ? field.errors['maxlength']['requiredLength'] : 10;
      return `Tamaño maxmo ${requiredLength} caracteres`
    }


    return 'campo invalido';
  }
}
