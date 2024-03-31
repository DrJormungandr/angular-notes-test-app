import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RemindersRoutingModule } from "./reminders-routing.module"
import { RemindersComponent } from "./reminders/reminders.component"
import { ReactiveFormsModule } from "@angular/forms"
import { RemindersService } from "./services/reminders.service"


@NgModule({
  declarations: [
    RemindersComponent
  ],
  imports: [
    CommonModule,
    RemindersRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    RemindersService,
  ]
})
export class RemindersModule { }
