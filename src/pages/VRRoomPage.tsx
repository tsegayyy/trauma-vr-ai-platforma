import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2, Volume2, VolumeX, Users } from 'lucide-react';
import Button from '../components/common/Button';

// Note: AFrame will be loaded from CDN in a real implementation
// This is a simplified version for demonstration purposes

const VRRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState(3); // Mock data

  useEffect(() => {
    // Simulate loading the VR environment
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, this would mute/unmute the audio in AFrame
  };

  // Placeholder for AFrame/VR content
  return (
    <div className="min-h-screen bg-surface-900 text-white">
      {/* Header controls */}
      <div className="p-4 flex justify-between items-center bg-surface-800 shadow-md">
        <Link 
          to="/chat-rooms" 
          className="flex items-center text-surface-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} className="mr-1" />
          Exit Room
        </Link>
        <div className="text-lg font-medium">Support Room #{roomId}</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center mr-4 bg-surface-700 px-3 py-1 rounded-full">
            <Users size={16} className="mr-2 text-primary-400" />
            <span className="text-sm">{participants} participants</span>
          </div>
          <button 
            onClick={toggleMute}
            className="p-2 rounded-lg hover:bg-surface-700 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-surface-700 transition-colors"
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>

      {/* VR Content Area */}
      <div className="relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg">Loading VR Environment...</p>
          </div>
        ) : (
          <div className="h-[calc(100vh-64px)] bg-surface-800 overflow-hidden relative">
            {/* This would be replaced with actual AFrame or React Three Fiber in implementation */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-primary-900/40 flex flex-col items-center justify-center">
              <div className="text-center max-w-md p-8">
                <h2 className="text-2xl font-bold mb-4">VR Support Room Simulation</h2>
                <p className="mb-6">
                  In a real implementation, this would be an immersive VR environment where users could interact.
                </p>
                <p className="text-primary-300 mb-8">
                  Room #{roomId} • Healing & Support Theme
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    className="mr-2"
                    onClick={() => setParticipants(participants + 1)}
                  >
                    Simulate Join
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => setParticipants(Math.max(1, participants - 1))}
                  >
                    Simulate Leave
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VRRoomPage;