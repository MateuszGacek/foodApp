import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../../store/UserProgressContext";
import CartItem from "./CartItem";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity! * +item.price,
    0
  );

  const closeCart = () => {
    userProgressCtx.hideCart();
  };

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={closeCart} textOnly>
          Close
        </Button>
        <Button>Go to Checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
