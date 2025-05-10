import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { FaMusic } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useRemoveAlbumMutation } from "../store"; // API bağlantınızın konumuna göre ayarlayın

function AlbumListItem({
  album,
}: {
  album: {
    id: number | string;
    title: string;
    releaseYear: number;
    genre: string;
  };
}) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleDelete = () => {
    removeAlbum(album);
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardContent sx={{ padding: "16px !important" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <FaMusic
              size={40}
              style={{
                color: "#1976d2",
                marginRight: "8px",
                fontSize: "28px",
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                padding: "8px",
                borderRadius: "50%",
              }}
            />

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                {album.title}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: "primary.light",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                >
                  {album.releaseYear}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: "secondary.light",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                >
                  {album.genre}
                </Typography>
              </Box>
            </Box>
          </Box>

          <IconButton
            size="small"
            onClick={handleDelete}
            disabled={results.isLoading}
            sx={{
              color: "error.main",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.1)",
              },
            }}
          >
            <MdDeleteForever size={24} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AlbumListItem;
