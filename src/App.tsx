import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { PageWrapper } from './components/PageWrapper/PageWrapper';
import { Cards } from './features/cards/Cards';
import { Catalog } from './features/catalog/Catalog';
import { Users } from './features/users/Users';

const App: React.FC = () => {
  return (
    <Router>
      <PageWrapper>
        <Switch>
          <Route exact path="/" component={Catalog} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/cards" component={Cards} />
        </Switch>
      </PageWrapper>
    </Router>
  );
};

export default App;
