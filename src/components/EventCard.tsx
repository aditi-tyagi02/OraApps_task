import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Calendar, Users, Tag } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link to={`/events/${event.id}`} className="block group animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl dark:shadow-gray-900/30 transition-all duration-300 transform group-hover:-translate-y-1">
        <div className="relative">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold text-purple-600 dark:text-purple-400 shadow-lg">
            ${event.price}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {event.tags.map(tag => (
              <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {event.title}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
              <span>{format(new Date(event.date), 'PPP')}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-400" />
              <span>{event.attendees} attending</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center text-sm">
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              {event.capacity - event.attendees} spots left
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {event.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}