import { Component, OnInit } from "@angular/core"
import { FormControl, Validators } from "@angular/forms"
import { TagsService } from "../services/tags.service"

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrl: "./tags.component.scss"
})

export class TagsComponent implements OnInit {

  constructor(private tagsService: TagsService) {}

  public tagsList: Array<string> = []
  public newTagControl = new FormControl("", {nonNullable: true, validators: [Validators.required]})
  
  get isValid(){
    return this.newTagControl.valid
  }  
  
  ngOnInit(): void {
    this.tagsService.getTags().subscribe(
      (tags: Array<string>) => { this.tagsList = tags }
    )
  }

  public addTag() {
    this.tagsService.createTag(this.newTagControl.value).subscribe(
      (tag: string) => { this.tagsList.push(tag) } 
    )
  }

  public deleteTag(tag: string) {
    this.tagsService.deleteTag(tag).subscribe(
      (deletedTag: string) => {
        this.tagsList = this.tagsList.filter((tag: string) => tag != deletedTag)
      }
    )
  }

}
