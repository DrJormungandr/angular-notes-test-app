import { Component, OnInit } from "@angular/core"
import { RemindersService } from "../services/reminders.service"
import { FormControl, Validators } from "@angular/forms"
import { Reminder } from "../models/reminder"

@Component({
  selector: "app-reminders",
  templateUrl: "./reminders.component.html",
  styleUrl: "./reminders.component.scss"
})
export class RemindersComponent implements OnInit {

  reminders: Array<Reminder> = []
  
  constructor( private remindersService: RemindersService ) { }

  get buttonEnabled() {
    return this.date.valid
  }

  ngOnInit(): void {
    this.remindersService.getReminders().subscribe(
      (remindersList: Array<Reminder>) => {
        this.reminders = remindersList
      }
    )
  }

  public description = new FormControl("", {nonNullable: true})
  public date = new FormControl("", {nonNullable: true, validators: [Validators.required]})

  public createReminder() {
    const newReminder: Omit<Reminder, "id"> = {
      description: this.description.value,
      dueDate: new Date(this.date.value).getUTCDate() 
    }
    this.remindersService.createReminder(newReminder).subscribe(
      (reminder: Reminder) => {
        this.reminders.push(reminder)
      }
    )
  }

}
