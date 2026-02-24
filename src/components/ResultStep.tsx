import React from 'react';
import { Recipe } from '../types';
import styles from './Step.module.css';

interface ResultStepProps {
  recipe: Recipe;
  onReset: () => void;
}

export const ResultStep: React.FC<ResultStepProps> = ({ recipe, onReset }) => {
  return (
    <div className={styles.card}>
      <h2>Your Quick Recipe</h2>
      {recipe.title && <h3>{recipe.title}</h3>}
      {recipe.time && <p><strong>Time:</strong> {recipe.time}</p>}
      {recipe.difficulty && <p><strong>Difficulty:</strong> {recipe.difficulty}</p>}
      {recipe.ingredients?.length > 0 && (
        <div>
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
      )}
      {recipe.instructions?.length > 0 && (
        <div>
          <h4>Instructions:</h4>
          <ol>
            {recipe.instructions.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      {recipe.notes && <p><strong>Notes:</strong> {recipe.notes}</p>}
      <button onClick={onReset} className={styles.button}>Make Another Meal</button>
    </div>
  );
};
