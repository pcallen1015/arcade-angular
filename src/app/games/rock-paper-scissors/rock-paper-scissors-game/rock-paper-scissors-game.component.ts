import { Component, OnInit, forwardRef } from '@angular/core';
import { GameComponent } from '../../game-component';
import { GamesService } from '../../games.service';

/**
 * Rock-Paper-Scissors game
 */
@Component({
  selector: 'rock-paper-scissors-game',
  templateUrl: './rock-paper-scissors-game.component.html',
  styleUrls: ['./rock-paper-scissors-game.component.scss'],
  providers: [{ provide: GameComponent, useExisting: forwardRef(() => RockPaperScissorsGameComponent) }]
})
export class RockPaperScissorsGameComponent extends GameComponent implements OnInit {

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
   * Start a new game
   */
  public newGame(): void {
    console.info('Starting a new Rock-Paper-Scissors game');
  }

}
