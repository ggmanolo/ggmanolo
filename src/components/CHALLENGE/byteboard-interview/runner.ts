import { loadActivities, loadMetroGraph, loadUserRequests } from './midpointUtils';
import { ETACalculator } from './etaCalculator';
import { suggestMidpointActivity } from './suggestion';

const main = async () => {
  const etaCalculator = new ETACalculator(await loadMetroGraph());
  const userRequests = await loadUserRequests();
  const activities = await loadActivities();

  console.log('Finding suggested activities...\n');

  for (const userRequest of userRequests) {
    const suggestion = suggestMidpointActivity(
      userRequest.user1Location,
      userRequest.user2Location,
      activities,
      etaCalculator,
    );
    if (suggestion === null) {
      console.log(`No suggestion generated for request: ${userRequest.toString()}`);
    } else {
      console.log(`Suggested activity for request: ${userRequest.toString()}`);
      suggestion.printDetails();
    }
    console.log();
  }
};

main();
