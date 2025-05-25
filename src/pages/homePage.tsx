import React, { useEffect, useState } from "react";
import { fetchVenues } from "../api/venuesApi";
import Carousel, { CarouselImage } from "../components/carousel";

function HomePage() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);

  useEffect(() => {
    fetchVenues().then((response) => {
      const images = response.data
        .filter((venue) => venue.media.length > 0)
        .filter((_, index) => index <= 5).map((venue) => (
        {
          url: venue.media[0].url,
          title: venue.name,
          props: {
            id: venue.id
          }
        }
      ));
      setCarouselImages(images);
    });
  }, []);

  function handleImageClick(item: CarouselImage) {
    if (!item.props || !item.props.id) {
      return;
    }
    location.href = `/venue/${item.props.id}`; // Assuming title is unique for each venue
  }

  return (
    <div>
      <section className="h-hero bg-[url('/src\images\hero-bg.png')] px-10 md:px-wrapper flex items-center text-white bg-cover bg-center bg-no-repeat">
        <div>
          <h1>Forever starts here</h1>
          <p className="text-big-p">
            A handpicked collection of exquisite wedding venues
          </p>
          <div className="flex flex-row gap-4 mt-8">
            <button className="primary-button-light" 
            onClick={() => location.href = `/venues`}>View venues</button>
            <button className="secondary-button-light"
            onClick={() => location.href = `/contact`}>Contact us</button>
          </div>
        </div>
      </section>

      <section className="h-fit bg-white px-5 md:px-wrapper flex flex-col p-10">
        <h2 className="text-center">Highlights</h2>
         <Carousel
          images={carouselImages}
          onItemClicked={handleImageClick}
        />
      </section>

      <section className="px-10 md:px-wrapper flex flex-col my-5 sm:my-15 gap-5 sm-gap-10 lg:gap-20 text-woody-wine lg:flex-row md:items-center">
        <div className="items-center lg:items-start">
          <img
            src="/src/images/home-about.png"
            alt=""
            className="w-[60vw] lg:w-[40vw] object-cover"
          />
        </div>
        <div className="flex flex-col justify-around md:flex-col">
          <h3>Do you need help planning your big day?</h3>
          <p className="text-small-p  md:text-medium-p">
            Finding the perfect venue is just the beginning. At Veloura, we
            offer curated resources, planning tools and trusted recommodatins to
            help you design a celebration that is effortless, elegant and
            entirely yours.
          </p>
          <ul className="pl-5">
            <li className="text-small-p md:text-medium-p list-disc">
              Venue coordination support (help with liasing hosts)
            </li>
            <li className="text-small-p md:text-medium-p list-disc">
              Trusted supplier lists (catering, florists, photographers){" "}
            </li>
            <li className="text-small-p md:text-medium-p list-disc">Planning checklists</li>
            <li className="text-small-p md:text-medium-p list-disc">
              Guest accommodation guidance
            </li>
            <li className="text-small-p md:text-medium-p list-disc">Style and design tips</li>
          </ul>
          <div>
            <button className="primary-button-light mt-5">Read more</button>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-wrapper flex flex-col pt-[50px] pb-[50px] items-center text-center gap-5 text-woody-wine">
        <h2>About Veloura</h2>
        <p className="text-small-p  md:text-medium-p text-center">
          Veloura is a modern platform for discovering and booking luxurious
          accommodation wedding venues. Curated for design-conscious couples,
          Veloura blends timeless elegance with contemporary simplicity—offering
          seamless access to beautifully appointed spaces where love, style, and
          stay meet effortlessly.
        </p>
        <button 
        className="secondary-button-dark"
        onClick={() => location.href="/about"}>Read more</button>
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
