import * as React from "react";
import Modal from "@mui/material/Modal";
import UnstyledInputIntroduction from "./UnstyledInputIntroduction";
import { DataCart, DataDiscount } from "../lib/type";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Typography } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  cart: DataCart[];
  handleCodeDiscount: (e: any) => void;
  discount: DataDiscount | null;
  handleAdd: (value: string) => void;
  handleRemove: (value: string) => void;
};

export default function CartModal({
  open,
  handleClose,
  cart,
  handleCodeDiscount,
  discount,
  handleAdd,
  handleRemove,
}: Props) {
  const sumPrice = cart.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);

  let discountAmount: number = 0;
  if (sumPrice > 0 && discount?.amount) {
    discountAmount = discount?.amount;
  }

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = "/no-image.png";
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="cart-modal">
          <Typography gutterBottom variant="h4" component="div">
            Cart
          </Typography>
          <div>
            {cart.map((ca, index) => {
              return (
                <div className="flex cart-amount between" key={index}>
                  <div className="flex">
                    <img
                      src={ca.photo}
                      alt={ca.title}
                      className="cart-img"
                      onError={handleImageError}
                    />
                    <div className="cart-info">
                      <p>{ca.title}</p>
                      <p>{ca.price} THB/Day</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      variant="contained"
                      onClick={() => handleAdd(ca.title)}
                    >
                      <AddIcon />
                    </Button>
                    <div>
                      <UnstyledInputIntroduction
                        value={ca.amount}
                        aria-label="amount"
                        placeholder=""
                        className="align-last-center"
                      />
                    </div>
                    <Button
                      variant="contained"
                      onClick={() => handleRemove(ca.title)}
                    >
                      <RemoveIcon />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="discount-code">
            <UnstyledInputIntroduction
              aria-label="Discount code"
              placeholder="Discount code"
              onKeyDown={handleCodeDiscount}
            />
          </div>
          <div className="between">
            <p>Total</p>
            <p>{sumPrice} THB</p>
          </div>
          <div className="border-cart between">
            <p>Discount</p>
            <p>{discountAmount} THB</p>
          </div>
          <div className="border-cart between">
            <p>Grand Total</p>
            <p>{sumPrice - discountAmount} THB</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
