import React, { useEffect, useState } from "react"
import axios from 'axios';


const Features = () => {
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(false)
  const [header, setHeader] = useState({})
  const baseUrl = "https://aif-festival.herokuapp.com"

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

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setHeader(response.data.data.hero);
    }
  }

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

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setFeatures(response.data.data.features);
      // console.log("See Here the image", response.data.data.features.data[2].attributes.description)
      // console.log(response.data.data.features.data[2].attributes.image.data[0].attributes.url);
      // console.log(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeatures()
    fetchHeader()
  }, [])


  return (
    <div id='features' className='text-center'>
      <div className='container'>
        <div className='col-md-10 col-md-offset-1 section-title'>
          <h2>{header.data?.attributes?.features ? header.data?.attributes?.features : 'Loading...'}</h2>
        </div>
        <div className='row' id="">
          {features?.data
            ? features?.data?.map((d, i) => (
                <div key={`${d.title}-${i}`} className='col-xs-6 col-md-3'>
                  <img 
                    src={d?.attributes?.image?.data[0]?.attributes?.url}
                  />
                  <h3>{d?.attributes?.title}</h3>
                  <p>{d?.attributes?.description}</p>
                  
                </div>
              ))
            : 'Loading...'}
        </div>
      </div>
    </div>
  )
}

export default Features
