import React from "react";
import "./index.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Questions from "./Pages/Questions";
import AnswersContainer from "./Pages/AnswersContainer";
import FavoriteQuestion from "./Pages/FavoritQuestions";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <ProtectedRoute exact path="/questions" component={Questions} />
          <ProtectedRoute exact path="/favorite" component={FavoriteQuestion} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/answers" component={AnswersContainer} />
          <Route path="/forbiden" component={() => "Forbiden"} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
