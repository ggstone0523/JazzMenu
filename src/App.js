import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import JazzMainMenu from './pages/JazzMainMenu';
import JazzModifyRecurPage from './pages/JazzModifyRecurPage';
import JazzModifyPage from './pages/JazzModifyPage';
import JazzRecurPage from './pages/JazzRecurPage';
import JazzCreateRecurPage from './pages/JazzCreateRecurPage';
import JazzInterPage from './pages/JazzInterPage';

const App = () => {
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={JazzMainMenu} />
        <Route path="/JazzRecur/:id/:db" component={JazzRecurPage} />
        <Route path="/JazzModify/:id/:page" component={JazzModifyPage} />
        <Route path="/JazzModifyRecur/:id/:page/:db" component={JazzModifyRecurPage} />
        <Route path="/JazzCreateRecur/:db" component={JazzCreateRecurPage} />
        <Route path="/JazzInter" component={JazzInterPage} />
      </Switch>
    </Router>
  );
};

export default App;
