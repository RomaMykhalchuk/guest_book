import React, { useState } from "react";
import Moment from "react-moment";
import { Loader } from "../Components/Loader";
import { useHistory } from "react-router-dom";

export const MessageCard = ({ card }) => {
  const [loading, setLoading] = useState(false);

  const { name, message, date, _id } = card;

  const history = useHistory();

  const deleteCard = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/messages/delete/${_id}`, {
        method: "DELETE",
      });
      const info = await response.json();
      alert(info.message);
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
    history.push("/removed");
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="col l3 m6 s12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{name}</span>
              <p>{message}</p>
              <br />
              <p>Created: </p>
              <Moment date={date} />
            </div>
            <div className="card-action">
              <a className="waves-effect waves-light btn" onClick={deleteCard}>
                delete
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
