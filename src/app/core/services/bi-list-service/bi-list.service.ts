import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BiItem} from '../../models/posts/posts.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiListService {
  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getPosts(): Observable<BiItem[]> {
    return this.http.get<BiItem[]>(`${this.apiUrl}/posts`);
  }

}
