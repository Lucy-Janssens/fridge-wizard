import styles from './LoadingStep.module.css';
import stepStyles from './Step.module.css';

export function LoadingStep() {
  return (
    <div className={stepStyles.card}>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <h2>Consulting the culinary spirits...</h2>
        <p style={{ color: '#888' }}>
          Analyzing your fridge and crafting the perfect recipe
        </p>
      </div>
    </div>
  );
}
