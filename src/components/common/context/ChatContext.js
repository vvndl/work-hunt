import React, { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  if (currentUser) {
    // Now, you can safely access currentUser properties
    INITIAL_STATE.user = currentUser;
    INITIAL_STATE.chatId =
      currentUser.userID > INITIAL_STATE.user.userID
        ? currentUser.userID + INITIAL_STATE.user.userID
        : INITIAL_STATE.user.userID + currentUser.userID;
  }

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.userID > action.payload.userID
              ? currentUser.userID + action.payload.userID
              : action.payload.userID + currentUser.userID,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
