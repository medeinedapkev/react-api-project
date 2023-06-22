import { useEffect, useState } from 'react';
import Container from '../Container/Container';

const UserForm = ({ onUsertFormSubmit, initialData }) => {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ city, setCity ] = useState('');
    const [ street, setStreet ] = useState('');
    const [ suite, setSuite ] = useState('');
    const [ zipcode, setZipcode ] = useState('');
    const [ work, setWork ] = useState('');
    const [ website, setWebsite ] = useState('');

    const nameHandler = (event) => setName(event.target.value);
    const usernameHandler = (event) => setUsername(event.target.value);
    const phoneHandler = (event) => setPhone(event.target.value);
    const emailHandler = (event) => setEmail(event.target.value);
    const cityHandler = (event) => setCity(event.target.value);
    const streetHandler = (event) => setStreet(event.target.value);
    const suiteHandler = (event) => setSuite(event.target.value);
    const zipcodeHandler = (event) => setZipcode(event.target.value);
    const workHandler = (event) => setWork(event.target.value);
    const websiteHandler = (event) => setWebsite(event.target.value);

    useEffect(() => {
        if (initialData) {
            const { name, username, phone, email, website } = initialData;
            const { city, suite, street, zipcode } = initialData.address;
            setName(name);
            setUsername(username);
            setPhone(phone);
            setEmail(email);
            setCity(city);
            setStreet(street);
            setSuite(suite);
            setZipcode(zipcode);
            setWork(initialData.company.name);
            setWebsite(website);
        }
    }, [initialData])

    function submitFormHandler(event) {
        event.preventDefault();
        let newUser = {};

        if (initialData) {
            newUser = {...initialData, name, username, phone, email, website, 
                address: {...initialData.address, city, street, suite, zipcode}, 
                company: {...initialData.company, name: work}}
        } else {
            newUser = {
                name, 
                username,
                phone,
                email,
                address: {
                   city, 
                   street, 
                   suite, 
                   zipcode,
                   geo: {lat: '-37.3159', lng: '81.1496'}
                },
                company: {
                    name: work,
                    bs: "harness real-time e-markets",
                    catchPhrase: "Multi-layered client-server neural-net",
                },
                website,
            }
        }

        onUsertFormSubmit(newUser);
    }

  return (
    <Container>
        <form onSubmit={submitFormHandler}>
            <div className='form-control'>
                <label htmlFor='name'>Name: </label>
                <input type='text' name='name' id='name' placeholder="Name" value={name} onChange={nameHandler} />
            </div>
            <div className='form-control'>
                <label htmlFor='uername'>Username: </label>
                <input type='text' name='uername' id='uername' placeholder="Username" value={username} onChange={usernameHandler} />
            </div>
            <div className='form-control'>
                <label htmlFor='phone'>Phone: </label>
                <input type='tel' name='phone' id='phone' placeholder="Phone" value={phone} onChange={phoneHandler} />
            </div>
            <div className='form-control'>
                <label htmlFor='email'>Email: </label>
                <input type='email' name='email' id='email' placeholder="Email" value={email} onChange={emailHandler} />
            </div>

            <fieldset className='form-control'>
                <legend>Address:</legend>

                <label htmlFor='city'>City: </label>
                <input type='text' name='city' id='city' placeholder="City" value={city} onChange={cityHandler} />

                <label htmlFor='street'>Street: </label>
                <input type='text' name='street' id='street' placeholder="Street" value={street} onChange={streetHandler} />

                <label htmlFor='suite'>Suite: </label>
                <input type='text' name='suite' id='suite' placeholder="Suite" value={suite} onChange={suiteHandler} />

                <label htmlFor='zipcode'>Zipcode: </label>
                <input type='tex' name='zipcode' id='zipcode' placeholder="Zipcode" value={zipcode} onChange={zipcodeHandler} />
            </fieldset>

            <div className='form-control'>
                <label htmlFor='work'>Work place: </label>
                <input type='text' name='work' id='work' placeholder="Work place" value={work} onChange={workHandler} />
            </div>
            <div className='form-control'>
                <label htmlFor='work-website'>Work website: </label>
                <input type='text' name='work-website' id='work-website' placeholder="Work website" value={website} onChange={websiteHandler} />
            </div>

            <button type='submit'>{initialData ? 'Edit user' : 'Create user'}</button>
        </form>
    </Container>
  )
}

export default UserForm;