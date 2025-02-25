import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { updateStreamingConstants } from '../../config';
import './StreamingSession.css';
import { getStreamingSessionsUrl } from '../../config/api';

const StreamingSession = ({ onSelectSession }) => {
  const [sessions, setSessions] = useState({ active: [], past: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  const fetchSessions = async (tab) => {
    setLoading(true);
    try {
      const response = await axios.get(getStreamingSessionsUrl(tab));

      if (tab === 'active') {
        const sortedActiveSessions = response.data.active.sort(
          (a, b) => new Date(a.scheduledStartTime) - new Date(b.scheduledStartTime)
        );
        setSessions({ ...sessions, active: sortedActiveSessions });
      } else {
        setSessions({ ...sessions, [tab]: response.data[tab] });
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load streaming sessions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions('active');
  }, []);

  useEffect(() => {
    fetchSessions(activeTab);
  }, [activeTab]);

  const handleSessionClick = (session) => {
    if (!session.isLive) {
      alert('라이브 스트리밍이 켜져있지 않습니다.');
      return;
    }

    if (session.isHistory) {
      alert('이미 종료된 상영회입니다.');
      return;
    }

    const configUpdate = {
      playbackUrl: session.playbackUrl,
      chatRoomArn: session.chatRoomArn,
      chatRegion: session.chatRegion,
      apiUrl: session.apiUrl,
    };

    updateStreamingConstants(configUpdate);
    if (onSelectSession) onSelectSession(configUpdate);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>상영 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  const currentSessions = activeTab === 'active' ? sessions.active : sessions.past;

  return (
    <div className="streaming-container">
      <div className="streaming-header">
        <h1>CGV</h1>
        <div className="tab-container">
          <button
            className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            현재 상영작
          </button>
          <button
            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            지난 상영작
          </button>
        </div>
      </div>

      <div className="sessions-grid">
        {currentSessions.length === 0 ? (
          <p className="no-sessions">상영 정보가 없습니다.</p>
        ) : (
          currentSessions.map((session, index) => (
            <div
              key={`${session.chatRoomId}-${index}`}
              className="movie-card"
              onClick={() => handleSessionClick(session)}
            >
              <div className="movie-header">
                <span className="movie-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="badge-container">
                  {session.isLive && (
                    <span className="badge badge-live">LIVE</span>
                  )}
                  {!session.isLive && !session.isHistory && (
                    <span className="badge badge-upcoming">상영 예정</span>
                  )}
                </div>
              </div>

              <div className="movie-info">
                <h3 className="movie-title">{session.title}</h3>
                <p className="movie-description">{session.description}</p>
                <div className="session-time">
                  <div className="time-row">
                    <span>상영 시작</span>
                    <span>{new Date(session.scheduledStartTime).toLocaleString()}</span>
                  </div>
                  <div className="time-row">
                    <span>상영 종료</span>
                    <span>{new Date(session.scheduledEndTime).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StreamingSession;