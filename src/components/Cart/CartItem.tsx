import Button from "../UI/Button";
import { Meal } from "../type/Meal";
import { currencyFormatter } from "../utils/formatting";

const CartItem = ({ name, quantity, price }: Meal) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(+price)}
      </p>
      <p className="cart-item-actions">
        <Button>+</Button>
        <span></span>
        <Button>-</Button>
      </p>
    </li>
  );
};

export default CartItem;
