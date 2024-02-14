import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FamousSection.css';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);
  let [newFamousPerson, setNewFamousPerson] = useState('');
  let [newRole, setNewRole] = useState('');

  // TODO: on load, call the fetchPeople() function

  const fetchPeople = () => { // TODO: fetch the list of people from the server
    axios({
      method: 'GET',
      url: '/api/people'
    })
    .then(response => {
      console.log('Data array in reponse from server.', response.data);
      famousPeopleArray=response.data;
      setPeopleArray(famousPeopleArray);
    })
    .catch(err => {
      console.log('GET error from server.', err);
    })
  }

  useEffect(
    fetchPeople, []
  );


  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${newFamousPerson} and they're famous for ${newRole}`);
    
    // TODO: create POST request to add this new person to the database
    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
    axios ({
      method: 'POST',
      url: '/api/people',
      data: {name: newFamousPerson, role: newRole}
    })
    .then(response => {
      console.log('POST response from server:', response);
      setNewFamousPerson('');
      setNewRole('');
      fetchPeople();
    })
    .catch(err => {
      console.log('POST error from the server.', err);
    })
  
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" value={newFamousPerson} onChange={e => setNewFamousPerson(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" value={newRole} onChange={e => setNewRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {famousPeopleArray.map(person => (
            <li key={person.id}>{person.name} is famous for playing a role in {person.role}.</li> 
          ))}
        </ul>
      </section>
    );
}

export default FamousSection;
