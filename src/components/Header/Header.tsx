import { useContext } from "react";

import logoImg from "../../assets/logo.jpg";
import Button from "../UI/Button";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext";

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    if (item.quantity) {
      return totalNumberOfItems + item.quantity;
    }
    return totalNumberOfItems;
  }, 0);

  const handleShowCart = () => {
    userProgressCtx.showCart();
  };

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} />
        <h1>Food app</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart {totalCartItems}
        </Button>
      </nav>
    </header>
  );
};

export default Header;
