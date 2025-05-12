import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { useDeleteFotoMutation } from "../store";

interface foto {
  id: number;
  url: string;
  title: string;
  releaseYear: number;
  genre: string;
}

function FotoListItem({ foto }: { foto: foto }) {
  const [deleteFoto, results] = useDeleteFotoMutation();

  const handleDelete = () => {
    deleteFoto(foto);
  };

  return (
    <Card sx={{ m: 2, width: 300, position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="300"
          image={foto.url}
          alt={foto.title}
        />
        <IconButton
          onClick={handleDelete}
          aria-label="delete"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          {results.isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <MdDeleteForever />
          )}
        </IconButton>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {foto.title}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Çıkış Yılı: {foto.releaseYear}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Tür: {foto.genre}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default FotoListItem;
