import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CandidateList from './Components/CandidateList';
import Candidate from './Components/CandidateDetail';
import Update from './Components/UpdateCandidate';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/candidate/:id" exact component={Candidate} />
          <Route path="/candidate/update/:id" exact component={Update}></Route>
          <Route path="/" exact component={CandidateList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
