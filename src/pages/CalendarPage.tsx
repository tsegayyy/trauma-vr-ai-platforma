import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import Button from '../components/common/Button';
import 'react-calendar/dist/Calendar.css';

// Mock data for events
const EVENTS = [
  {
    id: '1',
    title: 'Group Therapy Session',
    date: new Date(2025, 3, 15, 18, 0), // April 15, 2025, 6:00 PM
    endDate: new Date(2025, 3, 15, 19, 30), // April 15, 2025, 7:30 PM
    type: 'group',
    location: 'Virtual (Zoom)',
    facilitator: 'Dr. Sarah Johnson',
    participants: 8,
    maxParticipants: 12,
    description: 'A guided group session focusing on coping strategies for trauma survivors.',
    isVirtual: true
  },
  {
    id: '2',
    title: 'Trauma-Informed Yoga',
    date: new Date(2025, 3, 17, 10, 0), // April 17, 2025, 10:00 AM
    endDate: new Date(2025, 3, 17, 11, 0), // April 17, 2025, 11:00 AM
    type: 'activity',
    location: 'Virtual (Zoom)',
    facilitator: 'Emily Chen, Certified Yoga Instructor',
    participants: 15,
    maxParticipants: 20,
    description: 'A gentle yoga practice designed specifically for trauma survivors.',
    isVirtual: true
  },
  {
    id: '3',
    title: 'Understanding PTSD Workshop',
    date: new Date(2025, 3, 20, 14, 0), // April 20, 2025, 2:00 PM
    endDate: new Date(2025, 3, 20, 16, 0), // April 20, 2025, 4:00 PM
    type: 'educational',
    location: 'Virtual (Zoom)',
    facilitator: 'Dr. Michael Rodriguez',
    participants: 25,
    maxParticipants: 50,
    description: 'An educational workshop explaining PTSD, its symptoms, and evidence-based treatments.',
    isVirtual: true
  },
  {
    id: '4',
    title: 'Mindfulness Meditation',
    date: new Date(2025, 3, 22, 19, 0), // April 22, 2025, 7:00 PM
    endDate: new Date(2025, 3, 22, 20, 0), // April 22, 2025, 8:00 PM
    type: 'activity',
    location: 'Virtual (Zoom)',
    facilitator: 'Alex Thompson',
    participants: 12,
    maxParticipants: 30,
    description: 'A guided meditation session focusing on grounding techniques and present-moment awareness.',
    isVirtual: true
  },
  {
    id: '5',
    title: 'Art Therapy Workshop',
    date: new Date(2025, 3, 25, 15, 0), // April 25, 2025, 3:00 PM
    endDate: new Date(2025, 3, 25, 17, 0), // April 25, 2025, 5:00 PM
    type: 'activity',
    location: 'Virtual (Zoom)',
    facilitator: 'Lisa Garcia, Art Therapist',
    participants: 10,
    maxParticipants: 15,
    description: 'Express and process emotions through guided art activities. No artistic experience needed.',
    isVirtual: true
  },
  {
    id: '6',
    title: 'Support for Supporters',
    date: new Date(2025, 3, 27, 18, 30), // April 27, 2025, 6:30 PM
    endDate: new Date(2025, 3, 27, 20, 0), // April 27, 2025, 8:00 PM
    type: 'group',
    location: 'Virtual (Zoom)',
    facilitator: 'Dr. James Wilson',
    participants: 6,
    maxParticipants: 15,
    description: 'A session designed for friends and family members supporting loved ones with trauma.',
    isVirtual: true
  }
];

