import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  items = [{ name: "Item1" }, { name: "Item2" }];
  items1 = [{ name: "DST1" }, { name: "DST2" }];

  item: any;
  onDrop(dd: any) {
    this.item = dd;
  }

  trashTag1(dd:any) {
    if(dd.tag == 'tag1') {
      let i = this.items.indexOf(dd.drag);
      this.items.splice(i,1);
    }
  }
  trashTag2(dd: any) {
    if (dd.tag == 'tag2') {
      let i = this.items.indexOf(dd.drag);
      this.items.splice(i, 1);
    }
  }
}
