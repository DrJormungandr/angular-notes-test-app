import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags/tags.component';
import { TagsService } from './services/tags.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TagsComponent
  ],
  imports: [
    CommonModule,
    TagsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    TagsService
  ]
})
export class TagsModule { }
