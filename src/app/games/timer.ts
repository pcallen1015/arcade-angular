import { Subject } from 'rxjs/Subject';

/**
 * A simple timer for time-based game functionality
 */
export class Timer {
    /**
     * The amount of time (seconds) remaining on the timer
     */
    private _timeRemaining: number;

    /**
     * The interval duration (milliseconds)
     */
    private _interval: number;

    /**
     * Initialize the timer
     * @param duration 
     */
    constructor(duration: number) {
        this._timeRemaining = duration;
        this._interval = 1000;
    }

    /**
     * Start the timer and broadcast as time ticks away
     */
    public start(): Subject<number> {
        let obs: Subject<number> = new Subject<number>();

        let timer = setInterval(() => {
            this._timeRemaining--;
            obs.next(this._timeRemaining);
            if (this._timeRemaining <= 0) {
                clearInterval(timer);
                obs.complete();
            }
        }, this._interval);

        return obs;
    }
}