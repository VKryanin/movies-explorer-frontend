import React from 'react';
import { lazy } from 'react';
import { Header } from '../Header/Header';
import { Promo } from './Promo/Promo';
import { AboutProject } from './AboutProject/AboutProject';
import { Techs } from './Techs/Techs';
import { AboutMe } from './AboutMe/AboutMe';
import { Footer } from '../Footer/Footer';

const LazyLandingPage = () => {
    return (
        <>
            <Header />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Footer />
        </>
    )
}

const LazyLanding = lazy(() => Promise.resolve({ default: LazyLandingPage }));

export const Landing = () => {
    return <LazyLanding />;
};