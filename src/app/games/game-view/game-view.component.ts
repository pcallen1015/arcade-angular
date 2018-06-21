import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GameComponent } from '../game-component';
import { Game, GamesService } from '../games.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {
  @ViewChild(GameComponent) gameRef: GameComponent;

  private _game: Game;
  public get game(): Game { return this._game; }

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this._game = this.gamesService.getGame(params.get('gameId'));
    });
  }

  public newGame(): void {
    if (this.game) this.gameRef.newGame();
  }

}
