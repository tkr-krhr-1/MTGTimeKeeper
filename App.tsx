import React, { useState, useCallback } from 'react';
import SetupScreen from './components/SetupScreen';
import MeetingScreen from './components/MeetingScreen';

function App() {
  const [meetingData, setMeetingData] = useState(null);
  const [isMeetingStarted, setIsMeetingStarted] = useState(false);

  const handleStartMeeting = useCallback((data) => {
    setMeetingData(data);
    setIsMeetingStarted(true);
  }, []);

  const handleEndMeeting = useCallback(() => {
    setIsMeetingStarted(false);
    // Keep meeting data to pre-fill the form, but allow starting a new one
    // setMeetingData(null); 
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 selection:bg-sky-500 selection:text-white">
      <main className="w-full max-w-4xl mx-auto">
        {!isMeetingStarted ? (
          <SetupScreen onStart={handleStartMeeting} initialData={meetingData} />
        ) : meetingData ? (
          <MeetingScreen meetingData={meetingData} onEnd={handleEndMeeting} />
        ) : (
          // Fallback in case state is inconsistent
          <SetupScreen onStart={handleStartMeeting} initialData={null} />
        )}
      </main>
    </div>
  );
}

export default App;
