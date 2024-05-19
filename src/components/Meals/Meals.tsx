import { useEffect, useState } from "react";

type Menu = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState<Array<Menu>>([]);

  useEffect(() => {
    const featchMeal: () => Promise<void> = async () => {
      const response: Response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        return;
      }
      const data: Array<Menu> = await response.json();
      setLoadedMeals(data);
    };
    featchMeal();
  }, []);
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
};

export default Meals;
