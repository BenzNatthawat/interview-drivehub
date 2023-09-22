import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataCart, DataSourceCar } from "../lib/type";

type Props = {
  item: DataSourceCar;
  handleAddCart: (data: DataCart) => void;
};

const handleImageError = (e: any) => {
  e.target.onerror = null;
  e.target.src = "/no-image.png";
};

export default function MediaCard({ item, handleAddCart }: Props): JSX.Element {
  return (
    <Card className="card-car">
      <CardMedia
        component="img"
        sx={{ height: 185 }}
        image={item?.fields?.photo || "/no-image.jpg"}
        title="green iguana"
        onError={handleImageError}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item?.fields?.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {item?.fields?.price} THB/Day
        </Typography>
      </CardContent>
      <CardActions className="justify-center">
        <Button
          onClick={() =>
            handleAddCart({
              title: item?.fields?.title,
              photo: item?.fields?.photo,
              price: item?.fields?.price,
              amount: 1,
            })
          }
          variant="contained"
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
