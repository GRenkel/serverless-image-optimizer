import WebSocket from 'isomorphic-ws';
const WEB_SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL || ""

export const awsWebSocket = {
  webSocket: undefined,
  notificationListeners: [],
  isConnectionOpen: false,

  establishSocketConnection: function ({ userIdentifier }) {
    const wsURL = `${WEB_SOCKET_URL}?userId=${userIdentifier}`;
    this.webSocket = new WebSocket(wsURL);
    this.webSocket.onopen = this.onConnectionOpen;
    this.webSocket.onmessage = this.onNotificationReceived.bind(this);
    this.webSocket.onclose = this.onConnectionClose;
  },

  addEventListener(callback, identification) {
    if (typeof callback !== 'function') {
      return
    }
    this.notificationListeners.push({ listener: callback, identification })
  },

  onNotificationReceived ({ data }) {
    console.log(data)
    const notification = JSON.parse(data);
    const { listener } = this.notificationListeners.find(event => event.identification === notification.identification)
    listener(notification)
  },

  onConnectionOpen() {
    this.isOpen = true;
    console.log('AWS Websocket connected!');
  },

  onConnectionClose() {
    console.log('AWS Websocket closed!');
  },

}