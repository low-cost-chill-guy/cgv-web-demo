import React, { useState } from 'react';
import StreamingSessions from '../components/chat/StreamingSession';
import Chat from '../components/chat/Chat';

const App = () => {
  const [selectedSession, setSelectedSession] = useState(null);

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  return (
    <div>
      {!selectedSession ? (
        <StreamingSessions onSelectSession={handleSessionSelect} />
      ) : (
        <Chat 
          chatRoomId={selectedSession.chatRoomId}
          apiUrl={selectedSession.apiUrl}
          region={selectedSession.chatRegion}
        />
      )}
    </div>
  );
};

export default App;