import { Component, OnInit, forwardRef } from '@angular/core';
import { GameComponent } from '../../game-component';
import { GamesService } from '../../games.service';

/**
 * The possible outcomes of a Rock-Paper-Scissors game
 */
enum RockPaperScissorsResult {
  win = 'win',
  lose = 'lose',
  draw = 'draw'
}

/**
 * The valid moves in a Rock-Paper-Scissors game
 */
const MOVES: string[] = ['rock', 'paper', 'scissors'];

/**
 * String representations of the win states of a Rock-Paper-Scissors game
 * 
 * e.g.:
 * [player move]/[computer move] --> player wins
 * [computer move]/[player move] --> computer wins
 */
const WIN_STATES: string[] = ['rock/scissors', 'paper/rock', 'scissors/paper'];

/**
 * The amount of time (seconds) for the player to make a move
 */
const MOVE_TIME_LIMIT: number = 3;

/**
 * Rock-Paper-Scissors game
 */
@Component({
  selector: 'rock-paper-scissors-game',
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrls: ['./rock-paper-scissors-game.component.scss'],
  providers: [{ provide: GameComponent, useExisting: forwardRef(() => RockPaperScissorsGameComponent)}]
})
export class RockPaperScissorsGameComponent extends GameComponent implements OnInit {

  /**
   * Get the acceptable moves
   */
  public get moves(): string[] { return MOVES; }

  /**
   * Track if the game is being played
   */
  private _playing: boolean = false;

  /**
   * Check if the game is currently being played
   */
  public get playing(): boolean { return this._playing; }

  /**
   * The time remaining for the player to select a move
   */
  private _timeRemaining: number = MOVE_TIME_LIMIT;

  /**
   * Get the amount of time remaining for move selection
   */
  public get timeRemaining(): number { return this._timeRemaining; }

  /**
   * Track if the player is currently choosing a move
   */
  private _choosingMove: boolean = false;

  /**
   * Check if the player is choosing a move
   */
  public get choosingMove(): boolean { return this._choosingMove; }

  /**
   * The outcome of the game
   */
  private _outcome: RockPaperScissorsResult;

  /**
   * Get the outcome of the game
   */
  public get outcome(): RockPaperScissorsResult { return this._outcome; }

  /**
   * The player (human) move
   */
  private _playerMove: string;

  /**
   * Get the player's move
   */
  public get playerMove(): string { return this._playerMove; }

  /**
   * The opponent's (computer's) move
   */
  private _opponentMove: string;

  /**
   * Get the opponent's move
   */
  public get opponentMove(): string { return this._opponentMove; }

  /**
   * Initialize the component
   * @param gamesService 
   */
  constructor(private gamesService: GamesService) { super(); }

  /**
   * Initialize the component with a new game
   */
  public ngOnInit(): void {
    this.newGame();
  }

  /**
   * Check the result of the game
   */
  private checkResult(): RockPaperScissorsResult {
    let state: string[] = [this._playerMove, this._opponentMove];

    if ((this._playerMove && !this._opponentMove) || (WIN_STATES.indexOf(state.join('/')) > -1)) return RockPaperScissorsResult.win;
    if ((this._opponentMove && !this._playerMove) || (WIN_STATES.indexOf(state.reverse().join('/')) > -1)) return RockPaperScissorsResult.lose;
    return RockPaperScissorsResult.draw;
  }

  /**
   * Start playing
   */
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

  /**
   * Take the player's move choice
   * @param choice 
   */
  public chooseMove(choice: string): void {
    this._playerMove = choice;
    console.info(`Move: ${this._playerMove}`);
  }

  /**
   * Start a new game
   */
  public newGame(): void {
    console.info('Starting a new Rock-Paper-Scissors game');
    this._playing = this._choosingMove = false;
    this._timeRemaining = MOVE_TIME_LIMIT;
    this._outcome = this._playerMove = this._opponentMove = undefined;
  }

}
