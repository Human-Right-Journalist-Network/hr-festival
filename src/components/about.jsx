// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const About = () => {
//   const [abouts, setAbout] = useState();
//   const [loading, setLoading] = useState(false);
//   const [header, setHeader] = useState({});
//   // const baseUrl = "http://localhost:1337"
//   const baseUrl = "https://aif-festival.herokuapp.com";

//   const fetchHeader = async () => {
//     let query = `query{
//       hero{
//         data{
//           id
//           attributes{
//             About_Us
//             why_choose_us
//           }
//         }
//       }
//     }`;

//     let response = await axios.post(`${baseUrl}/graphql`, { query: query });
//     if (
//       response &&
//       response !== undefined &&
//       response !== null &&
//       response.error == null
//     ) {
//       setHeader(response.data.data.hero);
//     }
//   };

//   const fetchAbout = async () => {
//     let query = `query{
//       abouts{
//         data{
//           id
//           attributes{
//             title
//             description
//             image{
//               data{
//                 attributes{
//                   url
//                 }
//               }
//             }
//             createdAt
//           }
//         }
//       }
//     }`;

//     let response = await axios.post(`${baseUrl}/graphql`, { query: query });
//     if (
//       response &&
//       response !== undefined &&
//       response !== null &&
//       response.error == null
//     ) {
//       setAbout(response.data.data.abouts);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAbout();
//     fetchHeader();
//   }, []);

//   return (
//     <div id="about">
//       <div className="container">
//         <div className="row">
//           <div className="col-xs-12 col-md-6">
//             {" "}
//             <img
//               className="img-responsive"
//               alt=""
//               src={abouts?.data[0]?.attributes?.image?.data?.attributes?.url}
//             />
//           </div>
//           <div className="col-xs-12 col-md-6">
//             <div className="about-text">
//               <h2>
//                 {header.data?.attributes?.About_Us
//                   ? header.data?.attributes?.About_Us
//                   : "Loading..."}
//               </h2>
//               <p>
//                 {abouts?.data
//                   ? abouts?.data[0]?.attributes?.description
//                   : "loading..."}
//               </p>
//               <h3>
//                 {header.data?.attributes?.why_choose_us
//                   ? header.data?.attributes?.why_choose_us
//                   : "Loading..."}{" "}
//                 ?
//               </h3>
//               <div className="list-style">
//                 <div className="col-lg-6 col-sm-6 col-xs-12">
//                   <ul>
//                     {abouts?.data
//                       ? abouts?.data?.map((d, i) => (
//                           <li key={i}>{d?.attributes?.title}</li>
//                         ))
//                       : "loading..."}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

export const About = (props) => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src="img/about.jpg" className="img-responsive" alt="AIHRFF" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About AIHRFF</h2>
                <div>{props.data ? props.data.paragraph : "loading..."} <br/>
                <span><b>“To deny people their human rights is to challenge their very humanity” – Nelson Mandela.</b></span>
                </div>
              <div className="list-style">
              <h3 style={{ "paddingTop": "10px"}}>Programme Highlight</h3>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Highlights.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    {props.data
                      ? props.data.Highlights2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
