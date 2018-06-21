import { Component, OnInit } from '@angular/core';
import { Game, GamesService } from '../games.service';

@Component({
  selector: 'app-browse-games',
  templateUrl: './browse-games.component.html',
  styleUrls: ['./browse-games.component.scss']
})
export class BrowseGamesComponent implements OnInit {

  private _games: Game[] = [];
  public get games(): Game[] { return this._games; }

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this._games = this.gamesService.games;
  }

}
