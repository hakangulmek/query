// AlbumList.tsx
import React from "react";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store"; // Updated import
import { CircularProgress, Skeleton } from "@mui/material";
import { Button } from "@mui/material";
import AlbumListItem from "./albumListItem";

interface Album {
  id: number;
  title: string;
  releaseYear: number;
  genre: string;
}

interface User {
  id: number;
  name: string;
}

function AlbumList({ user }: { user: User }) {
  const { data, isLoading, isFetching, error } = useFetchAlbumsQuery(user);
  const [addAlbum, addAlbumResult] = useAddAlbumMutation(); // Updated hook name

  console.log("Query Status:", { isLoading, isFetching, error });
  console.log("Data:", data);

  let content;

  if (isLoading) {
    // When initially loading
    content = (
      <Skeleton variant="rectangular" sx={{ width: "100%", height: "200px" }} />
    );
  } else if (error) {
    // When there's an error
    content = <div>Bir hata oluştu: {error.toString()}</div>;
  } else if (!data || data.length === 0) {
    // When there's no data
    content = <div>Hiç albüm bulunamadı</div>;
  } else {
    // When we have data
    content = data.map((album: Album) => {
      return <AlbumListItem key={album.id} album={album} />;
    });
  }

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "20px", marginLeft: "20px" }}>{user.name}</h2>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddAlbum}
            disabled={addAlbumResult.isLoading}
            style={{
              marginRight: "20px",
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
          >
            {addAlbumResult.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Album Ekle+"
            )}
          </Button>
        </div>
      </div>
      <div style={{ padding: "0px 20px 15px" }}>
        {isFetching && !isLoading ? (
          <div style={{ textAlign: "center", padding: "10px" }}>
            <CircularProgress size={20} /> Güncelleniyor...
          </div>
        ) : null}
        {content}
      </div>
    </>
  );
}

export default AlbumList;
