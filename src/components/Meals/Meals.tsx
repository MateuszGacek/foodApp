import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import { Meal } from "../type/Meal";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState<Array<Meal>>([]);

  useEffect(() => {
    const featchMeal: () => Promise<void> = async () => {
      const response: Response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        return;
      }
      const data: Array<Meal> = await response.json();
      setLoadedMeals(data);
    };
    featchMeal();
  }, []);
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
