import React, {useContext, useState} from "react";
import {useLoaderData} from "react-router-dom";
import {ProfileContext} from "../../context/profileContext";

export default function FavoriteAlbumList({album}) {
  const {state, dispatch} = useContext(ProfileContext);
  function handleDeleteAlbumButton() {
    // let favoriteToUpdate;

    let updatedFavorite;
    let userProfile = state.profiles.filter(
      profile => profile.id === parseInt(state.userLoggedIn),
    )[0];
    updatedFavorite = [...userProfile.favoriteAlbums].filter(
      favoriteAlbums => favoriteAlbums != album.id,
    );

    // //regularPATCH
    fetch(`http://localhost:4000/profiles/${userProfile.id}/`, {
      method: "PATCH",
      body: JSON.stringify({
        ...userProfile,
        favoriteAlbums: updatedFavorite,
      }),
      headers: {"content-type": "application/json"},
    })
      .then(resp => resp.json())
      .then(updatedProfile => {
        dispatch({type: "UPDATE", payload: updatedProfile});
      })
      .catch(error => console.log("error", error.message));
  }
  return (
    <>
      <li className="pb-3 sm:pb-4">
        <div className="flex justify-between space-x-2">
          <div className="flex-shrink-0">
            <img
              className="w-16 h-16"
              src={album.images[2].url}
              alt={album.name}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {album.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {album.artists[0].name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
            <button className="btn btn-primary justify-end">
              Add to party
            </button>
            <button
              className="btn justify-end"
              onClick={handleDeleteAlbumButton}>
              Delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
