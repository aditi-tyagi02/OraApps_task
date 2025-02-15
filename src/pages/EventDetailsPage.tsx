import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Calendar, Users, Heart, ArrowLeft, Tag } from 'lucide-react';
import { events } from '../data/events';
import { useAuth } from '../context/AuthContext';

export function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, toggleEventInterest } = useAuth();
  const event = events.find(e => e.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  const isInterested = user?.interestedEvents.includes(event.id);

  const handleInterestClick = () => {
    if (!user) {
      const confirmLogin = window.confirm('Please log in to mark your interest in this event. Would you like to log in now?');
      if (confirmLogin) {
        navigate('/login');
      }
      return;
    }
    toggleEventInterest(event.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-96">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-6">
              {event.tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  <Tag className="w-4 h-4 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
                <p className="text-xl text-gray-600 mb-6">by {event.organizer}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-600">${event.price}</p>
                <p className="text-sm text-gray-600">per person</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-gray-50 rounded-lg p-6">
              <div className="flex items-center text-gray-700">
                <Calendar className="w-6 h-6 mr-3 text-indigo-500" />
                <div>
                  <p className="font-semibold">Date & Time</p>
                  <p>{format(new Date(event.date), 'PPP p')}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-6 h-6 mr-3 text-indigo-500" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p>{event.location}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <Users className="w-6 h-6 mr-3 text-indigo-500" />
                <div>
                  <p className="font-semibold">Capacity</p>
                  <p>{event.attendees} / {event.capacity} attending</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this event</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handleInterestClick}
                className={`inline-flex items-center px-6 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                  isInterested
                    ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                    : 'bg-pink-600 text-white hover:bg-pink-700'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isInterested ? 'fill-current' : ''}`} />
                {isInterested ? 'Interested' : 'Mark as Interested'}
              </button>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {event.capacity - event.attendees} spots remaining
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}