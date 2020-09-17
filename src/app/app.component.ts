import { Component } from '@angular/core';

/**
 * The root component
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    /**
     * The title
     */
    title = 'SpaceX Launch Programs';

    /**
     * The author
     */
    author = 'Balgopal Prusty';
}
