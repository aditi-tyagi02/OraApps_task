export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  organizer: string;
  category: string;
  price: number;
  capacity: number;
  attendees: number;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  interestedEvents: string[];
}