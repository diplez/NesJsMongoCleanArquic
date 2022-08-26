/**
 * Estado de respuesta
 */
export enum CHAT_EVENTS {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  MESSAGE_SEND = 'sendMessage',
  MESSAGE_NEW = 'newMessage',
  MESSAGE_RECEIVED = 'receivedMessage',
  MESSAGE_DELIVERED = 'deliveredMessage',
  MESSAGE_READ = 'readMessage',
  MESSAGE_READ_BY_PERSONS = 'readMesasageByperson',
  PARTICIPANT_DELETE="participantDelete",
  PARTICIPANT_CURRENT_DELETE="participantCurrentDelete",
  LOGIN = 'login',
  RECEIVED = 'received',
  NOTIFICATION = 'notification'
}