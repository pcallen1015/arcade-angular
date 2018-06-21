import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GameComponent } from '../game-component';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {
  @ViewChild(GameComponent) game: GameComponent;

  private _gameId: string;
  public get gameId(): string { return this._gameId; }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('gameId'));
      this._gameId = params.get('gameId');
    });
  }

  public newGame(): void {
    if (this.game) this.game.newGame();
  }

}
