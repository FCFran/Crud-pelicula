import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from '../model/pelicula';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
@Input() movie:Pelicula[] = []
displayedColumns: string[] = ['titulo', 'director','fechaEstreno','genero', 'actions'];

@Output() add = new EventEmitter(false)
@Output() edit = new EventEmitter(false)
@Output() remove = new EventEmitter(false)


onAdd(){
  this.add.emit(true);
}
onEdit(element:Pelicula){
  this.edit.emit(element)
}
onDelete(element:Pelicula){
  this.remove.emit(element)
}

}
