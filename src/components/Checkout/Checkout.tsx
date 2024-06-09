import { FormEvent, useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "../UI/Input";
import Button from "../UI/Button";
import UserProgressContext from "../../store/UserProgressContext";

const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity! * +item.price,
    0
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);
    const customerData = Object.fromEntries(fd.entries());

    fetch("https://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-type": "aplication/json" },
      body: JSON.stringify({
        order: { items: cartCtx.items, customers: customerData },
      }),
    });
  };

  const closeCheckout = () => {
    userProgressCtx.hideCheckout();
  };
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={closeCheckout}
    >
      <form onSubmit={onSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={closeCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
