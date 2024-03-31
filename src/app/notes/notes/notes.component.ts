import { Component, OnInit } from "@angular/core";
import { NotesService } from "../services/notes.service";
import { Note } from "../models/note";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrl: "./notes.component.scss"
})
export class NotesComponent implements OnInit {
  
  constructor( private notesService: NotesService) {}

  notes: Array<Note> = []

  ngOnInit(): void {
    this.notesService.getNotesList().subscribe(
      (res: Array<Note>) => {
        this.notes = res
      }
    )
  }

  deleteNote(noteId: number) {
    this.notesService.deleteNote(noteId).subscribe(
      () => {
        this.notes = this.notes.filter((note: Note) => note.id !== noteId)
      }
    )
  }

}
