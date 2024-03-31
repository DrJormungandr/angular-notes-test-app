import { Injectable } from "@angular/core"
import { Observable, of, tap, take, iif, throwError } from "rxjs"

@Injectable()
export class TagsService {

  constructor() { }

  private tagsServerMockData: Array<string> = ["tag1", "tag2", "tag3", "tag4"]

  getTags(): Observable<Array<string>> {
    console.log("Get Tags")
    return of(this.tagsServerMockData.slice()).pipe(take(1))
  }
  
  createTag(newTag: string): Observable<string> {
    console.log("Add Tag", newTag)
    const doesExist = this.tagsServerMockData.includes(newTag)
    return iif(() => !doesExist, of(newTag), throwError(() => new Error("Tag exists"))).pipe(
      tap((tag: string) => { this.tagsServerMockData.push(tag) }), take(1)
    )
  }

  deleteTag(tag: string): Observable<string> {
    console.log("Delete tag", tag)
    const tagToDelete = this.tagsServerMockData.find((serverTag: string) => serverTag === tag)
    return iif( () => !!tagToDelete, of(tagToDelete as string), throwError( () => new Error("Tag not found"))).pipe(
      tap( (tagToDelete: string) => {
        const index = this.tagsServerMockData.findIndex((tagForIndex: string) => tagToDelete === tagForIndex)
        this.tagsServerMockData.splice(index, 1)
      }),
      take(1)
    )
  }
}
