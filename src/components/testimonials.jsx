import React, { useEffect, useState } from "react"
import axios from "axios"
import swal from 'sweetalert';


const Testimonials = (props) => {
  const baseUrl = "https://aif-festival.herokuapp.com"
  const [partners, setParners] = useState()
  const [header, setHeader] = useState({})

  const fetchPartner = async () => {
    let query = `query{
      partners{
        data{
          attributes{
            name
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
    }`

    let result = await axios.post(`${baseUrl}/graphql`, {query: query})
    if (result && result !== undefined && result !== null && result.error == null) {
      setParners(result.data.data.partners)
      // console.log(result.data.data.partners)
      // console.log(result.data.data.partners.data[2].attributes.logo.data.attributes.url);
      // console.log("here", result.data.data.partners.data[3].attributes.logo.data.attributes.url);
      // swal({
      //   text: "Data Fetched Successfully",
      //   icon: "success",
      //   timer: 1500,
      // });
    }
  }

  const fetchHeader = async () => {
    let query = `query{
      hero{
        data{
          id
          attributes{
            What_our_clients_says
          }
        }
      }
    }`;

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setHeader(response.data.data.hero);
    }
  }

  useEffect(() => {
    fetchHeader()
    fetchPartner()
  }, [])


  return (
    <div id='testimonials'>
      <div className='container'>
        <div className='section-title text-center'>
        <h2>{header.data?.attributes?.What_our_clients_says ? header.data?.attributes?.What_our_clients_says : 'Loading...'}</h2>
        </div>
        <div className='row'>
          {partners?.data
            ? partners?.data?.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-4'>
                  <div className='testimonial'>
                    <div className='testimonial-image'>
                      {' '}
                      <img src={d?.attributes?.logo?.data?.attributes?.url} alt='' />{' '}
                      {/* <img src={baseUrl + partners?.data[1]?.attributes?.logo?.data?.attributes?.url} alt='' />{' '} */}
                      {/* d?.attributes?.image?.data[0]?.attributes?.url */}
                      {/* partners.data[2].attributes.logo.data.attributes.url */}
                    </div>
                    <div className='testimonial-content'>
                      {/* <p>"{d?.attributes?.name}"</p> */}
                      <div className='testimonial-meta'> - {d?.attributes?.name} </div>
                    </div>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
