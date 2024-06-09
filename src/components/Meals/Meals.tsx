import MealItem from "./MealItem";
import useHttp from "../../hooks/useHttp";
import ErrorMessage from "../ErrorMessage";

const requestConfig = {};

const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  if (isLoading) {
    return <p className="center">Loading....</p>;
  }
  if (error) {
    return <ErrorMessage title="Failed to fetch meals" message={error} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
