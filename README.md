# @angular/dragdrop
A simple angular 2+ directive based on HTML 5 native drag drop API

## Make element draggable
Just add **drag** directive
```html
<div drag >
	This div is now draggable
</div>
```
## Enable dropping on elemet 
Just add **drop** directive
```html
<div drop >
	This div is now draggable
</div>
```
## Transfer object within dragging (Working with app state) 
Just bnind the the **drag** directive with the targeted object, additional you can transfer another object by binding into **drag-collection** 
```html
<div *ngFor="let item of items" [drag]="item" [drag-collection]="items" >{{item.name}}</div>
```
