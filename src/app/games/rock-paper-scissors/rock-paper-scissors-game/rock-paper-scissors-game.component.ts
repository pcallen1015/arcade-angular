import { Component, OnInit, forwardRef } from '@angular/core';
import { GameComponent } from '../../game-component';
import { GamesService } from '../../games.service';

enum RockPaperScissorsResult {
  win = 'win',
  lose = 'lose',
  draw = 'draw'
}

const MOVES: string[] = ['rock', 'paper', 'scissors'];
const WIN_STATES: string[] = ['rock/scissors', 'paper/rock', 'scissors/paper'];
const MOVE_TIME_LIMIT: number = 3;

@Component({
  selector: 'rock-paper-scissors-game',
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrls: ['./rock-paper-scissors-game.component.scss'],
  providers: [{ provide: GameComponent, useExisting: forwardRef(() => RockPaperScissorsGameComponent)}]
})
export class RockPaperScissorsGameComponent extends GameComponent implements OnInit {

  public get moves(): string[] { return MOVES; }

  private _playing: boolean = false;
  public get playing(): boolean { return this._playing; }

  private _timeRemaining: number = MOVE_TIME_LIMIT;
  public get timeRemaining(): number { return this._timeRemaining; }

  private _choosingMove: boolean = false;
  public get choosingMove(): boolean { return this._choosingMove; }

  private _outcome: RockPaperScissorsResult;
  public get outcome(): RockPaperScissorsResult { return this._outcome; }

  private _playerMove: string;
  public get playerMove(): string { return this._playerMove; }

  private _opponentMove: string;
  public get opponentMove(): string { return this._opponentMove; }

  constructor(private gamesService: GamesService) { super(); }

  public ngOnInit(): void {
    this.newGame();
  }

  private checkResult(): RockPaperScissorsResult {
    let state: string[] = [this._playerMove, this._opponentMove];

    if ((this._playerMove && !this._opponentMove) || (WIN_STATES.indexOf(state.join('/')) > -1)) return RockPaperScissorsResult.win;
    if ((this._opponentMove && !this._playerMove) || (WIN_STATES.indexOf(state.reverse().join('/')) > -1)) return RockPaperScissorsResult.lose;
    return RockPaperScissorsResult.draw;
  }

  public start(): void {
    this._playing = true;
    this._choosingMove = true;

    // Determine opponent's move
    this._opponentMove = MOVES[Math.floor(Math.random() * (MOVES.length - 1))];

    let timer = setInterval(() => {
      if (--this._timeRemaining <= 0) {
        // continue
        clearInterval(timer);

        this._choosingMove = false;

        // determine result
        this._outcome = this.checkResult();

        if (this._outcome !== 'draw') this.gamesService.reportWin('Rock-Paper-Scissors', this._outcome === 'win' ? 'Human' : 'Computer').subscribe();
      }
    }, 1000);
  }

  public chooseMove(choice: string): void {
    this._playerMove = choice;
    console.info(`Move: ${this._playerMove}`);
  }

  public newGame(): void {
    console.info('Starting a new Rock-Paper-Scissors game');
    this._playing = this._choosingMove = false;
    this._timeRemaining = MOVE_TIME_LIMIT;
    this._outcome = this._playerMove = this._opponentMove = undefined;
  }

}
