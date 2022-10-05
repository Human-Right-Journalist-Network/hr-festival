import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert';

const Contact = () => {

  const baseUrl = "http://localhost:1337"
  const [contact, setContact] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [header, setHeader] = useState({})

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
            features
            About_Us
            Gallery_Description
            What_our_clients_says
            Meet_the_team
            Meet_the_tea_description
            get_in_touch
            get_in_touch_description
            contact_info
            contact_email
            phone_number
            address
          }
        }
      }
    }`;

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setHeader(response.data.data.hero);
      // console.log(response.data.data.hero);
      // console.log(response.data)
      // setLoading(false)
    }
  }

  const fetchContact = async () => {
    let query = `query{
      contactLists{
        data{
          id
          attributes{
            name
            email
            message
          }
        }
      }
    }`;

    let response = await axios.post(`${baseUrl}/graphql`, { query: query })
    if (response && response !== undefined && response !== null && response.error == null) {
      setContact(response.data.data.contactLists);
      // console.log(response.data.data.contactLists);
    }
  }

  const handleSubmit = async () => {
    try {
      let query = `
        mutation{
          createContactList(
            data: { 
            name: "${name}"
            email: "${email}"
            message: "${message}"
          }) {
            data{
              id
              attributes{
                name
                email
                message
              }
            }
          }
        }`

      // console.log(query);

      let response = await axios.post(`${baseUrl}/graphql`, { query: query })
      if (response && response !== undefined && response !== null) {
        setContact(response.data.data.createContactList);
        // console.log("Check Data Here", response.data.data.createContactList)
        // console.log(response.data.data);
        // setLoading(false);
        setName('')
        setEmail('')
        setMessage('')
        fetchContact();
        swal({
          title: "Message Sent!",
          text: "Your message was sent successfully, someone would reach out to you soon!",
          icon: "success",
          timer: 2500,
        });
      }
    } catch (error) {
      swal({
        title: "Unsuccessful Message",
        text: error.message,
        icon: "error",
        timer: 2500,
      })
    }
  };


  useEffect(() => {
    fetchContact()
    fetchHeader()
  }, [])


  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>{header.data?.attributes?.get_in_touch ? header.data?.attributes?.get_in_touch : 'Loading'}</h2>
                <p>
                  {header.data?.attributes?.get_in_touch_description ? header.data?.attributes?.get_in_touch_description : 'Loading'}
                </p>
              </div>
              <div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        placeholder='Name'
                        required
                        onChange={e => setName(e.target.value)}
                        value={name}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        placeholder='Email'
                        required
                        onChange={e => setEmail(e.target.value)}
                        value={email}

                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    required
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                <button type='submit' onClick={() => handleSubmit()} className='btn btn-custom btn-lg' disabled={!name || !email || !message}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>{header.data?.attributes?.contact_info ? header.data?.attributes?.contact_info : 'Loading'}</h3>
              <p>
                <span>
                  <i className='fa fa-map-marker'></i> Address
                </span>
                {/* {props.data ? props.data.address : 'loading'} */}
                {header.data?.attributes?.address ? header.data?.attributes?.address : 'Loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                {header.data?.attributes?.phone_number ? header.data?.attributes?.phone_number : 'Loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                {/* {props.data ? props.data.email : 'loading'} */}
                {header.data?.attributes?.contact_email ? header.data?.attributes?.contact_email : 'Loading'}
              </p>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    {/* <a href={props.data ? props.data.facebook : '/'}> */}
                      <i className='fa fa-facebook'></i>
                    {/* </a> */}
                  </li>
                  <li>
                    {/* <a href={props.data ? props.data.twitter : '/'}> */}
                      <i className='fa fa-twitter'></i>
                    {/* </a> */}
                  </li>
                  {/* <li>
                    <a href={props.data ? props.data.youtube : '/'}>
                      <i className='fa fa-youtube'></i>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2022 Digit-Up Tech{' '}
            <a href='http://www.digitup_tech.com' rel='nofollow'>
              Digit-Up Tech
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
