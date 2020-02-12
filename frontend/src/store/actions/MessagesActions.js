import * as MessagesTypes from './messagesTypes';

export const setMessageFields = (payload) => ({
  type: MessagesTypes.SET_MESSAGE_FIELDS,
  payload,
});

export const sendMessage = () => ({
  type: MessagesTypes.SEND_MESSAGE,
});

export const sentMessageSucceeded = () => ({
  type: MessagesTypes.SENT_MESSAGE_SUCCEEDED,
});

export const sentMessageFailed = (payload) => ({
  type: MessagesTypes.SENT_MESSAGE_FAILED,
  payload,
});
