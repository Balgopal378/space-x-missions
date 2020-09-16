import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LAUNCH_YEAR_FILTERS, SUCCESSFULL_LANDING_FILTERS, SUCCESSFULL_LAUNCH_FILTERS } from '../constants/filters.constant';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
    @Output() yearFilterChanged: EventEmitter<{[key: string]: string}> = new EventEmitter(null);
    @Output() launchFilterChanged: EventEmitter<{[key: string]: string}> = new EventEmitter(null);
    @Output() landingFilterChanged: EventEmitter<{[key: string]: string}> = new EventEmitter(null);
    previousYearElement: HTMLElement;
    previousLaunchElement: HTMLElement;
    previousLandElement: HTMLElement;
    yearFilterOptions = LAUNCH_YEAR_FILTERS;
    launchFilterOptions = SUCCESSFULL_LAUNCH_FILTERS;
    landingFilterOptions = SUCCESSFULL_LANDING_FILTERS;
    constructor() { }

    ngOnInit(): void {
    }

    onYearFilterChange(val: {[key: string]: string}) {
        this.yearFilterChanged.emit(val);
    }

    onLaunchFilterChange(val: {[key: string]: string}) {
        this.launchFilterChanged.emit(val);
    }

    onLandingFilterChange(val: {[key: string]: string}) {
        this.landingFilterChanged.emit(val);
    }

    onYearFilterOptionsClick(event) {
        const clickedElement = event.target || event.srcElement;
        if ( clickedElement.nodeName === 'BUTTON' ) {
            if (this.previousYearElement === clickedElement) {
                this.previousYearElement.classList.remove('active');
                this.previousYearElement = null;
                return;
            }
            if (this.previousYearElement) {
                this.previousYearElement.classList.remove('active');
            }
            const isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector('.active');
            // if a Button already has Class: .active
            if ( isCertainButtonAlreadyActive ) {
                isCertainButtonAlreadyActive.classList.remove('active');
            } else {
                clickedElement.className += ' active';
                this.previousYearElement = clickedElement;
            }
        }

    }

    onLaunchFilterOptionsClick(event) {
        const clickedElement = event.target || event.srcElement;
        if ( clickedElement.nodeName === 'BUTTON' ) {
            if (this.previousLaunchElement === clickedElement) {
                this.previousLaunchElement.classList.remove('active');
                this.previousLaunchElement = null;
                return;
            }
            if (this.previousLaunchElement) {
                this.previousLaunchElement.classList.remove('active');
            }
            const isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector('.active');
            // if a Button already has Class: .active
            if ( isCertainButtonAlreadyActive ) {
                isCertainButtonAlreadyActive.classList.remove('active');
            } else {
                clickedElement.className += ' active';
                this.previousLaunchElement = clickedElement;
            }
        }
    }

    onLandFilterOptionsClick(event) {
        const clickedElement = event.target || event.srcElement;
        if ( clickedElement.nodeName === 'BUTTON' ) {
            if (this.previousLandElement === clickedElement) {
                this.previousLandElement.classList.remove('active');
                this.previousLandElement = null;
                return;
            }
            if (this.previousLandElement) {
                this.previousLandElement.classList.remove('active');
            }
            const isCertainButtonAlreadyActive = clickedElement.parentElement.querySelector('.active');
            // if a Button already has Class: .active
            if ( isCertainButtonAlreadyActive ) {
                isCertainButtonAlreadyActive.classList.remove('active');
            } else {
                clickedElement.className += ' active';
                this.previousLandElement = clickedElement;
            }
        }
    }
}
