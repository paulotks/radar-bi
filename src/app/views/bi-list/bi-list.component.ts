import {Component, computed, inject, signal} from '@angular/core';
import {BiCardComponent} from '@components/bi-card/bi-card.component';
import {BiListService} from '@services/bi-list-service/bi-list.service';
import {BiItem, Department, Tag} from '../../core/models/posts/posts.model';
import {Observable} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-bi-list',
  imports: [BiCardComponent, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule, MatButtonModule],
  templateUrl: './bi-list.component.html',
  styleUrl: './bi-list.component.scss'
})
export class BiListComponent {

  private biListService = inject(BiListService);

  protected biList$: Observable<BiItem[]> = this.biListService.getPosts();

  // Signals puros
  protected biItems = signal<BiItem[]>([]);
  protected departments = signal<Department[]>([]);
  protected allTags = signal<Tag[]>([]);

  // filtros signals
  protected searchQuery = signal<string>('');
  protected selectedDepartment = signal<number | null>(null);
  protected selectedTags = signal<number[]>([]);

  // Computed, ele observa os signals e atualiza automaticamente
  protected filteredItems = computed(() => {
    return this.biItems().filter(item => {

      //PASSAR TUDO PARA METODOS DEPOIS
      // Filtro por pesquisa
      const matchesSearch = this.searchQuery() === '' ||
        item.title.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchQuery().toLowerCase());

      // Filtro por departamento
      const matchesDepartment = this.selectedDepartment() === null ||
        item.departmentId === this.selectedDepartment();

      // filtro por tagos
      const matchesTags = this.selectedTags().length === 0 ||
        item.tags.some(tag => this.selectedTags().includes(tag.id));

      return matchesSearch && matchesDepartment && matchesTags;
    });
  });

  constructor() {
    this.loadData();
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

  protected updateSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  protected updateSelectedDepartment(departmentId: number | null): void {
    this.selectedDepartment.set(departmentId);
  }

  protected toggleTag(tagId: number): void {
    const currentTags = this.selectedTags();
    if (currentTags.includes(tagId)) {
      this.selectedTags.set(currentTags.filter(id => id !== tagId));
    } else {
      this.selectedTags.set([...currentTags, tagId]);
    }
  }

  protected resetFilters(): void {
    this.searchQuery.set('');
    this.selectedDepartment.set(null);
    this.selectedTags.set([]);
  }

  protected isTagSelected(tagId: number): boolean {
    return this.selectedTags().includes(tagId);
  }





}
