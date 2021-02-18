import logo from './logo.svg';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

import {
  Header
} from "./components";



import { Home, Coin, Management } from "./pages";

import styled from "styled-components";

const AuthWrapper = styled.div.attrs({
  className: "auth-wrapper  bg-primary",
})`` ;

const AuthInner = styled.div.attrs({
  className: "auth-inner text-right",
})`
background: white;
margin: 2rem 0;
`;

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Header />
          {/* <Redirect to={"/coin"} /> */}
          <AuthWrapper>
            <AuthInner>
              <Switch>
                <Route exact path="/" exact component={Home} />
                <Route path="/Home" exact component={Home} />
                <Route path="/Coin" exact component={Coin} />
                <Route path="/Management " exact component={Management} />
              </Switch>
            </AuthInner>
          </AuthWrapper>
       </BrowserRouter>
    </div>
  );
}

export default App;
