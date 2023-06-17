import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = () => {
            const { dishId } = useParams(); 
            return (
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(dishId, 10))} />
            );
        };

        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/home' Component={HomePage} />
                    <Route exact path='/menu' element={<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path='/contactus' Component={Contact} />
                    <Route path='/menu/:dishId' Component={DishWithId} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;