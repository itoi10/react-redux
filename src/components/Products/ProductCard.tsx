import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

interface Props {
  images: any;
  name: string;
  price: number;
}

const useStyles = makeStyles((theme) => {});

const ProductCard: React.FC<Props> = (props) => {
  const price = props.price.toLocaleString();

  console.log(props.images[0].path);

  return (
    <Card>
      <CardMedia component="img" image={props.images[0].path} />
      <CardContent>
        <Typography color="textSecondary" component="p">
          {props.name}
        </Typography>
        <Typography component="p">¥{price}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
