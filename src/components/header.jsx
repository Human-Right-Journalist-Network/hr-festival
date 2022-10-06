import React, { useEffect, useState } from "react"
import axios from "axios"

const Header = () => {
  const baseUrl = "http://localhost:1337"
  const [header, setHeader] = useState({})
  const [loading, setLoading] = useState(false)


  const fetchHeader = async () => {
    let query = `query{
      hero{
        data{
          id
          attributes{
            hero_button
            hero_image{
              data{
                attributes{
                  url
                }
              }
            }
            hero_title
            hero_description
          }
        }
      }
    }`;

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setHeader(response.data.data.hero);
      // console.log(response.data.data.hero);
      // console.log(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHeader()
  }, [])

  return (
    <header id='header'>
      <div className='intro '>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h2 className="title">
                  {header.data?.attributes?.hero_title ? header.data?.attributes?.hero_title : 'Loading...'}
                  <span></span>
                </h2>
                <p>{header.data?.attributes?.hero_description ? header.data?.attributes?.hero_description : 'Loading'}</p>
                <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  {header.data?.attributes?.hero_button ? header.data?.attributes?.hero_button : 'Loading'}
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header