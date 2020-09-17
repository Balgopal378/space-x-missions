import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {
    @Input() option: {[key: string]: string};
    @Output() yearFilterChanged: EventEmitter<{[key: string]: string}> = new EventEmitter(null);
    @Output() launchFilterChanged: EventEmitter<{[key: string]: string}> = new EventEmitter(null);
    @Output() landingFilterChanged: EventEmitter<{[key: string]: string}> = new EventEmitter(null);

    onClick(val: {[key: string]: string}) {
        if (val.name === 'year') {
            this.yearFilterChanged.emit(val);
        }
        if (val.name === 'launch') {
            this.launchFilterChanged.emit(val);
        }
        if (val.name === 'land') {
            this.landingFilterChanged.emit(val);
        }
    }
}
