import React, { useState } from "react";
import { Loader } from "../Components/Loader";

export const CreatePage = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const hanldeData = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "userName":
        setName(value);
        break;
      case "userMessage":
        setMessage(value);
        break;
    }
  };

  const sendData = async () => {
    const collectedData = {
      name,
      message,
    };
    setLoading(true);
    try {
      const response = await fetch("/api/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(collectedData),
      });

      const info = await response.json();
      alert(info.message);

      setLoading(false);
    } catch (error) {
      alert(error.message);

      setLoading(false);
    }
    clearInputs();
  };

  const clearInputs = () => {
    setName("");
    setMessage("");
  };

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row">
            <div className="input-field col s6">
              <input
                value={name}
                id="first_name2"
                type="text"
                className="validate"
                onChange={hanldeData}
                name="userName"
              />
              <label className="active" for="first_name2">
                Your Name
              </label>
            </div>
          </div>

          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <textarea
                    id="textarea1"
                    className="materialize-textarea"
                    name="userMessage"
                    value={message}
                    onChange={hanldeData}
                  ></textarea>
                  <label for="textarea1">Your message</label>
                </div>
              </div>
            </form>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={sendData}
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </>
      )}
    </div>
  );
};
