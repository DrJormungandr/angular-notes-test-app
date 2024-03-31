import { Injectable } from "@angular/core"
import { Observable, of, take, tap } from "rxjs"
import { Reminder } from "../models/reminder"

@Injectable()
export class RemindersService {

  constructor() { }

  remindersServerMockData: Array<Reminder> = [
    {
      id: 1,
      description: "Reminder 1",
      dueDate: Date.now() + 86400000,
    },
    {
      id: 2,
      description: "Reminder 2",
      dueDate: Date.now() + 86412000,
    },
    {
      id: 3,
      description: "Reminder 3",
      dueDate: Date.now() + 86448000,
    },
    {
      id: 4,
      description: "Reminder 4",
      dueDate: Date.now() + 86520000,
    }
  ]

  getReminders(): Observable<Array<Reminder>> {
    console.log("Get reminders")
    return of(this.remindersServerMockData.slice()).pipe(take(1))
  }

  createReminder(newReminder: Omit<Reminder, "id">): Observable<Reminder> {
    console.log("Add reminder", newReminder)
    const maxId = Math.max(...this.remindersServerMockData.map((mockReminder: Reminder) => mockReminder.id)) + 1
    const updatedReminder: Reminder = {...newReminder, id: maxId}
    return of(updatedReminder).pipe(tap((reminder: Reminder) => { this.remindersServerMockData.push(reminder) }), take(1))
  }
  
}
