import { Injectable } from "@angular/core"
import { Note } from "../models/note"
import { Observable, iif, of, take, tap, throwError } from "rxjs"

@Injectable()
export class NotesService {

  loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in vehicula odio. 
    In elementum condimentum turpis id ullamcorper. Integer pulvinar ac lorem vel interdum. 
    Vivamus vestibulum metus vel augue pellentesque dignissim. Nam posuere commodo odio quis aliquam. 
    Curabitur placerat maximus pretium. Aenean suscipit, metus a vestibulum vehicula, lectus neque placerat orci, et ultrices nibh felis sed orci. 
    Praesent consectetur tellus sapien, condimentum rutrum tortor maximus eu. Nam velit erat, iaculis in metus dignissim, efficitur tincidunt dui. 
    Integer at ornare lorem. Nunc ut posuere lorem, ac ultricies nisi. Sed rhoncus suscipit nisi, quis gravida augue lacinia sed. 
    Quisque id libero nec sem imperdiet tempor vitae eget justo. Quisque sollicitudin sodales egestas.`

  notesServerMockData: Array<Note> = [
    {
      id: 1,
      title: "Note1",
      description: this.loremIpsum,
      dateTime: null,
    },
    {
      id: 2,
      title: "Note2",
      description: this.loremIpsum,
      dateTime: null,
    },
    {
      id: 3,
      title: "Note3",
      description: this.loremIpsum,
      dateTime: null,
    },
    {
      id: 4,
      title: "Note4",
      description: this.loremIpsum,
      dateTime: null,
    }
  ]
  constructor() { }

  getNotesList(): Observable<Array<Note>> {
    console.log("Get notes")
    return of(this.notesServerMockData.slice()).pipe(take(1))
  }

  getNote(id: number): Observable<Note> {
    const note = this.notesServerMockData.find((note) => note.id === id)
    return iif(() => !!note, of(note as Note),  throwError( () => new Error("Note not found"))).pipe(take(1))
  }

  createNote(newNote: Omit<Note, "id">): Observable<Note> {
    console.log("Add note", newNote)
    const maxId = Math.max(...this.notesServerMockData.map((mockNote: Note) => mockNote.id)) + 1
    const updatedNote: Note = {...newNote, id: maxId}
    return of(updatedNote).pipe(tap((note: Note) => { this.notesServerMockData.push(note) }), take(1))
  }

  editNote(newNote: Note) {
    console.log("edit Note", newNote.id)
    return of(newNote).pipe(tap((noteToEdit: Note) => {
      this.notesServerMockData = this.notesServerMockData.map( (note: Note) => {
        if ( note.id === noteToEdit.id) {
          note = {...noteToEdit}
        }
        return note
      })
    }))
  }

  deleteNote(id: number): Observable<Note> {
    console.log("Delete note", id)
    const noteToDelete = this.notesServerMockData.find((note: Note) => note.id === id)
    return iif( () => !!noteToDelete, of(noteToDelete as Note), throwError( () => new Error("Note not found"))).pipe(
      tap( (noteToDelete: Note) => {
        const index = this.notesServerMockData.findIndex((note: Note) => note.id === noteToDelete.id)
        this.notesServerMockData.splice(index, 1)
      }),
      take(1)
    )
  }

  
}
