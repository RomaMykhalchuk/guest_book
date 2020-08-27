export const getDataFromServer = () => {
  return fetch("/api/messages").then((response) => response.json());
};
