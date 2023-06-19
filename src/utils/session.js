import { v4 as uuidv4 } from 'uuid';

const getSessionConfig = () => {

  let sessionIdentifier = localStorage.getItem('session-id');

  if (!sessionIdentifier) {
    const sessionId = uuidv4();
    localStorage.setItem('session-id', sessionId);
    sessionIdentifier = sessionId;
  }
  return {
    sessionIdentifier
  }
}

export {
  getSessionConfig
}