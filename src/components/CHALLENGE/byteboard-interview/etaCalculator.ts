import { MetroGraph } from './metroGraph';

/*
  Simple estimator for ETA between two locations based on travel by metro.

  Eventually, the goal for this project is to switch to using an external API
  that will also take into account other modes of transport, traffic, metro
  delays, and other factors that influence transportation time.

  Therefore, where possible, we'd like to aim to minimize calls to `calculate_eta`
  to minimize future API costs.
  */
class ETACalculator {
  metroGraph: MetroGraph;

  constructor(metroGraph: MetroGraph) {
    this.metroGraph = metroGraph;
  }

  // Computes distance between two latitude/logitude coordinates in kilometers.
  static haversine(location1: [number, number], location2: [number, number]): number {
    const [lat1, lon1, lat2, lon2] = [location1[0], location1[1], location2[0], location2[1]].map((degree) => {
      //convert to radian
      return degree * (Math.PI / 180);
    });
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const R = 6371.0;
    const distance = R * c;
    return distance;
  }

  // Returns the station name and distance to the nearest metro station.
  nearestStation(coordinates: [number, number]): [string, number] {
    let stationName = '';
    let minDistance = Number.POSITIVE_INFINITY;

    Object.values(this.metroGraph.stations).forEach((station) => {
      const distance = ETACalculator.haversine(coordinates, station.coordinates);
      if (distance < minDistance) {
        minDistance = distance;
        stationName = station.name;
      }
    });

    return [stationName, minDistance];
  }

  // Computes travel time between two locations, either by walking or via metro if it's faster.
  calculateEta(location1: [number, number], location2: [number, number]): number {
    const [nearestStation1, additionalDistance1] = this.nearestStation(location1);
    const [nearestStation2, additionalDistance2] = this.nearestStation(location2);

    if (!nearestStation1 || !nearestStation2) {
      throw new Error('Could not find nearest metro station.');
    }

    // Assume an average walking pace
    let totalTimeWalking = (ETACalculator.haversine(location1, location2) / 5) * 60;

    let [totalTimeMetro, shortestPathMetro] = this.metroGraph.shortestPath(nearestStation1, nearestStation2);
    if (shortestPathMetro) {
      const walkingTime = (additionalDistance1 / 5) * 60 + (additionalDistance2 / 5) * 60;
      return totalTimeMetro < totalTimeWalking ? totalTimeMetro + walkingTime : totalTimeWalking;
    } else {
      // No metro route found, just return the walking time
      return totalTimeWalking;
    }
  }
}

export { ETACalculator };
