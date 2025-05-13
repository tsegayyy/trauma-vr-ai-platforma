import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Users, BookOpen, Calendar, Shield, MessageCircle } from 'lucide-react';
import Button from '../components/common/Button';

import { useUserStore } from '../store/userStore';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useUserStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 overflow-hidden">
        <div className="safe-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-primary-900 mb-6 leading-tight">
                Heal Through <span className="text-primary-600">Connection</span> in a Safe Space
              </h1>
              <p className="text-lg text-surface-700 mb-8 max-w-lg">
                Join our supportive community where trauma survivors can connect, share experiences, and heal together in a secure virtual environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  as={Link} 
                  to={isAuthenticated ? "/chat-rooms" : "/auth"} 
                  variant="primary" 
                  size="large"
                  icon={<Heart />}
                >
                  {isAuthenticated ? "Join Support Groups" : "Join Our Community"}
                </Button>
                <Button 
                  as={Link} 
                  to="/resources" 
                  variant="outline" 
                  size="large"
                  icon={<BookOpen />}
                >
                  Explore Resources
                </Button>
              </div>
              <div className="mt-8 flex items-center">
                <Shield className="text-primary-500 mr-2" size={20} />
                <span className="text-surface-600">Your privacy and safety are our top priorities</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-soft">
                <img 
                  src="https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="People supporting each other" 
                  className="w-full h-auto rounded-2xl" 
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center">
                        <Users size={16} className="text-primary-600" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium">500+ members</p>
                    <p className="text-xs text-surface-500">Supporting each other</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary-100 opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary-100 opacity-50"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="safe-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-surface-900 mb-4">How We Support Your Healing Journey</h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Our platform provides a range of tools and resources designed to support trauma recovery through connection and community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="text-primary-500" size={32} />,
                title: "Support Groups",
                description: "Connect with others in moderated group chats based on shared experiences and trauma types."
              },
              {
                icon: <MessageCircle className="text-primary-500" size={32} />,
                title: "Private Messaging",
                description: "Form one-on-one connections with peers for more personal support and conversation."
              },
              {
                icon: <div className="relative">
                  <div className="absolute inset-0 bg-primary-100 rounded-lg transform rotate-45"></div>
                  <div className="relative z-10">VR</div>
                </div>,
                title: "Virtual Reality Rooms",
                description: "Experience immersive support sessions in our safe virtual environments designed for healing."
              },
              {
                icon: <BookOpen className="text-primary-500" size={32} />,
                title: "Resource Library",
                description: "Access curated articles, videos, and resources to support your understanding and recovery."
              },
              {
                icon: <Calendar className="text-primary-500" size={32} />,
                title: "Event Calendar",
                description: "Join scheduled group sessions, workshops, and educational events led by trauma specialists."
              },
              {
                icon: <Shield className="text-primary-500" size={32} />,
                title: "Safety & Privacy",
                description: "Your wellbeing is our priority with strict community guidelines and privacy controls."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface-50 rounded-xl p-6 shadow-soft hover:shadow-md transition-all duration-300"
              >
                <div className="mb-4 p-3 bg-white inline-block rounded-lg shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-surface-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary-50">
        <div className="safe-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-surface-900 mb-4">Community Voices</h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Hear from members who have found support and connection on their healing journeys.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Finding this community changed everything for me. For the first time, I felt truly understood by people who had similar experiences.",
                name: "Alex T.",
                role: "Member since 2024"
              },
              {
                quote: "The VR support rooms helped me feel connected even when I couldn't leave my home due to anxiety. It's been a lifeline.",
                name: "Morgan K.",
                role: "Member since 2024"
              },
              {
                quote: "The resources and community support have given me tools I never had before. I'm learning how to process my trauma in healthier ways.",
                name: "Jordan L.",
                role: "Member since 2025"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-soft"
              >
                <div className="mb-4 text-accent-400">
                  <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 0L5 24H0L6.5 0H13ZM29.5 0L21.5 24H16.5L23 0H29.5Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="text-surface-700 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-medium">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-surface-900">{testimonial.name}</h4>
                    <p className="text-sm text-surface-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="safe-container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">Begin Your Healing Journey Today</h2>
              <p className="text-lg text-primary-100 mb-8">
                Join our community of survivors supporting each other through every step of the healing process.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  as={Link} 
                  to={isAuthenticated ? "/chat-rooms" : "/auth"} 
                  variant="secondary" 
                  size="large"
                  icon={<Heart />}
                >
                  {isAuthenticated ? "Join Support Groups" : "Join Our Community"}
                </Button>
                <Button 
                  as={Link} 
                  to="/resources" 
                  variant="outline" 
                  size="large"
                  className="bg-transparent border-white hover:bg-white/10 text-white"
                  icon={<BookOpen />}
                >
                  Explore Resources
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;