// Types for filter options
type EventType = 'all' | 'group' | 'activity' | 'educational';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [typeFilter, setTypeFilter] = useState<EventType>('all');
  const [showRegisteredOnly, setShowRegisteredOnly] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Calculate events for selected date
  const getEventsForSelectedDate = () => {
    return EVENTS.filter(event => 
      selectedDate &&
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Get all events matching the current filters
  const getFilteredEvents = () => {
    return EVENTS.filter(event => {
      // Apply type filter
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      
      // Apply registration filter
      const matchesRegistration = !showRegisteredOnly || registeredEvents.includes(event.id);
      
      return matchesType && matchesRegistration;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  // Calculate dates that have events for highlighting in the calendar
  const datesWithEvents = EVENTS.map(event => event.date);

  // Handle event registration
  const toggleEventRegistration = (eventId: string) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(prev => prev.filter(id => id !== eventId));
    } else {
      setRegisteredEvents(prev => [...prev, eventId]);
    }
  };

  // Format date/time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get event type badge color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'group':
        return 'bg-primary-100 text-primary-700';
      case 'activity':
        return 'bg-accent-100 text-accent-700';
      case 'educational':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-surface-100 text-surface-700';
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 py-12">
      <div className="safe-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-surface-900 mb-2">Events Calendar</h1>
              <p className="text-surface-600">Join scheduled sessions and activities to support your healing journey</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-4">
              <div className="flex">
                <button
                  className={`px-4 py-2 rounded-l-lg border border-r-0 border-surface-300 ${
                    viewMode === 'calendar' 
                      ? 'bg-primary-500 text-white border-primary-500' 
                      : 'bg-white text-surface-700 hover:bg-surface-50'
                  }`}
                  onClick={() => setViewMode('calendar')}
                >
                  Calendar
                </button>
                <button
                  className={`px-4 py-2 rounded-r-lg border border-surface-300 ${
                    viewMode === 'list' 
                      ? 'bg-primary-500 text-white border-primary-500' 
                      : 'bg-white text-surface-700 hover:bg-surface-50'
                  }`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
              </div>
              
              <Button
                variant="primary"
                icon={<Plus size={18} />}
              >
                Add Event
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar or Filters Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft p-4 mb-6">
                {/* Custom Calendar Styling */}
                <style>
                  {`
                    .react-calendar {
                      width: 100%;
                      border: none;
                      font-family: inherit;
                    }
                    .react-calendar__navigation {
                      margin-bottom: 1rem;
                    }
                    .react-calendar__navigation button {
                      min-width: 44px;
                      background: none;
                      font-size: 16px;
                      font-weight: 500;
                    }
                    .react-calendar__navigation button:disabled {
                      opacity: 0.5;
                    }
                    .react-calendar__navigation button:enabled:hover,
                    .react-calendar__navigation button:enabled:focus {
                      background-color: #f1f5f9;
                      border-radius: 8px;
                    }
                    .react-calendar__month-view__weekdays {
                      text-transform: uppercase;
                      font-weight: 500;
                      font-size: 0.875rem;
                      color: #64748b;
                    }
                    .react-calendar__month-view__days__day {
                      font-size: 0.9rem;
                      padding: 0.75rem 0;
                      border-radius: 8px;
                    }
                    .react-calendar__month-view__days__day--weekend {
                      color: #ef4444;
                    }
                    .react-calendar__month-view__days__day--neighboringMonth {
                      color: #a1a1aa;
                    }
                    .react-calendar__tile {
                      position: relative;
                    }
                    .react-calendar__tile--now {
                      background: #e0f2fe;
                      color: #0284c7;
                      border-radius: 8px;
                    }
                    .react-calendar__tile--now:enabled:hover,
                    .react-calendar__tile--now:enabled:focus {
                      background: #bae6fd;
                    }
                    .react-calendar__tile--active {
                      background: #0284c7;
                      color: white;
                      border-radius: 8px;
                    }
                    .react-calendar__tile--active:enabled:hover,
                    .react-calendar__tile--active:enabled:focus {
                      background: #0369a1;
                    }
                    .react-calendar__tile--hasActive {
                      background: #0284c7;
                      color: white;
                      border-radius: 8px;
                    }
                    .react-calendar__tile--hasActive:enabled:hover,
                    .react-calendar__tile--hasActive:enabled:focus {
                      background: #0369a1;
                    }
                    .event-dot {
                      position: absolute;
                      bottom: 4px;
                      left: 50%;
                      transform: translateX(-50%);
                      width: 6px;
                      height: 6px;
                      background-color: #0284c7;
                      border-radius: 50%;
                    }
                  `}
                </style>
                
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  formatShortWeekday={(locale, date) => 
                    date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 1)
                  }
                  prevLabel={<ChevronLeft size={20} />}
                  nextLabel={<ChevronRight size={20} />}
                  navigationLabel={({ date }) => 
                    date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
                  }
                  tileContent={({ date }) => {
                    // Check if this date has any events
                    const hasEvent = datesWithEvents.some(eventDate => 
                      eventDate.getDate() === date.getDate() &&
                      eventDate.getMonth() === date.getMonth() &&
                      eventDate.getFullYear() === date.getFullYear()
                    );
                    
                    return hasEvent ? <div className="event-dot"></div> : null;
                  }}
                />
              </div>
              
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter size={18} className="mr-2 text-primary-500" />
                  Filters
                </h3>
                
                <div className="space-y-4">
                  {/* Event Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Event Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'all', label: 'All Types' },
                        { value: 'group', label: 'Group Sessions' },
                        { value: 'activity', label: 'Activities' },
                        { value: 'educational', label: 'Educational' }
                      ].map((type) => (
                        <button
                          key={type.value}
                          className={`px-3 py-1.5 rounded-full text-sm ${
                            typeFilter === type.value
                              ? 'bg-primary-500 text-white'
                              : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                          }`}
                          onClick={() => setTypeFilter(type.value as EventType)}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Registered Events Filter */}
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={showRegisteredOnly}
                        onChange={() => setShowRegisteredOnly(!showRegisteredOnly)}
                      />
                      <div className="relative w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      <span className="ml-3 text-sm font-medium text-surface-700">
                        Show only events I'm registered for
                      </span>
                    </label>
                  </div>
                </div>
                
                {registeredEvents.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-surface-200">
                    <p className="text-sm text-surface-600 mb-2">
                      You're registered for {registeredEvents.length} event{registeredEvents.length !== 1 ? 's' : ''}
                    </p>
                    <Button
                      variant="outline"
                      size="small"
                      onClick={() => setRegisteredEvents([])}
                    >
                      Clear All Registrations
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Events Column */}
            <div className="lg:col-span-2">
              {viewMode === 'calendar' ? (
                // Calendar View - Show events for selected date
                <div>
                  <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {selectedDate ? (
                        <>Events for {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</>
                      ) : (
                        <>Select a date</>
                      )}
                    </h3>
                    
                    {selectedDate && getEventsForSelectedDate().length > 0 ? (
                      <div className="space-y-4">
                        {getEventsForSelectedDate().map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-surface-50 rounded-lg p-4 hover:bg-surface-100 transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                              <h4 className="text-lg font-medium text-surface-900">{event.title}</h4>
                              <span className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center mt-2 sm:mt-0 ${getEventTypeColor(event.type)}`}>
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </span>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-surface-600 text-sm">
                                <Clock size={16} className="mr-2" />
                                {formatTime(event.date)} - {formatTime(event.endDate)}
                              </div>
                              <div className="flex items-center text-surface-600 text-sm">
                                <MapPin size={16} className="mr-2" />
                                {event.location}
                              </div>
                              <div className="flex items-center text-surface-600 text-sm">
                                <Users size={16} className="mr-2" />
                                {event.participants}/{event.maxParticipants} participants
                              </div>
                            </div>
                            
                            <p className="text-surface-700 text-sm mb-4">{event.description}</p>
                            
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-surface-600">Facilitator: {event.facilitator}</p>
                              <Button
                                variant={registeredEvents.includes(event.id) ? "secondary" : "primary"}
                                size="small"
                                onClick={() => toggleEventRegistration(event.id)}
                              >
                                {registeredEvents.includes(event.id) ? "Unregister" : "Register"}
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-surface-50 rounded-lg p-6 text-center">
                        <p className="text-surface-600 mb-4">No events scheduled for this date.</p>
                        <Button
                          variant="outline"
                          size="small"
                          icon={<ChevronLeft size={16} />}
                          onClick={() => {
                            const yesterday = new Date(selectedDate || new Date());
                            yesterday.setDate(yesterday.getDate() - 1);
                            setSelectedDate(yesterday);
                          }}
                        >
                          Previous Day
                        </Button>
                        <Button
                          variant="outline"
                          size="small"
                          className="ml-2"
                          iconPosition="right"
                          icon={<ChevronRight size={16} />}
                          onClick={() => {
                            const tomorrow = new Date(selectedDate || new Date());
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            setSelectedDate(tomorrow);
                          }}
                        >
                          Next Day
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // List View - Show all events matching filters
                <div className="bg-white rounded-xl shadow-soft p-6">
                  <h3 className="text-xl font-semibold mb-6">Upcoming Events</h3>
                  
                  {getFilteredEvents().length > 0 ? (
                    <div className="space-y-6">
                      {getFilteredEvents().map((event) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-b border-surface-200 pb-6 last:border-0 last:pb-0"
                        >
                          <div className="flex flex-col sm:flex-row justify-between mb-2">
                            <h4 className="text-lg font-medium text-surface-900">{event.title}</h4>
                            <div className="flex items-center mt-2 sm:mt-0">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getEventTypeColor(event.type)} mr-2`}>
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </span>
                              {registeredEvents.includes(event.id) && (
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                                  Registered
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-primary-700 font-medium mb-3">
                            {event.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}, {formatTime(event.date)} - {formatTime(event.endDate)}
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="space-y-2">
                                <div className="flex items-center text-surface-600 text-sm">
                                  <MapPin size={16} className="mr-2" />
                                  {event.location}
                                </div>
                                <div className="flex items-center text-surface-600 text-sm">
                                  <Users size={16} className="mr-2" />
                                  {event.participants}/{event.maxParticipants} participants
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="text-surface-700 text-sm">{event.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-surface-600">Facilitator: {event.facilitator}</p>
                            <Button
                              variant={registeredEvents.includes(event.id) ? "secondary" : "primary"}
                              size="small"
                              onClick={() => toggleEventRegistration(event.id)}
                            >
                              {registeredEvents.includes(event.id) ? "Unregister" : "Register"}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-surface-50 rounded-lg p-6 text-center">
                      <p className="text-surface-600 mb-4">No events match your current filters.</p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setTypeFilter('all');
                          setShowRegisteredOnly(false);
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalendarPage;