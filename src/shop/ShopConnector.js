import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as ShopActions from '../data/ActionCreators'
import * as CartActions from '../data/CartActionCreators'
import { DataTypes } from '../data/types'
import { Shop } from './Shop'
import { CartDetails } from './CartDetails'
import { DataGetter } from '../data/DataGetter'
import { Checkout } from './Checkout'
import { Thanks } from './Thanks'


const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    ...ShopActions, ...CartActions
}

// const filterProducts = (products = [], category) => 
//     (!category || category === "ALL")
//     ? products
//     : products.filter(p => p.category.toLowerCase() === category.toLowerCase())


export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {
        selectComponent = (routerProps) => {
            const wrap = (Component, Content) => 
                <Component {...this.props} {...routerProps}>
                    {Content && wrap(Content)}
                </Component>
            
            switch(routerProps.match.params.section){
                case "products" :
                    return wrap(DataGetter, Shop)
                case "cart":
                    return wrap(CartDetails)
                case "checkout":
                    return wrap(Checkout)
                case "thanks":
                    return wrap(Thanks)
                default:
                    return <Redirect to="/shop/products/all/1" />
            }
        }

        render(){
            return <Switch>
                <Redirect from="/shop/products/:category"
                    to="/shop/products/:category/1" exact={true} />
                <Route path={"/shop/:section?/:category?/:page?"}
                    render= {routerProps => this.selectComponent(routerProps)} />
            </Switch>
        }


        // render() {
        //     return <Switch>
        //         <Redirect
        //             from="/shop/products/:category"
        //             to="/shop/products/:category/1"
        //             exact={true} />
        //         <Route
        //             path={"/shop/products/:category/:page"}
        //             render={(routerProps) =>
        //                 <DataGetter {...this.props} {...routerProps}>
        //                     <Shop {...this.props} {...routerProps} />
        //                 </DataGetter>
        //             }
        //         />
        //         <Route path="/shop/cart" render={(routeProps) =>
        //             <CartDetails {...this.props} {...routeProps} />
        //         } />

        //         <Route path="/shop/checkout" render={routeProps =>
        //             <Checkout {...this.props} {...routeProps} />}
        //         />

        //         <Route path="/shop/thanks" render={routerProps =>
        //             <Thanks {...this.props} {...routerProps} />}
        //         />
        //         <Redirect to="/shop/products/all/1" />
        //     </Switch>
        // }

        componentDidMount() {
            this.props.loadData(DataTypes.CATEGORIES)
        }
    }
)


