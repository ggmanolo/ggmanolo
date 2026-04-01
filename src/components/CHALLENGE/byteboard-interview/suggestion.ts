import { Activity } from './activity';
import { ETACalculator } from './etaCalculator';

// A suggestion is an activity recommended based on a given user request.
class Suggestion {
  activity: Activity;
  user1Eta: number;
  user2Eta: number;

  constructor(activity: Activity, user1Eta: number, user2Eta: number) {
    this.activity = activity;
    this.user1Eta = user1Eta;
    this.user2Eta = user2Eta;
  }

  printDetails(): void {
    console.log(`Suggested activity: ${this.activity.name}`);
    console.log(`Distance from User 1: ${this.user1Eta} minutes`);
    console.log(`Distance from User 2: ${this.user2Eta} minutes`);
  }
}

function suggestMidpointActivity(
  user1Location: [number, number],
  user2Location: [number, number],
  activities: Activity[],
  etaCalculator: ETACalculator,
): Suggestion | null {
  /**
   * Returns a suggested activity that's somewhere between the users' locations.
   */
  // TODO: Implement the function logic

  return null;
}

export { Suggestion, suggestMidpointActivity };
