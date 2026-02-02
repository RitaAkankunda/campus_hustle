import React from 'react';
import { events, bookings } from '../data/mockEvents';

// For demo, assume current user is id '1'
const CURRENT_USER_ID = '1';

const EventCalendar: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold text-purple-700 mb-4">Upcoming Events</h2>
      <div className="flex flex-col gap-4">
        {events.map(event => {
          const userBooking = bookings.find(b => b.eventId === event.id && b.userId === CURRENT_USER_ID);
          return (
            <div key={event.id} className="flex flex-col md:flex-row md:items-center gap-4 border-b pb-4 last:border-b-0">
              {event.image && (
                <img src={event.image} alt={event.title} className="w-32 h-20 object-cover rounded-lg" />
              )}
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-900">{event.title}</div>
                <div className="text-sm text-gray-500 mb-1">{event.date} • {event.location}</div>
                <div className="text-xs text-gray-600 mb-2">{event.description}</div>
                {userBooking ? (
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${userBooking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {userBooking.status === 'confirmed' ? 'Booking Confirmed' : 'Booking Pending'}
                  </span>
                ) : (
                  <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-xs font-medium">Book</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
