import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class Game {
  id: string;
  name: string;
}

const GAMES: Game[] = [
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
  }, {
    id: 'rock-paper-scissors',
    name: 'Rock-Paper-Scissors'
  }
]

@Injectable()
export class GamesService {

  constructor(private http: HttpClient) { }

  public get games(): Game[] { return GAMES; }

  public getGame(gameId: string) { return GAMES.find((game: Game) => game.id === gameId); }

  public reportWin(game: string, winner: string): Observable<any> {
    return this.http.post('/local/wins', { player: winner, game: game, playedOn: new Date()}).map((data: any) => {
      console.info(`${game} win reported for player ${winner}`);
    }, (error: Error) => {
      console.error(`Failed to report ${game} win for player ${winner}`);
    });
  }

}
