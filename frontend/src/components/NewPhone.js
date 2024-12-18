import { useState } from 'react';

function NewPhone(props) {
    const {contact, phones, setPhones} = props;
    const [phone_number, setPhoneNumber] = useState('');
    const [phone_type, setPhoneType] = useState('mobile');

    async function createPhone(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/contacts/' + contact.id + '/phones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone_type,
                phone_number
            })
        });

        const data = await response.json();

        if (data.id) {
            setPhones([...phones, data]);
        }

        setPhoneNumber('');
        setPhoneType('mobile');
    }

	return (
        <form onSubmit={createPhone} onClick={(e) => e.stopPropagation()} className='new-phone'>
            <input
                type='text'
                placeholder='Phone Number'
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phone_number}
            />
            <select
                value={phone_type}
                onChange={(e) => setPhoneType(e.target.value)}  // Handle phone type change
            >
                <option value="mobile">Mobile</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
            </select>
            <button className='button green' type='submit'>Add Sabrina's Phone</button>
        </form>
    );
}


export default NewPhone;