import Slider from "react-slick";
import {Box, Typography} from "@mui/material";

export default function HomePage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    return (
        <>
            <Slider {...settings}>
                <div>
                    <img src="/images/hero1.jpg" alt="hero1" style={{display: 'block', width: '100%', maxHeight: 500}} />
                </div>
                <div>
                    <img src="/images/hero2.jpg" alt="hero2" style={{display: 'block', width: '100%', maxHeight: 500}} />
                </div>
                <div>
                    <img src="/images/hero3.jpg" alt="hero3" style={{display: 'block', width: '100%', maxHeight: 500}} />
                </div>
            </Slider>
            
            <Box display='flex' justifyContent='center' sx={{p: 4}}>
                <Typography variant='h1'>
                    Welcome to the shop!
                </Typography>
            </Box>
        </>
    )
}