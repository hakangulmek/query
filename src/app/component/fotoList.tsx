import React from "react";

function fotoList({
  album,
}: {
  album: {
    id: number | string;
    title: string;
    releaseYear: number;
    genre: string;
  };
}) {
  return <div>{album.releaseYear}</div>;
}

export default fotoList;
