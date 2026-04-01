// Represents a request received by the application to find a midpoint activity between two users.
class UserRequest {
  userId: string;
  user1Location: [number, number];
  user2Location: [number, number];
  activityType: string;
  rating: number;
  priceCategory: number;
  timeNeeded: number;

  constructor(
    userId: string,
    user1Location: [number, number],
    user2Location: [number, number],
    activityType: string,
    rating: number,
    priceCategory: number,
    timeNeeded: number,
  ) {
    this.userId = userId;
    this.user1Location = user1Location;
    this.user2Location = user2Location;
    this.activityType = activityType;
    this.rating = rating;
    this.priceCategory = priceCategory;
    this.timeNeeded = timeNeeded;
  }

  toString() {
    return `UserRequest: userId: ${this.userId}, activity type: ${this.activityType}, rating: ${this.rating}`;
  }
}

export { UserRequest };
