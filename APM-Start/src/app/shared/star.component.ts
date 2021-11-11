import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:"star",
    templateUrl: "./star.component.html",
    styleUrls: ["./star.component.css"]
})
export class StarComponent {
    cropWidth:number = 75;
    @Input() rating:number = 0;
    @Output() ratingClicked:EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges():void {
        this.cropWidth = this.rating * 75/5
    }

    onClick(): void {
        console.log(`${this.rating} is clicked`)
        this.ratingClicked.emit(`This ${this.rating} is clicked`)
    }
}