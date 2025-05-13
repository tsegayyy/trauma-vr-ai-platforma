import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Search, Filter, Plus, User, MessageSquare } from 'lucide-react';
import Button from '../components/common/Button';

// Mock data for chat rooms
const CHAT_ROOMS = [
  {
    id: '1',
    name: 'General Support',
    description: 'A safe space for general trauma support and discussion',
    category: 'General',
    participants: 28,
    isVREnabled: true,
    tags: ['All trauma types', 'General support']
  },
  {
    id: '2',
    name: 'PTSD Support Group',
    description: 'Focused discussion and support for those dealing with PTSD',
    category: 'Specific',
    participants: 15,
    isVREnabled: true,
    tags: ['PTSD', 'Anxiety']
  },
  {
    id: '3',
    name: 'Healing Through Art',
    description: 'Express and process trauma through creative expression',
    category: 'Activity',
    participants: 12,
    isVREnabled: false,
    tags: ['Art therapy', 'Creative healing']
  },
  {
    id: '4',
    name: 'Survivors Circle',
    description: 'A community for survivors to connect and support each other',
    category: 'General',
    participants: 22,
    isVREnabled: true,
    tags: ['Survivors', 'Community']
  },
  {
    id: '5',
    name: 'Mindfulness Practice',
    description: 'Learn and practice mindfulness techniques for trauma healing',
    category: 'Activity',
    participants: 18,
    isVREnabled: false,
    tags: ['Mindfulness', 'Meditation']
  },
  {
    id: '6',
    name: 'Childhood Trauma',
    description: 'Support specific to processing childhood trauma',
    category: 'Specific',
    participants: 16,
    isVREnabled: true,
    tags: ['Childhood trauma', 'Family']
  }
];

// Types for filter options
type CategoryFilter = 'All' | 'General' | 'Specific' | 'Activity';
type SortOption = 'popular' | 'newest' | 'alphabetical';

const ChatRoomsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showVROnly, setShowVROnly] = useState(false);

  // Filter and sort rooms based on current filters
  const filteredRooms = CHAT_ROOMS
    .filter(room => {
      // Apply search filter
      const matchesSearch = 
        searchQuery === '' || 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Apply category filter
      const matchesCategory = categoryFilter === 'All' || room.category === categoryFilter;
      
      // Apply VR filter
      const matchesVR = !showVROnly || room.isVREnabled;
      
      return matchesSearch && matchesCategory && matchesVR;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'popular':
          return b.participants - a.participants;
        case 'newest':
          // For this demo, we'll just sort by ID as a proxy for "newest"
          return parseInt(b.id) - parseInt(a.id);
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

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
              <h1 className="text-3xl font-bold text-surface-900 mb-2">Support Groups</h1>
              <p className="text-surface-600">Connect with others in a safe, supportive environment</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button
                variant="primary"
                icon={<Plus size={18} />}
              >
                Create Support Group
              </Button>
            </div>
          </div>
          
          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-soft p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-surface-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search groups..."
                  className="input pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center">
                <Filter size={18} className="text-surface-500 mr-2" />
                <div className="flex flex-wrap gap-2">
                  {(['All', 'General', 'Specific', 'Activity'] as CategoryFilter[]).map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm ${
                        categoryFilter === category
                          ? 'bg-primary-500 text-white'
                          : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                      }`}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort and VR Filter */}
              <div className="flex items-center gap-4">
                <select
                  className="input py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="alphabetical">A-Z</option>
                </select>
                
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={showVROnly}
                    onChange={() => setShowVROnly(!showVROnly)}
                  />
                  <div className="relative w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  <span className="ml-2 text-sm font-medium text-surface-700">VR Rooms Only</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold">{room.name}</h3>
                      {room.isVREnabled && (
                        <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">
                          VR Enabled
                        </span>
                      )}
                    </div>
                    
                    <p className="text-surface-600 mb-4 text-sm min-h-[40px]">{room.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-surface-500 text-sm">
                        <Users size={16} className="mr-1" />
                        <span>{room.participants} participants</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link 
                          to={`/chat-rooms/${room.id}`}
                          className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 transition-colors"
                          aria-label="Open chat"
                        >
                          <MessageSquare size={18} className="text-primary-600" />
                        </Link>
                        
                        {room.isVREnabled && (
                          <Link 
                            to={`/vr-room/${room.id}`}
                            className="p-2 rounded-lg bg-accent-100 hover:bg-accent-200 transition-colors"
                            aria-label="Enter VR room"
                          >
                            <span className="font-bold text-accent-700">VR</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-surface-400" />
                </div>
                <h3 className="text-xl font-medium text-surface-700 mb-2">No groups found</h3>
                <p className="text-surface-500 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('All');
                    setShowVROnly(false);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Personal Support Section */}
          <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl font-bold text-primary-900 mb-3">Need Personal Support?</h2>
                <p className="text-primary-800 max-w-lg">
                  If you prefer one-on-one conversations, you can connect with a supportive peer or professional.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  icon={<User size={18} />}
                >
                  Find a Peer
                </Button>
                <Button
                  variant="outline"
                  className="bg-white hover:bg-primary-50"
<<<<<<< HEAD
                  icon={<ArrowRight size={18} />}
=======
                  icon={<ArrowRight size={18} iconPosition="right" />}
>>>>>>> d66a9436bca9eb6c45863bfe08f0ba5cedba6ee5
                >
                  Talk to Professional
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatRoomsPage;