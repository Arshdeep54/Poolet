import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import ABI from "../abi/BettingDapp.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import TimePicker from "react-time-picker";
import TimeInput from "react-time-picker/dist/TimeInput";
function Events() {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [eventsArray, setEventsArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventInput, setEventInput] = useState({
    eventName: "",
    hostedBy: "",
    uid: null,
    tags: [],
    description: "",
    endOn: new Date(),
    status: "",
  });
  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setEventInput({ ...eventInput, tags: [...eventInput.tags, value] });
    e.target.value = "";
  }
  function removeTag(index) {
    setEventInput({
      ...eventInput,
      tags: eventInput.tags.filter((el, i) => i !== index),
    });
  }
  async function getEvents() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          import.meta.env.VITE_CONTRACT_ADDRESS,
          ABI.abi,
          provider
        );
        //whitelist minting
        const events = await contract.getEvents();
        setEventsArray(events);
      } catch (error) {
        console.log(error);
        toast.error("Connect to  Mainnet!", {
          theme: "dark",
        });
      }
    } else {
      toast.error("Install Metamask!", {
        theme: "dark",
      });
    }
  }
  async function createEvent() {
    if (typeof window.ethereum !== "undefined") {
      setEventInput({
        ...eventInput,
        uid: user.uid,
        hostedBy: user.displayName,
        status: "onGoing",
      });
      console.log(eventInput);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const con = new ethers.Contract(
          import.meta.env.VITE_CONTRACT_ADDRESS,
          ABI.abi,
          signer
        );
        console.log(con);
      
        const createTX = await con.createEvent(
          eventInput.eventName,
          eventInput.uid,
          eventInput.tags,
          eventInput.description,
          eventInput.status,
          eventInput.endOn
        );
        await createTX.wait();
        getEvents();
      } catch (error) {
        console.log(error);
        toast.error("Connect to  Mainnet!", {
          theme: "dark",
        });
      }
    } else {
      toast.error("Install Metamask!", {
        theme: "dark",
      });
    }
  }

  useEffect(() => {
    const getEventsFake = () => {
      setLoading(true);
      const eventsArray = [
        {
          eventName: "IPL",
          hostedBy: "Jay Shah",
          uid: "2zt0bWhT8ofobrG6Oo6MP9kv7aE3",
          tags: ["sports", "cricket"],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque recusandae mollitia? Enim mollitia rerum dolores maiores consectetur eius, laudantium modi, in itaque sit nostrum ipsa voluptas nobis reiciendis qui!Aliquam repudiandae ut ratione iste itaque quaerat similique dolorum animi aut tempora ullam nesciunt laudantium consequuntur sequi, dolores in, quo quidem aspernatur, nemo harum explicabo facere quam velit? Saepe, suscipit.Nesciunt ratione pariatur sequi, at architecto ullam non recusandae facere ab consequuntur, nostrum animi. Ut, minima magnam? Suscipit, eligendi. Quasi perferendis voluptates soluta aliquam ipsa error vitae at laboriosam animi.",
          status: "onGoing",
          ends: "2024-06-24",
          matches: [
            {
              outcomeA: { text: "RCB", id: 1 },
              outcomeB: { text: "CSK", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "PBKS", id: 1 },
              outcomeB: { text: "MI", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "DC", id: 1 },
              outcomeB: { text: "KKR", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "SRH", id: 1 },
              outcomeB: { text: "RR", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
          ],
        },
        {
          eventName: "IPL",
          hostedBy: "Jay Shah",
          tags: ["sports", "cricket"],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque recusandae mollitia? Enim mollitia rerum dolores maiores consectetur eius, laudantium modi, in itaque sit nostrum ipsa voluptas nobis reiciendis qui!Aliquam repudiandae ut ratione iste itaque quaerat similique dolorum animi aut tempora ullam nesciunt laudantium consequuntur sequi, dolores in, quo quidem aspernatur, nemo harum explicabo facere quam velit? Saepe, suscipit.Nesciunt ratione pariatur sequi, at architecto ullam non recusandae facere ab consequuntur, nostrum animi. Ut, minima magnam? Suscipit, eligendi. Quasi perferendis voluptates soluta aliquam ipsa error vitae at laboriosam animi.",
          status: "onGoing",
          ends: "2024-06-24",
          matches: [
            {
              outcomeA: { text: "RCB", id: 1 },
              outcomeB: { text: "CSK", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "PBKS", id: 1 },
              outcomeB: { text: "MI", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "DC", id: 1 },
              outcomeB: { text: "KKR", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "SRH", id: 1 },
              outcomeB: { text: "RR", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
          ],
        },
        {
          eventName: "IPL",
          hostedBy: "Jay Shah",
          tags: ["sports", "cricket"],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque recusandae mollitia? Enim mollitia rerum dolores maiores consectetur eius, laudantium modi, in itaque sit nostrum ipsa voluptas nobis reiciendis qui!Aliquam repudiandae ut ratione iste itaque quaerat similique dolorum animi aut tempora ullam nesciunt laudantium consequuntur sequi, dolores in, quo quidem aspernatur, nemo harum explicabo facere quam velit? Saepe, suscipit.Nesciunt ratione pariatur sequi, at architecto ullam non recusandae facere ab consequuntur, nostrum animi. Ut, minima magnam? Suscipit, eligendi. Quasi perferendis voluptates soluta aliquam ipsa error vitae at laboriosam animi.",
          status: "onGoing",
          ends: "2024-06-24",
          matches: [
            {
              outcomeA: { text: "RCB", id: 1 },
              outcomeB: { text: "CSK", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "PBKS", id: 1 },
              outcomeB: { text: "MI", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "DC", id: 1 },
              outcomeB: { text: "KKR", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "SRH", id: 1 },
              outcomeB: { text: "RR", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
          ],
        },
        {
          eventName: "IPL",
          hostedBy: "Jay Shah",
          uid: "2zt0bWhT8ofobrG6Oo6MP9kv7aE3",
          tags: ["sports", "cricket"],
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi itaque recusandae mollitia? Enim mollitia rerum dolores maiores consectetur eius, laudantium modi, in itaque sit nostrum ipsa voluptas nobis reiciendis qui!Aliquam repudiandae ut ratione iste itaque quaerat similique dolorum animi aut tempora ullam nesciunt laudantium consequuntur sequi, dolores in, quo quidem aspernatur, nemo harum explicabo facere quam velit? Saepe, suscipit.Nesciunt ratione pariatur sequi, at architecto ullam non recusandae facere ab consequuntur, nostrum animi. Ut, minima magnam? Suscipit, eligendi. Quasi perferendis voluptates soluta aliquam ipsa error vitae at laboriosam animi.",
          status: "onGoing",
          ends: "2024-06-24",
          matches: [
            {
              outcomeA: { text: "RCB", id: 1 },
              outcomeB: { text: "CSK", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "PBKS", id: 1 },
              outcomeB: { text: "MI", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "DC", id: 1 },
              outcomeB: { text: "KKR", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
            {
              outcomeA: { text: "SRH", id: 1 },
              outcomeB: { text: "RR", id: 2 },
              status: "onGoing",
              resultAnnounced: false,
              winnerID: null,
            },
          ],
        },
      ];
      setEvents([...eventsArray]);
    };
    getEventsFake();
    getEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      setLoading(false);
    }
    console.log(events);
  }, [events]);

  useEffect(() => {
    console.log(eventsArray);
  }, [eventsArray]);

  return (
    <>
      <NavBar />
      <section className="eventSection my-5 mx-12">
        <div className="mx-5 flex justify-between items-center flex-row">
          <div className="text-6xl card-title m-4">Events</div>
          <div className="flex item-center flex-row">
            <div className="mx-2">
              <button
                className="btn"
                onClick={() => {
                  if (user) {
                    createEvent();
                    document.getElementById("createEventModal").showModal();
                  } else {
                    document.getElementById("NotLoggedIn").showModal();
                  }
                }}
              >
                + Add Event
              </button>
              <dialog id="createEventModal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Add New Event </h3>
                  <form>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        className="input outline-none focus:outline-none mx-3"
                        value={eventInput.eventName}
                        onChange={(e) =>
                          setEventInput({
                            ...eventInput,
                            eventName: e.target.value,
                          })
                        }
                        placeholder="Enter the Event name"
                      ></input>
                    </div>
                    <div>
                      <label>Event Ending on </label>
                      <input
                        type="datetime-local"
                        className="input outline-none focus:outline-none mx-3"
                        value={eventInput.endOn}
                        onChange={(e) =>
                          setEventInput({
                            ...eventInput,
                            endOn: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                    <div>
                      <label>Enter tags</label>

                      <div className="border-solid rounder-bl border-white p-2 w-max mt-1 flex align-center flex-wrap gap-3">
                        {eventInput.tags.map((tag, index) => (
                          <div className="bg-primary inline-block p-2 h-max rounded-2xl">
                            <span className="text mx-1">{tag}</span>
                            <span
                              className="close cursor-pointer"
                              onClick={() => removeTag(index)}
                            >
                              &times;
                            </span>
                          </div>
                        ))}
                        <input
                          type="text"
                          className="input focus:outline-none "
                          placeholder="Enter a tag"
                          onKeyDown={handleKeyDown}
                          disabled={eventInput.tags.length > 2}
                        />
                      </div>
                    </div>
                    <div>
                      <label>Description</label>

                      <textarea
                        className=" w-full resize-none border-solid p-3 outline-none"
                        value={eventInput.description}
                        onChange={(e) => {
                          setEventInput({
                            ...eventInput,
                            description: e.target.value,
                          });
                        }}
                        placeholder="Type the description o fthe event"
                      />
                    </div>
                  </form>

                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn" onClick={createEvent}>
                        Create
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
              <dialog id="NotLoggedIn" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">Sorry ! </h3>
                  <div className="hero">
                    <div className="hero-content text-center">
                      <div className="max-w-md">
                        <h2 className="text-4xl font-bold">
                          You are not logged in!
                        </h2>
                        <p className="py-6">Start your betting journey</p>
                        <form method="dialog">
                          <NavLink to={"/auth/login"}>
                            <button className="btn btn-primary">Login</button>
                          </NavLink>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>

            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>
        <div className="divider divider-default"></div>
        <div className="p-2 mx-5 my-3 grid grid-cols-2 gap-5 ">
          {loading ? (
            <LoadingSpinner />
          ) : (
            events.map((event, index) => {
              return (
                <Card
                  id={index}
                  name={event.eventName}
                  uid={event.uid}
                  hostedBy={event.hostedBy}
                  description={event.description}
                  status={event.status}
                  tags={event.tags}
                  matches={event.matches}
                />
              );
            })
          )}
        </div>
      </section>
    </>
  );
}

export default Events;
