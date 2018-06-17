import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GamesService {

  constructor(private http: HttpClient) { }

  public reportWin(game: string, winner: string): Observable<any> {
    return this.http.post('/local/wins', { player: winner, game: game, playedOn: new Date()});
  }

}
