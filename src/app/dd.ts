import {
  ElementRef,
  Directive,
  HostListener,
  HostBinding,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Directive({
  selector: "[drop]"
})
export class DropDirective {
  @Input() drop: any;
  @Input("drop-collection") dropCollection: any[];
  @Input("drop-in") dropIn = false;
  @Input("drag-over-class") dragOverClass = "drag-over";
  @Input("drop-files") dropFiles = false;

  @Output() dropped = new EventEmitter<any>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor(public el: ElementRef) {}

  @HostListener("drop", ["$event"])
  onDrop($event) {
    //handle event
    $event.preventDefault();
    $event.stopPropagation();

    //transfer state
    let key = $event.dataTransfer.getData("text");
    let dropEvent = this.getDropEvent(key);
    if (this.dropFiles) dropEvent["files"] = $event.dataTransfer.files;

    //manipulate binding state (when dragOut or dropIn enabled)
    let fromIndex = dropEvent.dragCollection
      ? dropEvent.dragCollection.indexOf(dropEvent.drag)
      : -1;
    let toIndex = dropEvent.dropCollection
      ? dropEvent.dropCollection.indexOf(dropEvent.drop)
      : -1;

    if (fromIndex != -1 && DragDirective.$cache[key].dragOut)
      fromIndex = dropEvent.dragCollection.splice(fromIndex, 1);

    if (this.dropIn && dropEvent.dropCollection) {
      if (dropEvent.drop)
        dropEvent.dropCollection.splice(toIndex, 0, dropEvent.drag);
      else dropEvent.dropCollection.push(dropEvent.drag);
    }

    delete DragDirective.$cache[key]; //clean up

    //emit
    this.dropped.emit(dropEvent);
    this.hovered.emit(false);
    if (this.dragOverClass)
      this.el.nativeElement.classList.remove(this.dragOverClass);
  }

  getDropEvent(key: string) {
    if (!DragDirective.$cache[key])
      return {
        drag: null,
        dragCollection: null,
        drop: null,
        dropCollection: null,
        tag: null
      };
    return {
      drag: DragDirective.$cache[key].drag,
      dragCollection: DragDirective.$cache[key].dragCollection,
      drop: this.drop,
      dropCollection: this.dropCollection,
      tag: DragDirective.$cache[key].dragTag
    };
  }

  @HostListener("dragover", ["$event"])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
    if (this.dragOverClass)
      this.el.nativeElement.classList.add(this.dragOverClass);
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);

    if (this.dragOverClass)
      this.el.nativeElement.classList.remove(this.dragOverClass);
  }
}

@Directive({
  selector: "[drag]",
  host: { draggable: "true" }
})
export class DragDirective {
  @Input() drag: any;
  @Input("drag-collection") dragCollection: any[];
  @Input("drag-out") dragOut = false;
  @Input("dragging-class") draggingClass: string = "dragging";
  @Input('drag-tag') dragTag : string;

  static $cache = {};

  constructor(public el: ElementRef) {}

  @HostListener("dragstart", ["$event"])
  onDragStart($event) {
    $event.stopPropagation(); //if drag started on child, don't call drag on parents

    let key = Date.now().toString();
    $event.dataTransfer.setData("text", key);

    DragDirective.$cache[key] = {};
    DragDirective.$cache[key].drag = this.drag;
    DragDirective.$cache[key].dragCollection = this.dragCollection;
    DragDirective.$cache[key].dragOut = this.dragOut;
    DragDirective.$cache[key].dragTag = this.dragTag;

    if (this.draggingClass)
      this.el.nativeElement.classList.add(this.draggingClass);
  }

  @HostListener("dragend", ["$event"])
  onDragEnd($event) {
    $event.preventDefault();
    if (this.draggingClass)
      this.el.nativeElement.classList.remove(this.draggingClass);
  }
}
