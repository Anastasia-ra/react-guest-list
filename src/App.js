import './App.css';
import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:4000';

// Displays list
function GuestList({ children }) {
  return <ul>{children}</ul>;
}

// List item of each guest
function Guest(props) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <li key={props.firstName}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => e.currentTarget.checked}
      />
      Name: {props.firstName} {props.lastName}
    </li>
  );
}

// Button + function to remove guest
// function Delete({ id }) {
//   const [removeIsClicked, setRemoveIsClicked] = useState(false);
//   async function handleRemove() {
//     const response = await fetch(`${baseUrl}/guests/${id}`, {
//       method: 'DELETE',
//     });
//     const deletedGuest = await response.json();
//     console.log(deletedGuest);
//   }

//   return (
//     <button
//       onClick={() => {
//         handleRemove();
//         setRemoveIsClicked(!removeIsClicked);
//       }}
//     >
//       Remove
//     </button>
//   );
// }

function App() {
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  // const [guestList, setGuestList] = useState([]);
  const [allGuestsList, setAllGuestsList] = useState([]);
  const [newGuestClicked, setNewGuestClicked] = useState(false);
  // const [removeIsClicked, setRemoveIsClicked] = useState(false);
  const [remove, setRemove] = useState(false);

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
    // setGuestList((prev) => [...prev, createdGuest]);
    setNewGuestClicked(!newGuestClicked);
  }
  // useEffect(() => {
  //   async function myFetch() {
  //     await createUser();
  //   }
  //   myFetch().catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

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
    }
    getAllGuests();
  }, [guestFirstName, guestLastName, remove, newGuestClicked]);

  return (
    <div className="App">
      <div data-test-id="guest">
        <label>
          First Name
          <input
            value={guestFirstName}
            onChange={(event) => {
              setGuestFirstName(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          Last Name
          <input
            value={guestLastName}
            onChange={(event) => {
              setGuestLastName(event.currentTarget.value);
            }}
          />
        </label>
        <button
          onClick={() => {
            createUser(guestFirstName, guestLastName);
            setGuestFirstName('');
            setGuestLastName('');
          }}
        >
          Create User
        </button>
        <GuestList>
          {allGuestsList.map((e) => {
            return (
              <div key={e.id + e.firstName}>
                <Guest
                  key={e.id + e.firstName + e.lastName}
                  firstName={e.firstName}
                  lastName={e.lastName}
                  attending={e.attending.toString()}
                />
                {/* <Delete
                  key={'remove' + e.id + e.firstName + e.lastName}
                  id={e.id}
                /> */}
                <button
                  onClick={() => {
                    handleRemove(e.id);
                    // setRemoveIsClicked(!removeIsClicked);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </GuestList>
      </div>
    </div>
  );
}

export default App;
