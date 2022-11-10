import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";

const read_more = [
  {
    title: "Film Screening",
    image: "../../img/2nd.jpeg",
    description:
      "Something Great Getting a new business off the ground is a lot of hard work.",
  },
  {
    title: "Panel Discussions",
    image: "../../img/3rd.jpeg",
    description:
      "Something Great Getting a new business off the ground is a lot of hard work.",
  },
  {
    title: "Workshop",
    image: "../../img/work.jpeg",
    description:
      "Something Great Getting a new business off the ground is a lot of hard work.",
  },
  {
    title: "Award",
    image: "../../img/last.jpeg",
    description:
      "At AIHRFF 2022, participants will undergo exclusive workshops and capacity-building on the following themes.",
  },
  {
    title: "MasterClass",
    image: "../../img/work.jpeg",
    description:
      "At AIHRFF 2022, participants will undergo exclusive workshops and capacity-building on the following themes.",
  }
];


// ·   	The Power of Storytelling in challenging human rights abuses
// ·   	Financing Human Rights Films
// ·   	Telling compelling human rights stories through films


const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState({});
  const baseUrl = "https://aif-festival.herokuapp.com";

  const fetchHeader = async () => {
    let query = `query{
      hero{
        data{
          id
          attributes{
            features
          }
        }
      }
    }`;

    let response = await axios.post(`${baseUrl}/graphql`, { query: query });
    if (
      response &&
      response !== undefined &&
      response !== null &&
      response.error == null
    ) {
      setHeader(response.data.data.hero);
    }
  };

  const fetchFeatures = async () => {
    let query = `query{
      features{
        data{
          attributes{
            title
            description
            image{
              data{
                attributes{
                  url
                }
              }
            }
          }
        }
      }
    }`;

    let response = await axios.post(`${baseUrl}/graphql`, { query: query });
    if (
      response &&
      response !== undefined &&
      response !== null &&
      response.error == null
    ) {
      setFeatures(response.data.data.features);
      // console.log("See Here the image", response.data.data.features.data[2].attributes.description)
      // console.log(response.data.data.features.data[2].attributes.image.data[0].attributes.url);
      // console.log(response.data)
      setLoading(false);
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    fetchFeatures();
    fetchHeader();
    // responsive();
  }, []);

  


  return (
    <div id="features" className="text-center">
      <div className="container" style={{ paddingTop: "40px" }}>
        {/* <div className="col-md-10 col-md-offset-1 section-title"> */}
        <div className="">
          <h2>
            {header.data?.attributes?.features
              ? header.data?.attributes?.features
              : "Loading..."}
          </h2>
        </div>
        <div className="">
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1000}
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          >
            {read_more.map((more, index) => (
                  <div
                    key={index}
                    className=""
                    style={{ marginBottom: "30px" }}
                  >
                    <div className="">
                      <a href="#" className="">
                        <img
                          className=""
                          src={
                            more.image
                          }
                          alt="AIHRFF"
                        />
                      </a>
                    </div>
                    <div className="flex grid-cols-12 m-[-5px]">
                      <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                          <h3><b>{more.title}</b></h3>
                        </div>
                        <p className="mt-2 text-slate-500">
                          {" "}
                          {more.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Features;
