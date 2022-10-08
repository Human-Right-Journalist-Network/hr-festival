import React, { useEffect, useState } from "react"
import axios from "axios"
import Image from "./image";


// const Gallery = (props) => {
//   const [galleries, setGallery] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [header, setHeader] = useState({})
//   const baseUrl = "https://aif-festival.herokuapp.com"

  // const fetchHeader = async () => {
  //   let query = `query{
  //     hero{
  //       data{
  //         id
  //         attributes{
  //           Gallery
  //           Gallery_Description
  //         }
  //       }
  //     }
  //   }`;

  //   let response = await axios.post(`${baseUrl}/graphql`, { query: query })
  //   if (response && response !== undefined && response !== null && response.error == null) {
  //     setHeader(response.data.data.hero);
  //   }
  // }

  // const fetchGallery = async () => {
  //   let query = `query{
  //     galleries{
  //       data{
  //         attributes{
  //           title
  //           image{
  //             data{
  //               attributes{
  //                 url
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }`;

  //   let response = await axios.post(`${baseUrl}/graphql`, { query: query })
  //   if (response && response !== undefined && response !== null && response.error == null) {
  //     setGallery(response.data.data.galleries);
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchGallery()
  //   fetchHeader()
  // }, [])


//   return (
//     <div id='portfolio' className='text-center'>
//       <div className='container'>
//         <div className='section-title'>
        // <h2>{header.data?.attributes?.Gallery ? header.data?.attributes?.Gallery : 'Loading...'}</h2>
//           <p>
//             {header.data?.attributes?.Gallery_Description ? header.data?.attributes?.Gallery_Description : 'Loading...'}
//           </p>
//         </div>
//         <div className='row'>
//           <div className='portfolio-items'>
//             {props?.data
//               ? galleries?.data?.map((d, i) => (
//                 <div key={`${d?.attributes?.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4'>
//                   <Image title={d?.attributes?.title} largeImage={d?.largeImage} smallImage={d?.smallImage} />
//                 </div>
//               ))
//               : 'Loading...'}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Gallery

export const Gallery = (props) => {
  const [galleries, setGallery] = useState([])
  const [loading, setLoading] = useState(false)
  const [header, setHeader] = useState({})
  const baseUrl = "https://aif-festival.herokuapp.com"

  const fetchHeader = async () => {
    let query = `query{
      hero{
        data{
          id
          attributes{
            Gallery
            Gallery_Description
          }
        }
      }
    }`;

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setHeader(response.data.data.hero);
    }
  }


  const fetchGallery = async () => {
    let query = `query{
      galleries{
        data{
          attributes{
            title
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

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setGallery(response.data.data.galleries);
      // console.log(response.data.data.galleries)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
    fetchHeader()
  }, [])


  return (
    <div id='portfolio' className='text-center'>
      <div className='container'>
        <div className='section-title'>
        <h2>{header.data?.attributes?.Gallery ? header.data?.attributes?.Gallery : 'Loading...'}</h2>
          <p>
          {header.data?.attributes?.Gallery_Description ? header.data?.attributes?.Gallery_Description : 'Loading...'}
          </p>
        </div>
        <div className='row'>

          <div className='portfolio-items'>
            {props.data
              ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4'>
                  <Image title={d.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                </div>
              ))
              : 'Loading...'}
          </div>

          {/* <div className='portfolio-items'>
            {galleries?.data
              ? galleries?.data.map((d, i) => (
                <div key={`${d?.attribute?.title}-${i}`} className='col-sm-6 col-md-4 col-lg-4'>
                  <Image title={d?.attribute?.title} largeImage={d.largeImage} smallImage={d.smallImage} />
                </div>
              ))
              : 'Loading...'}
          </div> */}
        </div>
      </div>
    </div>
  )
}
