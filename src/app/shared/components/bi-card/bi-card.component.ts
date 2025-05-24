import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-bi-card',
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './bi-card.component.html',
  styleUrl: './bi-card.component.scss'
})
export class BiCardComponent {

}
