import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {BiCardComponent} from '@components/bi-card/bi-card.component';
import {BiListService} from '@services/bi-list-service/bi-list.service';
import {BiItem, Department, Tag} from '../../core/models/posts/posts.model';
import {FormControl, FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatListItem, MatListModule, MatNavList} from '@angular/material/list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {LayoutComponent} from '@components/layout/layout.component';

@Component({
  selector: 'app-bi-list',
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, BiCardComponent, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, MatButtonModule, MatIcon, MatListItem, MatNavList, LayoutComponent],
  templateUrl: './bi-list.component.html',
  styleUrl: './bi-list.component.scss'
})
export class BiListComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  readonly isCollapsed = signal(true);

  private biListService = inject(BiListService);

  // Signals puros
  protected biItems = signal<BiItem[]>([]);
  protected departments = signal<Department[]>([]);
  protected allTags = signal<Tag[]>([]);

  // ftilros signals
  protected searchQuery = signal<string>('');
  protected selectedDepartment = signal<number[]>([]);
  protected selectedTags = signal<number[]>([]);

  // Computed, ele observa os signals e atualiza automaticamente
  protected filteredItems = computed(() => {
    return this.biItems().filter(item => {

      //PASSAR TUDO PARA METODOS DEPOIS
      // Filtro por pesquisa
      const searchText = this.searchQuery().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const matchesSearch = this.searchQuery() === '' ||
        item.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchText) ||
        item.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(searchText);

      // Filtro por departamento
      const matchesDepartment = this.selectedDepartment().length === 0 ||
        this.selectedDepartment().includes(item.department.id);

      // filtro por tagos
      const matchesTags = this.selectedTags().length === 0 ||
        item.tags.some(tag => this.selectedTags().includes(tag.id));

      return matchesSearch && matchesDepartment && matchesTags;
    });
  });

  constructor() {
    this.loadData();
  }

  toggleMenu(event: boolean) {
    if (!event) {
      this.isCollapsed.set(false);
    } else {
      this.isCollapsed.set(!this.isCollapsed());
    }
  }

  private loadData(): void {
    this.biListService.getPosts().subscribe(items => {
      this.biItems.set(items);

      // Pega os departamentos únicos dos itens
      const uniqueDepartments = Array.from(
        new Map(items.map(item => [item.department.id, item.department])).values()
      );
      this.departments.set(uniqueDepartments);

      // Pega as tags unicas de todos os itens
      const allTagsMap = new Map<number, Tag>();
      items.forEach(item => {
        item.tags.forEach(tag => {
          allTagsMap.set(tag.id, tag);
        });
      });
      this.allTags.set(Array.from(allTagsMap.values()));
    });
  }

  protected resetFilters(): void {
    this.searchQuery.set('');
    this.selectedDepartment.set([]);
    this.selectedTags.set([]);
  }

}
