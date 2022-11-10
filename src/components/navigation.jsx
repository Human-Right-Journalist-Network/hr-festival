import React, { useEffect, useState } from "react";
import axios from "axios";

const Navigation = () => {
  const baseUrl = "https://aif-festival.herokuapp.com";
  const [navigators, setNavigation] = useState();
  const [loading, setLoading] = useState(false);

  const fetchNavigator = async () => {
    let query = `  query{
      navigators(sort:"id:asc"){
        data{
          attributes{
            publishedAt
            title
            logo{
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
      setNavigation(response.data.data.navigators);
      console.log(
        "Is it there",
        response.data.data.navigators.data[0].attributes.logo.data.attributes
          .url
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigator();
  }, []);

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            <div
              style={{
                position: "absolute",
                fontSize: "20px",
                marginLeft: "64px",
                paddingTop: "30px",
              }}
            >
              {/* {navigators?.data[0]?.attributes?.title} */}
              AIHRFF FESTIVAL
            </div>
            <img src="../../img/icon.jpeg" className="team-img" alt="" />{" "}
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Feature
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#portfolio" className="page-scroll">
                Gallery
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Teams
              </a>
            </li>
            <li>
              <a href="#testimonials" className="page-scroll">
                Partners
              </a>
            </li>
            <li>
              <a href="#partners" className="page-scroll">
                Support AIHRFF
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            {/* <li>
              <a href='#partners' className='page-scroll'>
              {navigators?.data[7]?.attributes?.title}
              </a> 
            </li>*/}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
