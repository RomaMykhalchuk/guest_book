import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CreatePage } from "./pages/CreatePage";
import { MainPage } from "./pages/MainPage";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/create" exact>
        <CreatePage />
      </Route>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
