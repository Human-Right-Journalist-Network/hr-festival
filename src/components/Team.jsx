import React, { useEffect, useState } from "react"
import axios from "axios"

const Team = () => {
  const baseUrl = "https://aif-festival.herokuapp.com"
  const [teams, setTeam] = useState([])
  const [loading, setLoading] = useState(false)
  const [header, setHeader] = useState({})

  const fetchHeader = async () => {
    let query = `query{
      hero{
        data{
          id
          attributes{
            Meet_the_team
            Meet_the_tea_description
          }
        }
      }
    }`;

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setHeader(response.data.data.hero);
      // console.log(response.data.data.hero.data.attributes.Meet_the_team);
    }
  }

  const fetchTeam = async () => {
    let query = `query{
      teams{
        data{
          id
          attributes{
            name
            designation
            image{
              data{
                attributes{
                  url
                }
              }
            }
            createdAt
          }
        }
      }
    }`;

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setTeam(response.data.data.teams);
      // console.log(response.data.data.teams);
      // console.log(response.data.data.teams.data[3].attributes.designation);
      // console.log(response.data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeam()
    fetchHeader()
  }, [])


  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>{header.data?.attributes?.Meet_the_team ? header.data?.attributes?.Meet_the_team : 'Loading'}</h2>
          <p>
            {header.data?.attributes?.Meet_the_tea_description ? header.data?.attributes?.Meet_the_tea_description : 'Loading'}
          </p>
        </div>

        <div id='row'>
          {teams?.data?.map((d, i) => (
            <div key={i} className='col-md-3 col-sm-6 team'>
              <div className='thumbnail'>
                <img
                  src={d?.attributes?.image?.data?.attributes?.url}
                  className="team-img"
                  alt="" />{" "}
                <div className='caption'>
                  <h4>{d?.attributes?.name}</h4>
                  <p>{d?.attributes?.designation}</p>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}








// export const Team = (props) => {
//   return (
//     <div id='team' className='text-center'>
//       <div className='container'>
//         <div className='col-md-8 col-md-offset-2 section-title'>
//           <h2>Meet the Team</h2>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
//             dapibus leonec.
//           </p>
//         </div>
//         <div id='row'>
//           {props.data
//             ? props.data.map((d, i) => (
//                 <div key={`${d.name}-${i}`} className='col-md-3 col-sm-6 team'>
//                   <div className='thumbnail'>
//                     {' '}
//                     <img src={d.img} alt='...' className='team-img' />
//                     <div className='caption'>
//                       <h4>{d.name}</h4>
//                       <p>{d.job}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             : 'loading'}
//         </div>
//       </div>
//     </div>
//   )
// }


export default Team