import { useState, useCallback } from 'react';
import { Step, Recipe, FormData } from './types';
import { generateRecipe } from './api';
import { ApiKeyStep } from './components/ApiKeyStep';
import { PhotoStep } from './components/PhotoStep';
import { QuestionsStep } from './components/QuestionsStep';
import { LoadingStep } from './components/LoadingStep';
import { ResultStep } from './components/ResultStep';
import { Header } from './components/Header';
import styles from './App.module.css';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('api-key');
  const [apiKey, setApiKey] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  const goToStep = useCallback((step: Step) => {
    setCurrentStep(step);
    setError(null);
  }, []);

  const handleApiKeySubmit = useCallback((key: string) => {
    setApiKey(key);
    goToStep('photo');
  }, [goToStep]);

  const handlePhotoSubmit = useCallback((image: string) => {
    setUploadedImage(image);
    goToStep('questions');
  }, [goToStep]);

  const handleQuestionsSubmit = useCallback(async (formData: FormData) => {
    if (!uploadedImage || !apiKey) return;
    
    goToStep('loading');
    
    try {
      const result = await generateRecipe(apiKey, uploadedImage, formData);
      setRecipe(result);
      goToStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      goToStep('questions');
    }
  }, [apiKey, uploadedImage, goToStep]);

  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setRecipe(null);
    setError(null);
    goToStep('photo');
  }, [goToStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 'api-key':
        return <ApiKeyStep onSubmit={handleApiKeySubmit} />;
      case 'photo':
        return <PhotoStep onSubmit={handlePhotoSubmit} />;
      case 'questions':
        return (
          <QuestionsStep 
            onSubmit={handleQuestionsSubmit} 
            onBack={() => goToStep('photo')}
            error={error}
          />
        );
      case 'loading':
        return <LoadingStep />;
      case 'result':
        return recipe && <ResultStep recipe={recipe} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      {renderStep()}
    </div>
  );
}

export default App;
