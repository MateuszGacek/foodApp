import { useContext } from "react";
import Button from "../UI/Button";
import { Meal } from "../type/Meal";
import { currencyFormatter } from "../utils/formatting";
import CartContext from "../../store/CartContext";

type MealItemProps = {
  meal: Meal;
};

const MealItem = ({ meal }: MealItemProps) => {
  const cartCtx = useContext(CartContext);
  const addMealToCart = () => {
    cartCtx.addItem(meal);
  };
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(+meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={addMealToCart}>Add To Cart</Button>
        </p>
      </article>
    </li>
  );
};
export default MealItem;
