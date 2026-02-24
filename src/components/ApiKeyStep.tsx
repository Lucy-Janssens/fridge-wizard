import { useState } from 'react';
import styles from './Step.module.css';

interface ApiKeyStepProps {
  onSubmit: (apiKey: string) => void;
}

export function ApiKeyStep({ onSubmit }: ApiKeyStepProps) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>🔑 OpenAI API Key</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className={styles.input}
          />
          <p className={styles.hint}>
            Your key stays in your browser. Never stored on any server.
          </p>
        </div>
        <button type="submit" className={styles.btnPrimary}>
          Let's Cook! 🍳
        </button>
      </form>
    </div>
  );
}
