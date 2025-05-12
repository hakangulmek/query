import React from "react";
import { useFetchFotosQuery, useAddFotoMutation } from "../store"; // Updated import
import { CircularProgress, Skeleton } from "@mui/material";
import { Button } from "@mui/material";
import FotoListItem from "@/app/component/fotoListItem"; // Updated import

interface foto {
  id: number;
  url: string;
  title: string;
  releaseYear: number;
  genre: string;
}
function FotoList({
  album,
}: {
  album: {
    id: number | string;
    title: string;
    releaseYear: number;
    genre: string;
  };
}) {
  const { data, isLoading, isFetching, error } = useFetchFotosQuery(album);
  const [addFoto, addFotoResult] = useAddFotoMutation();
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
    content = data.map((foto: foto) => {
      return <FotoListItem key={album.id} foto={foto} />;
    });
  }

  const handleAddFoto = () => {
    addFoto(album);
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
          <h2 style={{ fontSize: "20px", marginLeft: "20px" }}>
            {album.title} Fotoları
          </h2>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddFoto}
            disabled={addFotoResult.isLoading}
            style={{
              marginRight: "20px",
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
          >
            {addFotoResult.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Fotograf Ekle+"
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
        <div className="fotoDiv">{content}</div>
      </div>
    </>
  );
}

export default FotoList;
