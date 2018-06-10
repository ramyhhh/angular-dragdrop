# @angular/dragdrop
A simple angular 2+ directive based on HTML 5 native drag drop API
## Demo
Please check the project page
[https://codesandbox.io/s/github/ramyhhh/angular-dragdrop](https://codesandbox.io/s/github/ramyhhh/angular-dragdrop/tree/master/)

## Make element draggable
Just add **drag** directive
```html
<div drag >
	This div is now draggable
</div>
```
## Enable dropping on elemet 
Just add **drop** directive, and handle **dropped** event
```html
<div drop (dropped)="onDropped($event)">
	This div is now draggable
</div>
```
## Working with state
It is useful to wrap objects inside the drag drop event and help in working the application state, and understand how it is connected to the drag drop behaviour.
Just bind the the **drag** directive with the targeted object, additional you can transfer another object by binding into **drag-collection** 
You can also bind to the **drop** directive and the **drop-collection** as well
```html
<div *ngFor="let item of items" [drag]="item" [drag-collection]="items" >{{item.name}}</div>
```
### Automatic state manipulation
It's not recommended to allow state to be mutatid in this fation, but sometimes being lazy is being happy, to automaticly remove and item from an array, just bind the item to **drag** and bind the array to **drag-collection** and set **drag-out** to true
```html
<div *ngFor="let item of items" [drag]="item" [drag-collection]="items" drag-out="true" >{{item.name}}</div>
```
And to automaticly insert item by dropping, bind to **drag** and **drop** and **drop-collection** and set **drop-in** to true
```html
<div *ngFor="let item of items" [drag]="item" [drag-collection]="items" drag-out="true" >{{item.name}}</div>
<div *ngFor="let item of items" [drop]="item" [drop-collection]="items" drop-in="true" >{{item.name}}</div>
```
### To make collection sortable by drag & drop
Just bind **drag** and **drop** the list items 
```html
<div *ngFor="let item of items" 
	[drag]="item" [drag-collection]="items" drag-out="true" 
	[drop]="item" [drop-collection]="items" drop-in="true" >
	{{item.name}}
</div>
```
## Drag tag
You can bind to **drag-tag** to wrap it inside drag drop event, which is usefull to tell the dropped handler extra information about the drag source.
```html
<div *ngFor="let item of items" [drag]="item" drag-tag="tag" >{{item.name}}</div>
```
## Drag drop styling
Classes are added and removed by default to element being dragged, and element being dragged over, the follwing style will make it clear
```css
[drag],[ng-reflect-drag] {
  cursor: pointer;
}

[drop],[ng-reflect-drop] {
  border: solid 1px #ccc;
  padding: 10px;
}
.dragging { opacity: 0.5; border: dotted 2px #ccc }
.drag-over { border: dashed 2px #ccc; }
```
# Getting started
Go to [https://codesandbox.io/s/github/ramyhhh/angular-dragdrop](project page), and copy dd.ts to your project, and make sure to declare the directives within you ngModule.
**and that's it** , sorry for not packaging it with npm, maybe later :)
