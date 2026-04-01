// Represents a possible activity that might be suggested to users.
class Activity {
  name: string;
  coordinates: [number, number];
  activityType: string;
  rating: number;
  priceCategory: number;
  timeNeeded: number;

  constructor(
    name: string,
    coordinates: [number, number],
    activityType: string,
    rating: number,
    priceCategory: number,
    timeNeeded: number,
  ) {
    this.name = name;
    this.coordinates = coordinates;
    this.activityType = activityType;
    this.rating = rating;
    this.priceCategory = priceCategory;
    this.timeNeeded = timeNeeded;
  }

  toString() {
    return `Activity(${this.name})`;
  }
}

export { Activity };
