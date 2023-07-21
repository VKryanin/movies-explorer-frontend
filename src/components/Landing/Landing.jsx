import React from 'react';
import { lazy } from 'react';

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