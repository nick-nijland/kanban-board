import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Card, NewCard} from '../../../shared/models/card';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private apiUrl = '/api/tickets';

  constructor(private http: HttpClient) { }

  public getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  public createCard(newCard: NewCard): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, newCard);
  }

  public updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${card.id}`, card);
  }

  public deleteCard(card: Card): Observable<Card> {
    return this.http.delete<Card>(`${this.apiUrl}/${card.id}`);
  }

}

