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
import { css } from '@emotion/react';

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
          updateAttending(props.id);
        }}
      />
      Name: {props.firstName} {props.lastName}
    </li>
  );
}

// function DisabledInput() {
//   return (
//     <div>
//       <label>
//         First Name -d
//         <input />
//       </label>
//       <label>
//         Last Name -d
//         <input />
//       </label>
//     </div>
//   );
// }

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
    getAllGuests();
  }, [guestFirstName, guestLastName, remove, newGuestClicked]);

  const disabled = loading ? true : false;

  // if (allGuestsList.length === 0) {
  //   return <h1>Loading...</h1>;
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  // if (loading) {
  //   return (
  //     <div>
  //       {/* <DisabledInput /> */}
  //       <div>Loading....</div>
  //     </div>
  //   );
  // }
  return (
    <div className="App" css={appStyle}>
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
              disabled={disabled}
            />
          </label>
          <br />
          <button
            css={buttonStyle}
            onClick={() => {
              createUser(guestFirstName, guestLastName);
              setGuestFirstName('');
              setGuestLastName('');
            }}
          >
            Create User
          </button>
        </div>
        {loading === true && <p>Loading...</p>}
        {/* Only displays the guest list when it's not loading */}
        {loading === false && (
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
                  {/* <Delete
                  key={'remove' + e.id + e.firstName + e.lastName}
                  id={e.id}
                /> */}
                  <button
                    css={removeButton}
                    onClick={() => {
                      handleRemove(e.id);
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
