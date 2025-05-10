import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Collapse,
} from "@mui/material";
import { FaMusic } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store"; // API bağlantısı
import Fotolist from "./fotoList"; // Fotoğrafları listeleme bileşeni

interface Album {
  id: string;
  title: string;
  releaseYear: number;
  genre: string;
}

function AlbumListItem({ album }: { album: Album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const [expanded, setExpanded] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Tıklamanın üst elemanlara yayılmasını engelliyoruz
    removeAlbum(album);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
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
      <CardContent
        sx={{
          padding: "16px !important",
          cursor: "pointer",
          "&:last-child": { paddingBottom: "16px" },
        }}
        onClick={toggleExpand}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Box
              sx={{
                color: "#1976d2",
                mr: 1.5,
                backgroundColor: "rgba(25, 118, 210, 0.1)",
                padding: "8px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaMusic size={24} />
            </Box>

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

          {/* Sağ taraftaki butonlar bölümü */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Silme butonu */}
            <IconButton
              size="small"
              onClick={handleDelete}
              disabled={results.isLoading}
              sx={{
                color: "error.main",
                "&:hover": {
                  backgroundColor: "rgba(211, 47, 47, 0.1)",
                },
                mr: 1, // Sağa margin ekleyerek ikonlar arasında boşluk oluşturuyoruz
              }}
            >
              <MdDeleteForever size={22} />
            </IconButton>

            {/* Açma/Kapama butonu */}
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              size="small"
            >
              {expanded ? <GoChevronLeft /> : <GoChevronRight />}
            </IconButton>
          </Box>
        </Box>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Fotolist album={album} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default AlbumListItem;
