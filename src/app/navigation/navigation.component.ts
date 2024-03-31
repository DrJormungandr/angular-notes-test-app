import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})

export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
