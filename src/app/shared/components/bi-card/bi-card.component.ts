import {Component, inject, input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {BiItem} from '../../../core/models/posts/posts.model';
import {NgOptimizedImage} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ImageDialogComponent} from '@components/image-dialog/image-dialog.component';

@Component({
  selector: 'app-bi-card',
  imports: [MatCardModule, MatButtonModule, MatChipsModule, NgOptimizedImage],
  templateUrl: './bi-card.component.html',
  styleUrl: './bi-card.component.scss'
})
export class BiCardComponent {

  readonly dialog = inject(MatDialog);

  post = input.required<BiItem>();

  openBiLink(url: string) {
    window.open(url, '_blank');
  }

  openImageModal(imageUrl: string, imageTitle: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl, imageTitle },
      maxWidth: '90vw',
      maxHeight: '90vh'
    });
  }

}
