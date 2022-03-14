import {AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography} from "@mui/material";
import {DarkMode, LightMode, ShoppingCart} from "@mui/icons-material";
import {Link, NavLink} from "react-router-dom";
import {useStoreContext} from "../context/StoreContext";

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void
}

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'}
]

const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'}
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({darkMode, handleThemeChange}: Props) {
    const {basket} = useStoreContext();
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
    
    return (
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                
                <Typography variant='h6' component={NavLink} to='/' exact sx={navStyles}>
                    RE-STORE
                </Typography>
                
                <List sx={{display: 'flex'}}>
                    {midLinks.map(({title, path}) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                
                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size='large' sx={{color: 'inherit'}}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    
                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>

                    <Switch checked={darkMode} onChange={handleThemeChange}
                            icon={<LightMode sx={{bgcolor: 'grey.700', borderRadius: 4}} />}
                            checkedIcon={<DarkMode sx={{bgcolor: 'grey.700', borderRadius: 4}} />}
                    />
                </Box>
                
            </Toolbar>
        </AppBar>
    )
}