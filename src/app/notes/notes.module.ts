import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { NotesRoutingModule } from "./notes-routing.module"
import { NotesComponent } from "./notes/notes.component"
import { NotesService } from "./services/notes.service"
import { NoteEditComponent } from "./note-edit/note-edit.component"
import { ReactiveFormsModule } from "@angular/forms"


@NgModule({
  declarations: [NotesComponent, NoteEditComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [NotesService]
})
export class NotesModule { }
