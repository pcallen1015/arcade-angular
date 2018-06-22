import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/**
 * Basic metadata defining a Game
 */
export class Game {
  /**
   * Unique ID for the game
   */
  public id: string;

  /**
   * Name of the game
   */
  public name: string;
}

/**
 * The implemented games
 */
const GAMES: Game[] = [
  {
    id: 'tic-tac-toe',
    name: 'Tic-Tac-Toe',
  }, {
    id: 'rock-paper-scissors',
    name: 'Rock-Paper-Scissors'
  }
]

/**
 * Service for consolidating shared game-related functionality and utilities
 */
@Injectable()
export class GamesService {

  /**
   * Initialize the service
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * Get the available games
   */
  public get games(): Game[] { return GAMES; }

  /**
   * Get a single game by its ID
   * @param gameId 
   */
  public getGame(gameId: string) { return GAMES.find((game: Game) => game.id === gameId); }

  /**
   * Report a win
   * @param game 
   * @param winner 
   */
  public reportWin(game: string, winner: string): Observable<any> {
    return this.http.post('/local/wins', { player: winner, game: game, playedOn: new Date()}).map((data: any) => {
      console.info(`${game} win reported for player ${winner}`);
    }, (error: Error) => {
      console.error(`Failed to report ${game} win for player ${winner}`);
    });
  }

}
