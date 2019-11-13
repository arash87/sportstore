import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../data/ActionCreators'
import { DataTypes } from '../data/types'
import { Shop } from './Shop'
import { addToCart, updateCartQuantity, removeFromCart, clearCart } from '../data/CartActionCreators'
import { CartDetails } from './CartDetails'
import { DataGetter } from '../data/DataGetter'

const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    loadData, addToCart, updateCartQuantity, removeFromCart, clearCart
}

// const filterProducts = (products = [], category) => 
//     (!category || category === "ALL")
//     ? products
//     : products.filter(p => p.category.toLowerCase() === category.toLowerCase())


export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {
        render() {
            return <Switch>
                <Redirect
                    from="/shop/products/:category"
                    to="/shop/products/:category/1"
                    exact={true} />
                <Route
                    path={"/shop/products/:category/:page"}
                    render={(routerProps) =>
                        <DataGetter {...this.props} {...routerProps}>
                            <Shop {...this.props} {...routerProps} />
                        </DataGetter>
                    }
                />
                <Route path="/shop/cart" render={(routeProps) =>
                    <CartDetails {...this.props} {...routeProps} />
                } />
                <Redirect to="/shop/products/all/1" />
            </Switch>
        }

        componentDidMount() {
            this.props.loadData(DataTypes.CATEGORIES)
        }
    }
)


