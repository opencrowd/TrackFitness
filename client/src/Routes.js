import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout.js';
import NotFound from './components/NotFound.js';
import Delete from './components/Delete.js';
import Wallet from './components/Wallet.js';
import QRGenerator from './components/QRCode.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import User from './components/User.js';
import Rules from './components/Rules.js';
import Gym from './components/Gym.js';


const Routes = () => (
	<Switch>
		<Route path="/" exact component={Login} />
		<Route path="/login" exact component={Login} />
		<Route path="/register" exact component={Register} />
		<Route path="/user/dashboard" exact component={User} />
    <Route path="/healthfirm/wallet" exact component={Wallet} />
		<Route path="/gym/wallet" exact component={Wallet} />
		<Route path="/user/wallet" exact component={Wallet} />
  	<Route path="/gym/qrcode" exact component={QRGenerator} />
		<Route path="/healthfirm/dashboard" exact component={Gym} />
		<Route path="/gym/dashboard" exact component={Gym} />
		<Route path="/gym/addrules" exact component={Rules} />
		<Route path="/healthfirm/addrules" exact component={Rules} />

		{/* Finally, catch all unmatched routes */}
		<Route component={NotFound} />
	</Switch>
);

export default Routes;
