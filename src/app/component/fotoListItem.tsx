import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

interface foto {
  id: number;
  url: string;
  title: string;
  releaseYear: number;
  genre: string;
}

function FotoListItem({ foto }: { foto: foto }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="300"
        image={foto.url}
        alt={foto.title}
      />
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
