import React, {useEffect, useState} from 'react';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header";
import {Route, Switch} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import {useStoreContext} from "../context/StoreContext";
import {getCookie} from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";

function App() {
    const {setBasket} = useStoreContext();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const buyerId = getCookie('buyerId');
        if (buyerId) {
            agent.Basket.get()
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setLoading(false))
        } else {
            setLoading(false);
        }
    }, [setBasket])
    
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light';
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: {
                default: paletteType === 'light' ? '#eaeaea' : '#121212'
            }
        }
    })
    
    function handleThemeChange() {
        setDarkMode(!darkMode);
    }
    
    if (loading) return <LoadingComponent message='Initialising app...' />
    
    return (
    <ThemeProvider theme={theme}>
        <ToastContainer theme='colored' position='bottom-right' hideProgressBar />
        <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/catalog' component={Catalog} />
                <Route path='/catalog/:id' component={ProductDetails} />
                <Route path='/about' component={AboutPage} />
                <Route path='/contact' component={ContactPage} />
                <Route path='/basket' component={BasketPage} />
                <Route path='/checkout' component={CheckoutPage} />
                <Route path='/server-error' component={ServerError} />
                <Route component={NotFound} />
            </Switch>
        </Container>
    </ThemeProvider>
    );
}

export default App;
