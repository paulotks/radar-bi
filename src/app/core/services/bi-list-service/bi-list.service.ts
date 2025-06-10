import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, ReplaySubject, throwError} from 'rxjs';
import {BiItem} from '../../models/posts/posts.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiListService {
  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  private items$ = new ReplaySubject<BiItem[]>();

  constructor() {
    this.loadItems();
  }

  private loadItems() {
    this.http.get<BiItem[]>(`${this.apiUrl}/posts`)
      .pipe(
        catchError(error => {
          console.error('Error loading items:', error);
          this.items$.error(error);
          return throwError(() => error);
        })
      )
      .subscribe(items => {
        this.items$.next(items);
      });
  }

  getPosts(): Observable<BiItem[]> {
    return this.items$.asObservable();
  }

}
