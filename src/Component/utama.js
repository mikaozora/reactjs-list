import React from 'react';
import {Switch, Route} from 'react-router-dom';
import agenda from './lh';
import keranjang from './keranjang';
import Buku from './Buku';
import latihan from './latihan';
import cart from './cart';

const Utama = () => (
    <Switch>
        <Route exact path="/agenda" component={agenda} />
        <Route path="/keranjang" component={keranjang} />  
        <Route path="/Buku" component={Buku}/>
        <Route path="/latihan" component={latihan} />
        <Route path="/cart" component={cart} />
    </Switch>
)
export default Utama;