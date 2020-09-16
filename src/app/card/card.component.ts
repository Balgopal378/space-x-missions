import { Component, OnInit, Input } from '@angular/core';
import { LaunchDetail } from '../models/launch-detail';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    @Input() launchDetail: LaunchDetail;
    constructor() { }

    ngOnInit(): void {
    }

}
