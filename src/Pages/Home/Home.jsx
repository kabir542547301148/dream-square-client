import React from 'react';
import SliderPage from '../Shared/SliderPage/SliderPage';
import AdvertisedProperties from './AdvertisedProperties';
import LatestUserReviews from './LatestUserReviews';
import WhyChooseUs from './WhyChooseUs';
import DiscoverNeighborhood from './DiscoverNeighborhood';
import Testimonials from './Testimonials';

const Home = () => {
    return (
    <main>
        <SliderPage></SliderPage>
            <div className='max-w-screen-xl mx-auto'>
                <AdvertisedProperties></AdvertisedProperties>
                <LatestUserReviews></LatestUserReviews>
                <WhyChooseUs></WhyChooseUs>
                <Testimonials></Testimonials>
                <DiscoverNeighborhood></DiscoverNeighborhood>
                

            
        </div>
    </main>
    );
};

export default Home;