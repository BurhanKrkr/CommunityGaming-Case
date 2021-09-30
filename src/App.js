// import './App.css';
import GameCards from "./component/GameCards";
import AddGameCard from "./forms/AddGameCard";
import Navbar from "./layout/Navbar";
// import Footer from "./layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {

  return (
    <Router>
      <div>
        <Navbar title="COMMUNITY GAMING" />
      </div>

      <div className="container">
        <Switch>
          <Route exact path="/" component={GameCards} />
          <Route exact path="/add" component={AddGameCard} />
          {/* <Route component={NotFound} /> */}
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
