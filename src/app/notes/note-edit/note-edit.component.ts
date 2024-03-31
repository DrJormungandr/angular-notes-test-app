import { Component, OnInit } from "@angular/core";
import { NotesService } from "../services/notes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Note } from "../models/note";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-note-edit",
  templateUrl: "./note-edit.component.html",
  styleUrl: "./note-edit.component.scss"
})
export class NoteEditComponent implements OnInit{

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute, 
    private router: Router,
  ) {}

  public id: number | null = null
  public title = new FormControl<string>("", {nonNullable: true})
  public description = new FormControl<string>("", {nonNullable: true})

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get("id")
    if(id != null) {
      this.notesService.getNote(+id).subscribe(
        (res: Note) => {
          this.id = res.id
          this.title.setValue(res.title)
          this.description.setValue(res.description)
        }
      )
    }
  }

  public saveNote() {
    const newNote: Note | Omit<Note, "id"> = {
      title: this.title.value,
      description: this.description.value,
    }
    if (this.id) {
      (newNote as Note).id = this.id
      this.notesService.editNote(newNote as Note).subscribe(
        () => { this.backToList() }
      )
    } else {
      this.notesService.createNote(newNote).subscribe(
        () => { this.backToList() }
      )
    }
  }

  public backToList() {
    this.router.navigate(["../../"], {relativeTo: this.route})
  }

}
