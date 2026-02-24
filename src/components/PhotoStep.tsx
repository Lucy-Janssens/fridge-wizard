import { useState, useRef, useCallback } from 'react';
import styles from './PhotoStep.module.css';
import stepStyles from './Step.module.css';

interface PhotoStepProps {
  onSubmit: (image: string) => void;
}

export function PhotoStep({ onSubmit }: PhotoStepProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const resetPhoto = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = () => {
    if (preview) {
      onSubmit(preview);
    }
  };

  return (
    <div className={stepStyles.card}>
      <h2 className={stepStyles.heading}>📸 Snap Your Fridge</h2>
      
      {!preview ? (
        <div
          className={`${styles.uploadArea} ${isDragging ? styles.dragover : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className={styles.uploadIcon}>📷</div>
          <p>Tap to take photo or upload</p>
          <p className={styles.hint}>Supports: JPG, PNG, HEIC</p>
        </div>
      ) : (
        <div className={styles.previewContainer}>
          <img src={preview} alt="Preview" className={styles.preview} />
          <button className={styles.changePhoto} onClick={resetPhoto}>
            Change
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInput}
        className={styles.fileInput}
      />

      <button
        className={stepStyles.btnPrimary}
        onClick={handleContinue}
        disabled={!preview}
        style={{ marginTop: '20px' }}
      >
        Continue →
      </button>
    </div>
  );
}
