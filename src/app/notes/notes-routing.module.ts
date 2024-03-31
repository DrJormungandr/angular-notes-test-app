import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { NotesComponent } from "./notes/notes.component"
import { NoteEditComponent } from "./note-edit/note-edit.component"

const routes: Routes = [
  {path: "", component: NotesComponent},
  {path: "note", component: NoteEditComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
