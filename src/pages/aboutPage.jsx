import React from "react";

const AboutPage = () => {
    return (
        <div className="text-center p-10 bg-white px-10 md:px-60">
            <div className="mb-15 bg-[url(../src/images/background-flowers.png)] bg-cover bg-center p-10 rounded-lg shadow-lg text-white">
            <h1>About Veloura</h1>
            <p>
                Welcome to Veloura, your trusted platform for discovering and booking
                the perfect wedding venues. We understand that your wedding day is one
                of the most important days of your life, and we are here to make the
                planning process as seamless and stress-free as possible.
            </p>
            </div>
            <h2>Our Mission</h2>
            <p className="mb-20">
                At Veloura, our mission is to connect couples with stunning venues that
                match their vision and style. Whether you're dreaming of a grand
                ballroom, a rustic barn, or a scenic outdoor location, we have a wide
                range of options to suit every taste and budget.
            </p>
            <h2>Why Choose Veloura?</h2>
            <ul className="mb-20">
                <li>
                    <strong>Extensive Selection:</strong> Explore a curated list of
                    wedding venues from around the world.
                </li>
                <li>
                    <strong>Easy Booking:</strong> Our user-friendly platform makes it
                    simple to find and book your dream venue.
                </li>
                <li>
                    <strong>Trusted Reviews:</strong> Read reviews from other couples to
                    make informed decisions.
                </li>
                <li>
                    <strong>Expert Support:</strong> Our team is here to assist you every
                    step of the way.
                </li>
            </ul>
            <h2>Start Your Journey</h2>
            <p className="mb-20">
                Let Veloura help you create unforgettable memories. Start exploring our
                venues today and take the first step toward your dream wedding.
            </p>
        </div>
    );
};

export default AboutPage;