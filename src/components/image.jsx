import React, { useEffect, useState } from "react"
import axios from "axios"


const Image = ({ title, largeImage, smallImage }) => {
  const [galleries, setGallery] = useState()
  const [loading, setLoading] = useState(false)
  const baseUrl = "http://localhost:1337"

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
      // console.log("Image File", response.data.data.galleries);
      // console.log(response.data.data.galleries.data[1].attributes.image.data.attributes.url);
      // console.log(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGallery()
  }, [])

  return (
    <div className='portfolio-item'>
      <div className='hover-bg'>
        {' '}
        <a
          href={largeImage}
          title={title}
          data-lightbox-gallery='gallery1'
        >
          
          <div className='hover-text'>
            <h4>{title}</h4>
          </div>
            <img
                // src={smallImage}
                src={baseUrl + galleries?.data[3]?.attributes?.image?.data?.attributes?.url}
                className='img-responsive'
                alt={title}
              />
             
        </a>{' '}
      </div>
    </div>
  )
}

export default Image


{/* <img
                  src={baseUrl + d?.attributes?.image?.data?.attributes?.url}
                  className="team-img"
                  alt="" />{" "} */}