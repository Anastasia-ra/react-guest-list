import './App.css';
import {
  inputFieldStyle,
  buttonStyle,
  listStyle,
  guestStyle,
  appStyle,
  inputStyle,
  guestListStyle,
  removeButton,
  flexDisplay,
} from './Style';
import { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';

const baseUrl = 'https://r-guestlist.herokuapp.com';

// Displays list
function GuestList({ children }) {
  return <ul>{children}</ul>;
}

// List item of each guest
function Guest(props) {
  const [attending, setAttending] = useState(props.attending);
  // const [isChecked, setIsChecked] = useState(attending);

  async function updateAttending(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !attending }),
    });
    const updatedGuest = await response.json();
    console.log(updatedGuest);
    setAttending(!attending);
  }

  return (
    <li key={props.firstName} css={listStyle} data-test-id="guest">
      <input
        aria-label="attending"
        type="checkbox"
        checked={attending}
        onChange={() => {
          // setIsChecked(e.currentTarget.checked);
          // setIsChecked(attending);
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
  const [guestsList, setGuestsList] = useState([]);
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
    setGuestFirstName('');
    setGuestLastName('');
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
      setGuestsList(allGuests);
      setLoading(false);
    }
    getAllGuests().catch((error) => {
      console.error('Error:', error);
    });
  }, [guestLastName, remove]);

  const disabled = loading ? true : false;

  return (
    <div className="App" css={appStyle}>
      <h1> Party guest list </h1>
      <div css={flexDisplay}>
        <div css={inputStyle}>
          <label>
            First name
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
            Last name
            <input
              css={inputFieldStyle}
              value={guestLastName}
              onChange={(event) => {
                setGuestLastName(event.currentTarget.value);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  createUser(guestFirstName, guestLastName).catch((error) => {
                    console.error('Error:', error);
                  });
                }
              }}
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
            }}
          >
            Create User
          </button>
        </div>
        {/* Displays loading message while guest list is loading*/}
        <div css={guestListStyle}>
          {loading === true ? (
            <p>Loading...</p>
          ) : (
            <GuestList>
              {guestsList.map((e) => {
                return (
                  <div css={guestStyle} key={e.id + e.firstName}>
                    <Guest
                      key={e.id + e.firstName + e.lastName}
                      firstName={e.firstName}
                      lastName={e.lastName}
                      attending={e.attending}
                      // attending={e.attending.toString()}
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
    </div>
  );
}

export default App;
