import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../helpers/api";

import { MessagesList } from "../Components/MessagesList";
import { Loader } from "../Components/Loader";

export const MainPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await getDataFromServer();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? <Loader /> : <MessagesList messages={messages} />}
      {messages.length === 0 && !loading && !hasError && (
        <h1 className="center-align">No messages in guest book</h1>
      )}
      {hasError && (
        <h1 className="center-align">Server error occured, please try again</h1>
      )}
    </>
  );
};
