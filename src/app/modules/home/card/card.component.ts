import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title: string = "";
  @Input() total: number = 0;
  @Input() icon: string = "";
  @Input() route: string = "";
}
