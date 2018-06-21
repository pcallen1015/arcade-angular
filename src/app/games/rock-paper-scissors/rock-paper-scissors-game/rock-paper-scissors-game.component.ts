import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../games.service';

@Component({
  selector: 'rock-paper-scissors-game',
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrls: ['./rock-paper-scissors-game.component.scss']
})
export class RockPaperScissorsGameComponent implements OnInit {

  private _moves: string[] = ['rock', 'paper', 'scissors'];
  public get moves(): string[] { return this._moves; }

  private _winStates: string[] = ['rock/scissors', 'paper/rock', 'scissors/paper'];

  private _playing: boolean = false;
  public get playing(): boolean { return this._playing; }

  private _timeRemaining: number = 3;
  public get timeRemaining(): number { return this._timeRemaining; }

  private _choosingMove: boolean = false;
  public get choosingMove(): boolean { return this._choosingMove; }

  private _outcome: string;
  public get outcome(): string { return this._outcome; }

  private _playerMove: string;
  public get playerMove(): string { return this._playerMove; }

  private _opponentMove: string;
  public get opponentMove(): string { return this._opponentMove; }

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.reset();
  }

  private determineOpponentsMove(): string {
    let i: number = Math.floor(Math.random() * (this._moves.length - 1));
    return this._moves[i];
  }

  private checkResult(): string {
    let state: string[] = [this._playerMove, this._opponentMove];

    if ((this._playerMove && !this._opponentMove) || (this._winStates.indexOf(state.join('/')) > -1)) return 'win';
    if ((this._opponentMove && !this._playerMove) || (this._winStates.indexOf(state.reverse().join('/')) > -1)) return 'lose';
    return 'draw';
  }

  public start(): void {
    this._playing = true;
    this._choosingMove = true;

    // Determine opponent's move
    this._opponentMove = this.determineOpponentsMove();

    let timer = setInterval(() => {
      if (--this._timeRemaining <= 0) {
        // continue
        clearInterval(timer);

        this._choosingMove = false;

        // determine result
        this._outcome = this.checkResult();

        if (this._outcome !== 'draw') this.gamesService.reportWin('Rock-Paper-Scissors', this._outcome === 'win' ? 'Human' : 'Computer').subscribe(() => console.log('win reported'));
      }
    }, 1000);
  }

  public chooseMove(choice: string): void {
    this._playerMove = choice;
    console.info(`Move: ${this._playerMove}`);
  }

  public reset(): void {
    this._playing = false;
    this._choosingMove = false;
    this._timeRemaining = 3;
    this._outcome = undefined;
    this._playerMove = undefined;
    this._opponentMove = undefined;
  }

}
