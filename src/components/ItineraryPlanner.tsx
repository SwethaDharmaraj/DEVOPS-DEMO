import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Clock, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Activity {
  id: string;
  name: string;
  time: string;
  location: string;
  description: string;
  type: 'accommodation' | 'activity' | 'transportation' | 'dining';
}

interface DayItinerary {
  date: string;
  activities: Activity[];
}

interface ItineraryPlannerProps {
  onClose?: () => void;
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({ onClose }) => {
  const [itinerary, setItinerary] = useState<DayItinerary[]>([
    {
      date: '2024-03-15',
      activities: [
        {
          id: '1',
          name: 'Check into Hotel',
          time: '14:00',
          location: 'Grand Hotel Paris',
          description: 'Luxury hotel in the heart of Paris',
          type: 'accommodation'
        },
        {
          id: '2',
          name: 'Eiffel Tower Visit',
          time: '16:00',
          location: 'Champ de Mars, 5 Avenue Anatole France',
          description: 'Visit the iconic Eiffel Tower',
          type: 'activity'
        }
      ]
    }
  ]);
  
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    name: '',
    time: '',
    location: '',
    description: '',
    type: 'activity'
  });
  
  const [selectedDate, setSelectedDate] = useState('2024-03-15');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editing, setEditing] = useState<{ date: string; id: string } | null>(null);

  const addNewDay = () => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + itinerary.length);
    const dateString = newDate.toISOString().split('T')[0];
    
    setItinerary([...itinerary, { date: dateString, activities: [] }]);
  };

  const addActivity = () => {
    if (!newActivity.name || !newActivity.time) return;

    if (editing) {
      setItinerary(prev =>
        prev.map(day =>
          day.date === editing.date
            ? {
                ...day,
                activities: day.activities
                  .map(a =>
                    a.id === editing.id
                      ? {
                          ...a,
                          name: newActivity.name as string,
                          time: newActivity.time as string,
                          location: newActivity.location || '',
                          description: newActivity.description || '',
                          type: (newActivity.type as Activity['type']) || 'activity',
                        }
                      : a
                  )
                  .sort((a, b) => a.time.localeCompare(b.time)),
              }
            : day
        )
      );
      setEditing(null);
    } else {
      const activity: Activity = {
        id: Date.now().toString(),
        name: newActivity.name as string,
        time: newActivity.time as string,
        location: newActivity.location || '',
        description: newActivity.description || '',
        type: (newActivity.type as Activity['type']) || 'activity',
      };

      setItinerary(prev =>
        prev.map(day =>
          day.date === selectedDate
            ? {
                ...day,
                activities: [...day.activities, activity].sort((a, b) => a.time.localeCompare(b.time)),
              }
            : day
        )
      );
    }

    setNewActivity({ name: '', time: '', location: '', description: '', type: 'activity' });
    setShowAddForm(false);
  };

  const removeActivity = (dateToRemove: string, activityId: string) => {
    setItinerary(prev => prev.map(day => 
      day.date === dateToRemove 
        ? { ...day, activities: day.activities.filter(activity => activity.id !== activityId) }
        : day
    ));
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'accommodation': return '🏨';
      case 'transportation': return '🚗';
      case 'dining': return '🍽️';
      default: return '📍';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'accommodation': return 'bg-purple-100 border-purple-300';
      case 'transportation': return 'bg-green-100 border-green-300';
      case 'dining': return 'bg-orange-100 border-orange-300';
      default: return 'bg-blue-100 border-blue-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Travel Itinerary Planner</h2>
        {onClose && (
          <Button onClick={onClose} variant="outline">Close</Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Itinerary Timeline */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {itinerary.map((day, dayIndex) => (
              <div key={day.date} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Day {dayIndex + 1} - {new Date(day.date).toLocaleDateString()}
                  </h3>
                  <Button
                    onClick={() => {
                      setSelectedDate(day.date);
                      setEditing(null);
                      setNewActivity({ name: '', time: '', location: '', description: '', type: 'activity' });
                      setShowAddForm(true);
                    }}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Activity
                  </Button>
                </div>

                <div className="space-y-3">
                  {day.activities.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-8">
                      No activities planned for this day
                    </p>
                  ) : (
                    day.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`border-2 rounded-lg p-4 ${getActivityColor(activity.type)}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                              <h4 className="font-semibold text-gray-800">{activity.name}</h4>
                              <div className="flex items-center gap-1 text-blue-600">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">{activity.time}</span>
                              </div>
                            </div>
                            {activity.location && (
                              <div className="flex items-center gap-1 text-gray-600 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{activity.location}</span>
                              </div>
                            )}
                            {activity.description && (
                              <p className="text-gray-700 text-sm">{activity.description}</p>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            <button
                              onClick={() => {
                                setEditing({ date: day.date, id: activity.id });
                                setSelectedDate(day.date);
                                setNewActivity({
                                  name: activity.name,
                                  time: activity.time,
                                  location: activity.location,
                                  description: activity.description,
                                  type: activity.type,
                                });
                                setShowAddForm(true);
                              }}
                              className="p-1 text-gray-500 hover:text-blue-600"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeActivity(day.date, activity.id)}
                              className="p-1 text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={addNewDay}
            className="w-full mt-4 bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Day
          </Button>
        </div>

        {/* Add Activity Form */}
        <div className="lg:col-span-1">
          {showAddForm && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">{editing ? 'Edit Activity' : 'Add New Activity'}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Activity Name *
                  </label>
                  <input
                    type="text"
                    value={newActivity.name}
                    onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter activity name"
                    required
                    aria-required="true"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    aria-required="true"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value as Activity['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="activity">Activity</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="transportation">Transportation</option>
                    <option value="dining">Dining</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter description"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={addActivity}
                    disabled={!newActivity.name || !newActivity.time}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {editing ? 'Save Changes' : 'Add Activity'}
                  </Button>
                  <Button
                    onClick={() => {
                      setEditing(null);
                      setShowAddForm(false);
                      setNewActivity({ name: '', time: '', location: '', description: '', type: 'activity' });
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Trip Summary</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p><strong>Duration:</strong> {itinerary.length} days</p>
              <p><strong>Total Activities:</strong> {itinerary.reduce((total, day) => total + day.activities.length, 0)}</p>
              <p><strong>Start Date:</strong> {itinerary[0]?.date ? new Date(itinerary[0].date).toLocaleDateString() : 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};