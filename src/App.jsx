import React, { useState, useContext } from 'react';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonMenu,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonImg,
  IonMenuButton,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { IonMenuToggle } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import Login from './pages/login';
import './pages/Tab1.css';
import Register from './pages/registerhere';
import Changepass from './pages/changepassword';
import Weborder from './pages/Showcarthistory';
import Watchlist from './pages/watchlist';
import Basket from './pages/basket';
import { BasketProvider } from './context/BasketContext';
import { SearchProvider } from './context/SearchContext';
import Home from './pages/home';
import Tablesearch from './pages/tablesearch';
import WebHistory from './pages/webhistory';
import WebHistorytable from './pages/webhistorytable';

function apps() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchState, setSearchState] = useState({});

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const hideTabBarRoutes = ['/login', '/register', '/forget', '/resetpassword'];
  return (
    <>

      <IonReactRouter>
        <SearchProvider>
          <BasketProvider>
            <IonTabs id="main-content">
              <IonRouterOutlet>
                <Redirect exact path="/" to="/login" />
                <Route path="/home" render={() => <Home></Home>} exact={true} />
                <Route path="/login" render={() => <Login />} exact={true} />
                <Route path="/register" render={() => <Register />} exact={true} />
                <Route path="/changepass" render={() => <Changepass></Changepass>} exact={true} />
                <Route path="/webhistory" render={() => <Weborder></Weborder>} exact={true} />
                <Route path="/watchlist" render={() => <Watchlist></Watchlist>} exact={true} />
                <Route path="/basket" render={() => <Basket></Basket>} exact={true} />
                <Route path="/tableshow" render={() => <Tablesearch />} exact={true} />
                <Route path="/webhistory" render={() => <WebHistory></WebHistory>} exact={true} />
                <Route path="/webhistorytable" render={() => <WebHistorytable></WebHistorytable>} exact={true} />
              </IonRouterOutlet>
            </IonTabs>
          </BasketProvider>
        </SearchProvider>
      </IonReactRouter>
    
      
    </>
  );
}

export default apps; 