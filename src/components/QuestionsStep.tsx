import { useState } from 'react';
import { FormData } from '../types';
import styles from './QuestionsStep.module.css';
import stepStyles from './Step.module.css';

interface QuestionsStepProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  error: string | null;
}

export function QuestionsStep({ onSubmit, onBack, error }: QuestionsStepProps) {
  const [formData, setFormData] = useState<FormData>({
    hasEggs: 'unknown',
    hasStarch: 'unknown',
    dietary: 'none',
    timeLimit: '20',
    extras: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={stepStyles.card}>
      <h2 className={stepStyles.heading}>🥘 Quick Questions</h2>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.question}>
          <label className={styles.label}>Do you have eggs?</label>
          <select
            value={formData.hasEggs}
            onChange={(e) => handleChange('hasEggs', e.target.value)}
            className={styles.select}
          >
            <option value="unknown">Not sure / Not in photo</option>
            <option value="yes">Yes! 🥚</option>
            <option value="no">Nope</option>
          </select>
        </div>

        <div className={styles.question}>
          <label className={styles.label}>Do you have pasta or rice?</label>
          <select
            value={formData.hasStarch}
            onChange={(e) => handleChange('hasStarch', e.target.value)}
            className={styles.select}
          >
            <option value="unknown">Not sure / Not in photo</option>
            <option value="pasta">Pasta 🍝</option>
            <option value="rice">Rice 🍚</option>
            <option value="both">Both!</option>
            <option value="neither">Neither</option>
          </select>
        </div>

        <div className={styles.question}>
          <label className={styles.label}>Any dietary restrictions?</label>
          <select
            value={formData.dietary}
            onChange={(e) => handleChange('dietary', e.target.value)}
            className={styles.select}
          >
            <option value="none">None</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten-free</option>
            <option value="dairy-free">Dairy-free</option>
          </select>
        </div>

        <div className={styles.question}>
          <label className={styles.label}>How much time do you have?</label>
          <select
            value={formData.timeLimit}
            onChange={(e) => handleChange('timeLimit', e.target.value)}
            className={styles.select}
          >
            <option value="15">15 min ⚡</option>
            <option value="20">20 min</option>
            <option value="30">30 min</option>
            <option value="45">45 min</option>
          </select>
        </div>

        <div className={styles.question}>
          <label className={styles.label}>Anything else to mention?</label>
          <input
            type="text"
            value={formData.extras}
            onChange={(e) => handleChange('extras', e.target.value)}
            placeholder="e.g., 'hungry for comfort food', 'spicy please!'"
            className={stepStyles.input}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={stepStyles.btnPrimary}>
          ✨ Generate Recipe
        </button>
        
        <button type="button" className={stepStyles.btnSecondary} onClick={onBack}>
          ← Back
        </button>
      </form>
    </div>
  );
}
