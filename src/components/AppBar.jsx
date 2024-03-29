import React, {useContext, useEffect, useState} from "react";
import {useLoaderData, Link, NavLink} from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
const pages = ["Home", "New Releases", "Genres", "Albums"];
const settings = ["Profile", "Dashboard", "Logout"];
import {getAllPendingFriendings, getProfiles} from "./Rover";
import {ProfileContext} from "../context/profileContext";
import NavButtons from "./NavButtons";
import {useRouteLoaderData, useFetcher} from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";

function AppBar({onHandleUserChange}) {
  const {state, dispatch} = useContext(ProfileContext);
  const [pendingFriends, setPendingFriends] = useState();

  const {profiles, pendingFriendRequests} = useRouteLoaderData("root");
  const fetcher = useFetcher();
  let userLoggedIn = parseInt(localStorage.getItem("currentUser"));

  let myPendingRequests;
  useEffect(() => {
    userLoggedIn = parseInt(localStorage.getItem("currentUser"));
    myPendingRequests = state.pendingRequests.filter(
      request => request.target === userLoggedIn,
    );
    setPendingFriends(myPendingRequests);
  }, [userLoggedIn]);

  function handleChange(event) {
    if (event.target.value === 0) {
      dispatch({type: "USERLOGOUT", payload: 0});
    } else {
      dispatch({type: "USERLOGIN", payload: event.target.value});
    }
  }

  return (
    <>
      <div className="navbar sticky top-0 z-10 bg-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <NavLink to={`../`}>Home</NavLink>
              </li>
              <li>
                <NavLink to={`../home`}>Categories</NavLink>
              </li>
              <li>
                <NavLink to={`../new`}></NavLink>
              </li>
              <li>
                <NavLink to={`../search`}>Search</NavLink>
              </li>
              {parseInt(localStorage.getItem("currentUser")) !== 0 ? (
                <li>
                  <NavLink to={`../friends`}>Find Friends</NavLink>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>

          <Link to={`../`} className="btn btn-ghost normal-case text-xl">
            <PetsIcon />
            PAWTIFY
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to={`../`}>Home</NavLink>
            </li>
            <li>
              <NavLink to={`../home`}>Categories</NavLink>
            </li>
            <li>
              <NavLink to={`../new`}>New Releases</NavLink>
            </li>
            <li>
              <NavLink to={`../search`}>Search</NavLink>
            </li>
            {parseInt(localStorage.getItem("currentUser")) !== 0 ? (
              <li>
                <NavLink to={`../friends`}>Find Friends</NavLink>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="navbar-end gap-6">
          {state.userLoggedIn !== 0 ? (
            <>
              {pendingFriends && pendingFriends.length > 0 ? (
                <Link to={`../profile/${userLoggedIn}`}>
                  <div className="my-6 indicator">
                    <div className="indicator-item badge bg-primary text-white">
                      {pendingFriends.length}
                    </div>

                    <button className="btn bg-transparent w-16">
                      <PeopleIcon className="text-white" sx={{fontSize: 36}} />
                    </button>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}

              <Link to={`../profile/${state.userLoggedIn}`}>
                <button className="btn btn-accent">My Profile</button>
              </Link>

              <Link to={`../`}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleChange}
                  value="0">
                  Log Out
                </button>
              </Link>
            </>
          ) : (
            <Link to={`../login`}>
              <button type="button" className="btn">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
export default AppBar;
