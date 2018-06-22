import { Component, OnInit } from '@angular/core';
import { Game, GamesService } from '../games.service';

/**
 * Component that displays the available games and allows users to navigate to a game
 */
@Component({
  selector: 'app-browse-games',
  templateUrl: './browse-games.component.html',
  styleUrls: ['./browse-games.component.scss']
})
export class BrowseGamesComponent implements OnInit {

  /**
   * The available games
   */
  private _games: Game[] = [];

  /**
   * Get the available games
   */
  public get games(): Game[] { return this._games; }

  /**
   * Initialize the component
   * @param gamesService 
   */
  constructor(private gamesService: GamesService) { }

  /**
   * Get the list of available games from GamesService
   */
  private initGames(): void {
    this._games = this.gamesService.games;
  }

  /**
   * Initialize the component
   */
  public ngOnInit(): void {
    this.initGames();
  }

}
