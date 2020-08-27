import React from "react";
import { MessageCard } from "../Components/MessageCard";

export const MessagesList = ({ messages }) => {
  return (
    <div className="row card-wrapper">
      {messages.map((card) => (
        <MessageCard card={card} key={card._id} />
      ))}
    </div>
  );
};
