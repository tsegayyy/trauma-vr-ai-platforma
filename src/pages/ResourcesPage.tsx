import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Book, FileText, Video, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import Button from '../components/common/Button';

// Mock data for resources
const RESOURCES = [
  {
    id: '1',
    title: 'Understanding Trauma: A Comprehensive Guide',
    type: 'article',
    category: 'educational',
    description: 'Learn about the different types of trauma, how they affect the brain and body, and common symptoms.',
    imageUrl: 'https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: '#',
    tags: ['Trauma basics', 'Psychology', 'Education']
  },
  {
    id: '2',
    title: 'Breathing Techniques for Anxiety Management',
    type: 'video',
    category: 'practical',
    description: 'This 10-minute guided video teaches practical breathing exercises to help manage anxiety symptoms.',
    imageUrl: 'https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: '#',
    tags: ['Anxiety', 'Breathing', 'Coping skills']
  },
  {
    id: '3',
    title: 'The Body Keeps the Score',
    type: 'book',
    category: 'educational',
    description: 'Dr. Bessel van der Kolk\'s groundbreaking book on how trauma affects both mind and body.',
    imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: '#',
    tags: ['Books', 'Body-mind connection', 'PTSD']
  },
  {
    id: '4',
    title: 'Grounding Techniques for Flashbacks',
    type: 'article',
    category: 'practical',
    description: 'Five effective grounding techniques to help during flashbacks and dissociative episodes.',
    imageUrl: 'https://images.pexels.com/photos/3768891/pexels-photo-3768891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: '#',
    tags: ['Flashbacks', 'Grounding', 'Self-help']
  },
  {
    id: '5',
    title: 'Healing Through Movement: Trauma-Sensitive Yoga',
    type: 'video',
    category: 'activity',
    description: 'A gentle yoga practice designed specifically for trauma survivors, with modifications for all mobility levels.',
    imageUrl: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: '#',
    tags: ['Yoga', 'Movement', 'Body-based healing']
  },
  {
    id: '6',
    title: 'Supporting a Loved One with PTSD',
    type: 'article',
    category: 'support',
    description: 'Practical advice for family members and friends supporting someone with PTSD.',
    imageUrl: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: '#',
    tags: ['Family support', 'PTSD', 'Relationships']
  },
  {
    id: '7',
    title: 'Journaling Prompts for Trauma Recovery',
    type: 'article',
    category: 'activity',
    description: '30 therapeutic journaling prompts to support your healing journey.',
    imageUrl: 'https://images.pexels.com/photos/636243/pexels-photo-636243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: '#',
    tags: ['Journaling', 'Self-reflection', 'Writing therapy']
  },
  {
    id: '8',
    title: 'Understanding Triggers and How to Manage Them',
    type: 'video',
    category: 'educational',
    description: 'Expert explanation of what triggers are and practical strategies to identify and manage them.',
    imageUrl: 'https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: '#',
    tags: ['Triggers', 'Coping strategies', 'Emotional regulation']
  }
];

// Types for filter options
type ResourceType = 'all' | 'article' | 'video' | 'book';
type ResourceCategory = 'all' | 'educational' | 'practical' | 'activity' | 'support';

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ResourceType>('all');
  const [categoryFilter, setCategoryFilter] = useState<ResourceCategory>('all');
  const [savedResources, setSavedResources] = useState<string[]>([]);

  // Filter resources based on current filters
  const filteredResources = RESOURCES
    .filter(resource => {
      // Apply search filter
      const matchesSearch = 
        searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Apply type filter
      const matchesType = typeFilter === 'all' || resource.type === typeFilter;
      
      // Apply category filter
      const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
      
      return matchesSearch && matchesType && matchesCategory;
    });

  // Toggle saved resource
  const toggleSaveResource = (id: string) => {
    if (savedResources.includes(id)) {
      setSavedResources(prev => prev.filter(resId => resId !== id));
    } else {
      setSavedResources(prev => [...prev, id]);
    }
  };

  // Get resource type icon
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText size={18} />;
      case 'video':
        return <Video size={18} />;
      case 'book':
        return <Book size={18} />;
      default:
        return <FileText size={18} />;
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
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-surface-900 mb-3">Resource Library</h1>
            <p className="text-surface-600 max-w-2xl mx-auto">
              Explore our curated collection of articles, videos, and books to support your healing journey.
            </p>
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
                  placeholder="Search resources..."
                  className="input pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Resource Type Filter */}
              <div className="flex items-center">
                <Filter size={18} className="text-surface-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-surface-700 mr-2">Type:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'all', label: 'All Types' },
                    { value: 'article', label: 'Articles' },
                    { value: 'video', label: 'Videos' },
                    { value: 'book', label: 'Books' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      className={`px-3 py-1 rounded-full text-sm ${
                        typeFilter === type.value
                          ? 'bg-primary-500 text-white'
                          : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                      }`}
                      onClick={() => setTypeFilter(type.value as ResourceType)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center">
                <Filter size={18} className="text-surface-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-surface-700 mr-2">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'educational', label: 'Educational' },
                    { value: 'practical', label: 'Practical' },
                    { value: 'activity', label: 'Activities' },
                    { value: 'support', label: 'Support' }
                  ].map((category) => (
                    <button
                      key={category.value}
                      className={`px-3 py-1 rounded-full text-sm ${
                        categoryFilter === category.value
                          ? 'bg-primary-500 text-white'
                          : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                      }`}
                      onClick={() => setCategoryFilter(category.value as ResourceCategory)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-soft overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        resource.type === 'article' ? 'bg-primary-500' :
                        resource.type === 'video' ? 'bg-accent-500' :
                        'bg-secondary-500'
                      }`}>
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleSaveResource(resource.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full ${
                        savedResources.includes(resource.id)
                          ? 'bg-primary-500 text-white'
                          : 'bg-white/80 text-surface-700 hover:bg-white'
                      }`}
                      aria-label={savedResources.includes(resource.id) ? "Unsave resource" : "Save resource"}
                    >
                      {savedResources.includes(resource.id) ? (
                        <BookmarkCheck size={16} />
                      ) : (
                        <Bookmark size={16} />
                      )}
                    </button>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`mt-1 p-2 rounded-lg ${
                        resource.type === 'article' ? 'bg-primary-100 text-primary-600' :
                        resource.type === 'video' ? 'bg-accent-100 text-accent-600' :
                        'bg-secondary-100 text-secondary-600'
                      }`}>
                        {getResourceIcon(resource.type)}
                      </div>
                      <h3 className="text-lg font-semibold">{resource.title}</h3>
                    </div>
                    
                    <p className="text-surface-600 mb-4 text-sm flex-grow">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-surface-100 text-surface-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="primary"
                        className="mt-auto"
                        icon={<ExternalLink size={16} />}
                      >
                        Access Resource
                      </Button>
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} className="text-surface-400" />
                </div>
                <h3 className="text-xl font-medium text-surface-700 mb-2">No resources found</h3>
                <p className="text-surface-500 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setTypeFilter('all');
                    setCategoryFilter('all');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Suggestion Section */}
          <div className="mt-12 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-3">Have a Resource Suggestion?</h2>
                <p className="text-secondary-800 max-w-lg">
                  If you know of a helpful article, video, or book that could benefit others, we'd love to add it to our library.
                </p>
              </div>
              
              <Button
                variant="secondary"
              >
                Suggest a Resource
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;