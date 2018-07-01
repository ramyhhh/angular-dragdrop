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
### Automatic state manipulation (Add/remove items of array)
It's not recommended to allow state to be mutatid in this fation, but sometimes being lazy is being happy, to automaticly remove item from array. To do that just bind the item to the **drag** directive and, bind the array that you want to manipulate to **drag-collection** directive, and set **drag-out** to true. This will cause the item to be remved from the collection when dragged out.
```html
<div *ngFor="let item of items" [drag]="item" [drag-collection]="items" drag-out="true" >{{item.name}}</div>
```
To automaticly insert item to collection by dropping it in, bind to **drag** and **drop** and **drop-collection** and set **drop-in** to true
```html
<div *ngFor="let item of items" [drag]="item" [drag-collection]="items" drag-out="true" >{{item.name}}</div>
<div *ngFor="let item of items" [drop]="item" [drop-collection]="items" drop-in="true" >{{item.name}}</div>
```
### Make array sortable by drag & drop
Just bind the **drag** and **drop** directives together, and the respictive collections:
```html
<div *ngFor="let item of items" 
	[drag]="item" [drag-collection]="items" drag-out="true" 
	[drop]="item" [drop-collection]="items" drop-in="true" >
	{{item.name}}
</div>
```
## Drag tag (Know what is being dragged/dropped)
You can bind to **drag-tag** and check the tag from within the drag drop event, which is very usefull in telling the drop handler extra information about the drag source.
```html
<div *ngFor="let item of items" [drag]="item" drag-tag="tag" >{{item.name}}</div>
```
### Tag use case
Imagine you have a drop target and many drag sources in your application page, the drop target supposed only to accept certain items to be dropped in, in order for the drop target to tell what item being dropped the tag is the best way to do it. Of course you can check for specific properties or types of the item being dropped, but sometimes it's the same item same type but just a different drag source.

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
## Drag drop files (ex: Upload box)
Just set **drop-files** to tru
```html
<div drop drop-files="true" (dropped)="onDrop($event)">
	DROP ANYTHING HERE
</div>
```
# Getting started
Go to project page [https://codesandbox.io/s/github/ramyhhh/angular-dragdrop], and copy dd.ts to your project, and make sure to declare the directives within you ngModule.
Just set **drop-files** to tru
```js
@NgModule({
  declarations: [...,DragDirective,DropDirective]
 })
```
**and that's it** , sorry for not packing with npm, maybe later :)
