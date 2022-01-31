import './App.css';
import {
  inputFieldStyle,
  buttonStyle,
  listStyle,
  guestStyle,
  appStyle,
  inputGridStyle,
  guestListStyle,
  removeButton,
} from './Style';
import { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';

const baseUrl = 'http://localhost:4000';

// Displays list
function GuestList({ children }) {
  return <ul>{children}</ul>;
}

// List item of each guest
function Guest(props) {
  const [toggleAttending, setToggleAttending] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  async function updateAttending(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !toggleAttending }),
    });
    const updatedGuest = await response.json();
    console.log(updatedGuest);
    setToggleAttending(!toggleAttending);
  }

  return (
    <li key={props.firstName} css={listStyle}>
      <input
        aria-label="attending"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.currentTarget.checked);
          updateAttending(props.id).catch((error) => {
            console.error('Error:', error);
          });
        }}
      />
      Name: {props.firstName} {props.lastName}
    </li>
  );
}

function App() {
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [allGuestsList, setAllGuestsList] = useState([]);
  const [newGuestClicked, setNewGuestClicked] = useState(false);
  const [remove, setRemove] = useState(false);
  const [loading, setLoading] = useState(true);

  // Add user
  async function createUser(input1, input2) {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: input1,
        lastName: input2,
      }),
    });
    const createdGuest = await response.json();
    console.log(createdGuest);
    setNewGuestClicked(!newGuestClicked);
  }

  // Get all guests

  async function handleRemove(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    console.log(deletedGuest);
    setRemove(!remove);
  }

  useEffect(() => {
    async function getAllGuests() {
      const response = await fetch(`${baseUrl}/guests`);
      const allGuests = await response.json();
      console.log(allGuests);
      setAllGuestsList(allGuests);
      setLoading(false);
    }
    getAllGuests().catch((error) => {
      console.error('Error:', error);
    });
  }, [guestFirstName, guestLastName, remove, newGuestClicked]);

  const disabled = loading ? true : false;

  // creates User when enter in input
  // useEffect(() => {
  //   createUser(guestFirstName, guestLastName).catch((error) =>
  //     console.error(error),
  //   );
  // }, [guestLastName]);

  // handle Enter on Lastname
  // function handleChange(event) {
  //   if (event.key === 'Enter') {
  //     console.log('It worked!');
  //     // setGuestLastName(event.currentTarget.value);
  //   }
  // }

  return (
    <div className="App" css={appStyle}>
      <h1> Awesome party guest list </h1>
      <div data-test-id="guest">
        <div css={inputGridStyle}>
          <label>
            First Name
            <input
              css={inputFieldStyle}
              value={guestFirstName}
              onChange={(event) => {
                setGuestFirstName(event.currentTarget.value);
              }}
              disabled={disabled}
            />
          </label>
          <br />
          <label>
            Last Name
            <input
              css={inputFieldStyle}
              value={guestLastName}
              onChange={(event) => {
                setGuestLastName(event.currentTarget.value);
              }}
              onKeyPress={
                (event) => {
                  if (event.key === 'Enter') {
                    console.log('It worked!');
                    createUser(guestFirstName, guestLastName).catch((error) => {
                      console.error('Error:', error);
                    });
                    // setGuestLastName(event.currentTarget.value);
                  }
                }
                // e.key === 'Enter' && setGuestLastName(event.currentTarget.value);
              }
              disabled={disabled}
            />
          </label>
          <br />
          <button
            css={buttonStyle}
            onClick={() => {
              createUser(guestFirstName, guestLastName).catch((error) => {
                console.error('Error:', error);
              });
              setGuestFirstName('');
              setGuestLastName('');
            }}
          >
            Create User
          </button>
        </div>
        {/* Displays loading message while guest list is loading*/}
        {loading === true ? (
          <p>Loading...</p>
        ) : (
          <GuestList css={guestListStyle}>
            {allGuestsList.map((e) => {
              return (
                <div css={guestStyle} key={e.id + e.firstName}>
                  <Guest
                    key={e.id + e.firstName + e.lastName}
                    firstName={e.firstName}
                    lastName={e.lastName}
                    attending={e.attending.toString()}
                    id={e.id}
                  />
                  <button
                    css={removeButton}
                    onClick={() => {
                      handleRemove(e.id).catch((error) => {
                        console.error('Error:', error);
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </GuestList>
        )}
      </div>
    </div>
  );
}

export default App;
