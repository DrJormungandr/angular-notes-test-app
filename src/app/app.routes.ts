import { Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
  { path: "", redirectTo: "notes", pathMatch: "full"},
  { path: "notes", loadChildren: () => import("./notes/notes.module").then( m => m.NotesModule )},
  { path: "reminders", loadChildren: () => import("./reminders/reminders.module").then( m => m.RemindersModule )},
  { path: "tags", loadChildren: () => import("./tags/tags.module").then( m => m.TagsModule )},
  { path: "**", component: NotFoundComponent},
];
