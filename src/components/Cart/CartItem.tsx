import { Meal } from "../type/Meal";
import { currencyFormatter } from "../utils/formatting";

type CartItemProp = Meal & {
  onIncrease: () => void;
  onDecrease: () => void;
};

const CartItem = ({
  name,
  quantity,
  price,
  key,
  onIncrease,
  onDecrease,
}: CartItemProp) => {
  return (
    <li className="cart-item" key={key}>
      <p>
        {name} - {quantity} x {currencyFormatter.format(+price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={onIncrease}>+</button>
        <span></span>
        <button onClick={onDecrease}>-</button>
      </p>
    </li>
  );
};

export default CartItem;
