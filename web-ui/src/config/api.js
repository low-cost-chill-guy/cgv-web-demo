// API 엔드포인트 설정
export const API_CONFIG = {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    endpoints: {
      streamingSessions: '/streaming-sessions',
    }
  };
  
  // API 호출 관련 함수
  export const getStreamingSessionsUrl = (tab) => {
    return `${API_CONFIG.baseURL}${API_CONFIG.endpoints.streamingSessions}?tab=${tab}`;
  };