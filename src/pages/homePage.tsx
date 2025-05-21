import React, { useEffect, useState } from "react";
import { fetchVenues } from "../api/venuesApi";
import Carousel, { CarouselImage } from "../components/carousel";

function HomePage() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);

  useEffect(() => {
    fetchVenues().then((response) => {
      const images = response.data.filter((_, index) => index <= 5).map((venue) => (
        {
          url: venue.media[0].url,
          title: venue.name,
        }
      ));
      setCarouselImages(images);
    });
  }, []);

  return (
    <div>
      <section className="h-hero bg-[url('/src\images\hero-bg.png')] px-wrapper flex items-center text-white bg-cover bg-center bg-no-repeat">
        <div>
          <h1>Forever starts here</h1>
          <p className="text-big-p">
            A handpicked collection of exquisite wedding venues
          </p>
          <div className="flex flex-row gap-4 mt-8">
            <button className="primary-button-light">About us</button>
            <button className="secondary-button-light">Contact us</button>
          </div>
        </div>
      </section>

      <section className="h-highlights bg-white px-wrapper flex flex-col pt-[50px]">
        <h2>Highlights</h2>
         <Carousel
          images={carouselImages}
        />
      </section>

      <br/>
      <br/>
      <br/>
      <br/>

      <section className="px-wrapper flex flex-row mt-[90px] mb-[90px] gap-20 text-woody-wine">
        <div className="">
          <img
            src="/src/images/home-about.png"
            alt=""
            className="h-[400px] w-[600px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-around">
          <h3>Do you need help planning your big day?</h3>
          <p className="text-medium-p">
            Finding the perfect venue is just the beginning. At Veloura, we
            offer curated resources, planning tools and trusted recommodatins to
            help you design a celebration that is effortless, elegant and
            entirely yours.
          </p>
          <ul className="pl-5">
            <li className="text-medium-p list-disc">
              Venue coordination support (help with liasing hosts)
            </li>
            <li className="text-medium-p list-disc">
              Trusted supplier lists (catering, florists, photographers){" "}
            </li>
            <li className="text-medium-p list-disc">Planning checklists</li>
            <li className="text-medium-p list-disc">
              Guest accommodation guidance
            </li>
            <li className="text-medium-p list-disc">Style and design tips</li>
          </ul>
          <div>
            <button className="primary-button-light">Read more</button>
          </div>
        </div>
      </section>

      <section className="bg-white px-wrapper flex flex-col pt-[50px] pb-[50px] justify-center items-center gap-5 text-woody-wine">
        <h2>About Veloura</h2>
        <p className="text-medium-p text-center">
          Veloura is a modern platform for discovering and booking luxurious
          accommodation wedding venues. Curated for design-conscious couples,
          Veloura blends timeless elegance with contemporary simplicity—offering
          seamless access to beautifully appointed spaces where love, style, and
          stay meet effortlessly.
        </p>
        <button className="secondary-button-dark">Read more</button>
      </section>

      <section>
        <img
          src="/src/images/home-bottom.png"
          alt="Flower arrangement"
          className="bg-cover w-full"
        />
      </section>
    </div>
  );
}

export default HomePage;
