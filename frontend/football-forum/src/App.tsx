import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Navbar/Header';
import HomeScreen from './screens/HomeScreen';
import TablesScreen from './screens/TablesScreen';
import MatchesScreen from './screens/MatchesScreen';
import LivechatScreen from './screens/LivechatScreen';
import AddMemScreen from './screens/AddMemScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';

function App(): JSX.Element {

  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="row">
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/tables" component={TablesScreen}></Route>
          <Route path="/matches" component={MatchesScreen}></Route>
          <Route path="/livechat" component={LivechatScreen}></Route>
          <Route path="/addmem" component={AddMemScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
        </main>
      </BrowserRouter>

    </>
  );
}

export default App;