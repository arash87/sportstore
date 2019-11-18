import React, {Component} from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { GraphQlUrl } from '../data/Urls'
import { OrdersConnector } from './OrdersConnector'
import {Route, Redirect, Switch} from 'react-router-dom'
import {ToggleLink} from '../ToggleLink'
import { ConnectedProduct } from './ProductsConnector'
import { ProductEditor } from './ProductEditor'
import { ProductCreator } from './ProductCreator'
import { AuthPrompt } from '../auth/AuthPrompt'
import { authWrapper } from '../auth/AuthWrapper'
// import {authWrapper} from '../auth/AuthWrapper'


class Admin extends Component{

    constructor(props){
        super(props)
        this.client = new ApolloClient({
            uri: GraphQlUrl,
            request: gqloperations => gqloperations.setContext({
                headers: {
                    Authorization: `Bearer<${this.props.webToken}>`
                }
            })
        })
    }

    render(){
        return <ApolloProvider client={this.client}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info text-white">
                        <div className="navbar-brand">SPORTS STORE</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col p-2">
                        <ToggleLink to="/admin/orders">Orders</ToggleLink>
                        <ToggleLink to="/admin/products">Products</ToggleLink>
                        {
                            this.props.isAuthenticated &&
                            <button onClick={this.props.signout}
                                className="btn btn-block btn-secondary m-2 fixed-bottom col-3">
                                    Log out
                                </button>
                        }
                        {/* <OrdersConnector /> */}
                    </div>
                    <div className="col-9 p-2">
                        <Switch>
                            {
                                !this.props.isAuthenticated &&
                                <Route component={AuthPrompt} />
                            }
                            <Route path="/admin/orders" component={OrdersConnector} />
                            <Route path="/admin/products/create" component={ProductCreator} />
                            <Route path="/admin/products/:id" component={ProductEditor} />
                            <Route path="/admin/products" component={ConnectedProduct} />
                            <Redirect to="/admin/orders" />
                        </Switch>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    }
}


const AdminWrapped = authWrapper(Admin)
export default AdminWrapped
