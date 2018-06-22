import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GameComponent } from '../game-component';
import { Game, GamesService } from '../games.service';

/**
 * Container for a single game
 */
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  /**
   * Reference to the game loaded into the view
   */
  @ViewChild(GameComponent) gameRef: GameComponent;

  /**
   * The game loaded into the view
   */
  private _game: Game;

  /**
   * Get the game loaded into the view
   */
  public get game(): Game { return this._game; }

  /**
   * Initialize the component
   * @param route 
   * @param gamesService 
   */
  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService
  ) { }

  /**
   * Initialize the component
   */
  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this._game = this.gamesService.getGame(params.get('gameId'));
    });
  }

  /**
   * Start a new game
   */
  public newGame(): void {
    if (this.game) this.gameRef.newGame();
  }

}
