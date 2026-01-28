import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Card} from '../../../shared/models/card';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = '/api/tickets';

  constructor(private http: HttpClient) { }

  public getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

}

