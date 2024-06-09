import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "../UI/Button";
import UserProgressContext from "../../store/UserProgressContext";
import CartItem from "./CartItem";
import { Meal } from "../type/Meal";

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
  const onIncrease = (item: Meal) => {
    cartCtx.addItem(item);
  };
  const onDecrease = (id: string) => {
    cartCtx.removeItem(id);
  };

  const goToCheckout = () => {
    userProgressCtx.showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? closeCart : () => {}}
    >
      <h2>Your cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              onIncrease={() => onIncrease(item)}
              onDecrease={() => onDecrease(item.id)}
              key={item.id}
              {...item}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={closeCart} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={goToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
