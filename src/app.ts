import {Component, NgZone, ChangeDetectorRef} from '@angular/core';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
	selector: 'with-zone-app',
	template: `
		<svg width="550" height="550" (mousedown)="mouseDown($event)"
		(mouseup)="mouseUp($event)">
			<svg:g box *ngFor="let box of boxes" [box]="box" [selected]="box.id == currentId"></svg:g>
		</svg>
	`
})
export class AppComponent {

	constructor(private zone: NgZone) {}

	currentId = null;
	boxes = [];
	offsetX;
	offsetY;
	element;

	ngOnInit() {
		for (let i=0; i < 10000; i++) {
	      const id = i;
	      const x = getRandomInt(0, 500);
	      const y = getRandomInt(0, 500);
	      const box = {
	        id,
	        x,
	        y
	      };
	      this.boxes.push(box);
	    }
	}

	bindMouse = (ev) => {
		this.mouseMove(ev);
	}

	mouseDown(event) {
		const id = Number(event.target.getAttribute("dataId"));
		const box = this.boxes[id];
	    const mouseX = event.clientX;
	    const mouseY = event.clientY;
	    this.offsetX = box.x - mouseX;
	    this.offsetY = box.y - mouseY;
	    this.currentId = id;

		this.element = event.target;
		this.zone.runOutsideAngular(() => {
			window.document.addEventListener("mousemove", this.bindMouse);
		});
	}

	mouseMove(event) {
		event.preventDefault();
		this.element.setAttribute("x", event.clientX + this.offsetX + 'px');
		this.element.setAttribute("y", event.clientY + this.offsetY + 'px');
	}

	mouseUp($event) {
		this.zone.run(() => {
			this.updateBox(this.currentId, $event.clientX + this.offsetX, $event.clientY + this.offsetY);
			this.currentId = null;
			this.offsetX = null;
			this.offsetY = null;
		}); 
		window.document.removeEventListener("mousemove", this.bindMouse);
	}

	updateBox(id, x, y) {
		const box = this.boxes[id];
		box.x = x;
		box.y = y;
	}
}

@Component({
	selector: 'without-zone-app',
	template: `
		<svg width="550" height="550" (mousedown)="mouseDown($event)"
      	(mousemove)="mouseMove($event)"
      	(mouseup)="mouseUp($event)">
			<svg:g box *ngFor="let box of boxes" [box]="box" [selected]="box.id == currentId"></svg:g>
		</svg>
	`
})
export class withoutZoneAppComponent {

	constructor(private zone: NgZone) {}

	currentId = null;
	boxes = [];
	offsetX;
	offsetY;
	element;

	ngOnInit() {
		for (let i=0; i < 10000; i++) {
	      const id = i;
	      const x = getRandomInt(0, 500);
	      const y = getRandomInt(0, 500);
	      const box = {
	        id,
	        x,
	        y
	      };
	      this.boxes.push(box);
	    }
	}

	mouseDown(event) {
	    const id = Number(event.target.getAttribute("dataId"));
	    const box = this.boxes[id];
	    const mouseX = event.clientX;
	    const mouseY = event.clientY;
	    this.offsetX = box.x - mouseX;
	    this.offsetY = box.y - mouseY;
	    this.currentId = id;
	}

  	mouseMove(event) {
	    event.preventDefault();
	    if (this.currentId !== null) {
	      this.updateBox(this.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY);
	    }
  	}

  	mouseUp($event) {
  	  this.currentId = null;
  	}

  	updateBox(id, x, y) {
	    const box = this.boxes[id];
	    box.x = x;
	    box.y = y;
  	}
}