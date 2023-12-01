import Hero from './Hero';
import Admission from './Admission';
// import Founder from './Founder';
import Goals from './/Goals';
import Result from './/Result';
import Plans from './/Plans';
import Session from './/Session';
import Quotes from './/Quotes';
import University from './/University';
import FaqSection from './/Faq';

import ReactGA from 'react-ga';
ReactGA.initialize("UA-255807593")
ReactGA.pageview(window.location.pathname + window.location.search);


const Tutoring = () => {
    return (
        <>
            <Hero />
            <Admission />
            {/* <Founder /> */}
            <Goals />
            <Result />
            <Plans />
            <Session />
            <Quotes />
            <FaqSection />
            <University />
        </>
    );
};

export default Tutoring;
