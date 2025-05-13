import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Bell, Shield, Moon, LogOut, Save, Edit2 } from 'lucide-react';
import Button from '../components/common/Button';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile } = useUserStore();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    notifications: user?.preferences?.notifications || false,
    darkMode: user?.preferences?.darkMode || false,
    privacy: user?.preferences?.privacy || 'public'
  });
  
  // Redirect if not logged in
  if (!user) {
    navigate('/auth');
    return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
      preferences: {
        notifications: formData.notifications,
        darkMode: formData.darkMode,
        privacy: formData.privacy as 'public' | 'private' | 'friends'
      }
    });
    
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-surface-50 py-12">
      <div className="safe-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-surface-900 mb-8">My Profile</h1>
        
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-24"></div>
                <div className="px-6 pb-6">
                  <div className="flex justify-center -mt-12 mb-4">
                    <div className="relative">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-24 h-24 rounded-full border-4 border-white object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-primary-100 flex items-center justify-center">
                          <span className="text-3xl font-semibold text-primary-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {!isEditing && (
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:bg-primary-50 transition-colors"
                        >
                          <Edit2 size={16} className="text-primary-600" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-center mb-1">{user.name}</h2>
                  <p className="text-surface-500 text-center mb-6">{user.email}</p>
                  
                  <div className="flex justify-center">
                    <div className="text-sm text-surface-500">
                      <p>Member since: {user.joinDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Logout Button */}
              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  icon={<LogOut size={18} />}
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            </div>
            
            {/* Profile Settings */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-soft p-6">
                <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Account Information Section */}
                    <div>
                      <h4 className="text-lg font-medium mb-4 flex items-center">
                        <User size={18} className="mr-2 text-primary-500" />
                        Account Information
                      </h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-surface-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-surface-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="avatar" className="block text-sm font-medium text-surface-700 mb-1">
                            Profile Picture URL
                          </label>
                          <input
                            type="text"
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="input"
                            disabled={!isEditing}
                            placeholder="https://example.com/your-photo.jpg"
                          />
                          <p className="mt-1 text-xs text-surface-500">
                            Enter a URL to your profile picture
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Preferences Section */}
                    <div>
                      <h4 className="text-lg font-medium mb-4 flex items-center">
                        <Bell size={18} className="mr-2 text-primary-500" />
                        Preferences
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="block text-sm font-medium text-surface-700">
                              Notifications
                            </span>
                            <span className="text-xs text-surface-500">
                              Receive event and chat notifications
                            </span>
                          </div>
                          <div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                id="notifications"
                                name="notifications"
                                checked={formData.notifications}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="block text-sm font-medium text-surface-700">
                              Dark Mode
                            </span>
                            <span className="text-xs text-surface-500">
                              Use dark theme for the application
                            </span>
                          </div>
                          <div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                id="darkMode"
                                name="darkMode"
                                checked={formData.darkMode}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Privacy Section */}
                    <div>
                      <h4 className="text-lg font-medium mb-4 flex items-center">
                        <Shield size={18} className="mr-2 text-primary-500" />
                        Privacy
                      </h4>
                      
                      <div>
                        <label htmlFor="privacy" className="block text-sm font-medium text-surface-700 mb-1">
                          Profile Visibility
                        </label>
                        <select
                          id="privacy"
                          name="privacy"
                          value={formData.privacy}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="input"
                        >
                          <option value="public">Public - Anyone can see my profile</option>
                          <option value="friends">Friends - Only people I connect with</option>
                          <option value="private">Private - Hidden profile</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    {isEditing ? (
                      <div className="flex gap-4 pt-4">
                        <Button
                          type="submit"
                          variant="primary"
                          icon={<Save size={18} />}
                        >
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: user.name,
                              email: user.email,
                              avatar: user.avatar || '',
                              notifications: user.preferences.notifications,
                              darkMode: user.preferences.darkMode,
                              privacy: user.preferences.privacy
                            });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="pt-4">
                        <Button
                          type="button"
                          variant="primary"
                          icon={<Edit2 size={18} />}
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;