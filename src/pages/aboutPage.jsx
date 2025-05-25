import React from "react";

const AboutPage = () => {
    return (
        <div>
            <section className="bg-[url('/images/background-flowers.png')] bg-cover bg-center h-64 flex items-center justify-center text-white">
                <h1>About Veloura</h1>
            </section>

            <div className="flex flex-col items-center py-10 px-5 lg:px-wrapper bg-white text-woody-wine gap-10">
                <h3>Our Story</h3>
                <p>Veloura was born from a desire to elevate the way couples discover and experience their wedding venue. In a world of endless options, we 
                    offer something different: curated calm, timeless beauty, and intentional simplicity.
                We bring together luxurious spaces that don’t just host weddings — they hold memories. Every venue we feature is handpicked for its design, 
                atmosphere, and ability to effortlessly host both the celebration and the stay.</p>

                <h3>Our Philosophy</h3>
                <p>We believe in understated elegance, seamless experiences, and the magic of well-chosen details. Veloura is for those who value quality over quantity, 
                    and moments that feel as good as they look.</p>

                <h3>For the modern romantic</h3>
                <p>Whether you're planning an intimate elopement or a full weekend celebration, Veloura is your starting point. Our platform brings together the world’s 
                    most elegant wedding stays, all in one thoughtfully designed space.</p>
            </div>
            
        </div>
    );
};

export default AboutPage;