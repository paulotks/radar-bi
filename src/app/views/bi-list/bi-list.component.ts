import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {BiCardComponent} from '@components/bi-card/bi-card.component';
import {BiListService} from '@services/bi-list-service/bi-list.service';
import {SidenavService} from '@services/sidenav-service/sidenav.service';
import {BiItem, Department, Tag} from '../../core/models/posts/posts.model';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatListItem, MatListModule, MatNavList} from '@angular/material/list';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {CommonModule} from '@angular/common';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {LayoutComponent} from '@components/layout/layout.component';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-bi-list',
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, BiCardComponent, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, MatButtonModule, MatIcon, MatListItem, MatNavList, LayoutComponent, MatPaginatorModule],
  templateUrl: './bi-list.component.html',
  styleUrl: './bi-list.component.scss'
})
export class BiListComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private biListService = inject(BiListService);
  private sidenavService = inject(SidenavService);

  readonly isCollapsed = this.sidenavService.isCollapsed;

  // Signals puros
  protected biItems = signal<BiItem[]>([]);
  protected departments = signal<Department[]>([]);
  protected allTags = signal<Tag[]>([]);

  // ftilros signals
  protected searchQuery = signal<string>('');
  protected selectedDepartment = signal<number[]>([]);
  protected selectedTags = signal<number[]>([]);

  //paginator signals
  protected pageSize = signal(5);
  protected pageIndex = signal(0);

  constructor() {
    this.loadData();

  }

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

  setSearchQuery(value: string): void {
    this.searchQuery.set(value);
    this.resetPagination();
  }

  setSelectedDepartment(values: number[]): void {
    this.selectedDepartment.set(values);
    this.resetPagination();
  }

  setSelectedTags(values: number[]): void {
    this.selectedTags.set(values);
    this.resetPagination();
  }

  private resetPagination(): void {
    this.pageIndex.set(0);
    this.paginator.firstPage(); // pode ser opcional, dependendo do uso
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  private loadData(): void {
    this.biListService.getPosts().subscribe(items => {
      let orderItems = items.sort((a, b) => b.id - a.id);

      this.biItems.set(orderItems);

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

  paginatedItemsComputed = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredItems().slice(start, start + this.pageSize());
  });


  handlePageEvent(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }

  protected resetFilters(): void {
    this.searchQuery.set('');
    this.selectedDepartment.set([]);
    this.selectedTags.set([]);
    this.resetPagination();
  }
}
