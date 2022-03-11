import React, {useState} from 'react';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "./Header";
import {Route} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
    
    return (
    <ThemeProvider theme={theme}>
        <ToastContainer theme='colored' position='bottom-right' hideProgressBar />
        <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/catalog' component={Catalog} />
            <Route path='/catalog/:id' component={ProductDetails} />
            <Route path='/about' component={AboutPage} />
            <Route path='/contact' component={ContactPage} />
        </Container>
    </ThemeProvider>
    );
}

export default App;
