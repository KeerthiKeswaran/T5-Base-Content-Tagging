import React, { useState } from 'react';
import ArticleInput from './ArticleInput';
import TagsDisplay from './TagsDisplay';

const AutoTag: React.FC = () => {
  const [article, setArticle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerateTags = async () => {
    if (!article.trim()) return;
  
    setIsLoading(true);
    setTags([]);
    setProgress(0);
  
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 90 ? 90 : newProgress;
      });
    }, 500);
  
    try {
      const response = await fetch(import.meta.env.VITE_MODELBIT_TAG_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: article })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result['data'][0]['generated_text'])
      const rawTags = result['data'][0]['generated_text'];
      const tagArray = rawTags.split(',').map((tag: string) => tag.trim());
      setTags(tagArray);
      setProgress(100);
    } catch (error) {
      console.error("Error generating tags:", error);
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Auto<span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Tag</span>
        </h1>
        <p className="text-gray-300 text-lg">
          Generate intelligent tags for your articles using AI
        </p>
      </header>
      
      <div className="space-y-8">
        <ArticleInput 
          article={article} 
          setArticle={setArticle} 
          onGenerateTags={handleGenerateTags}
          isLoading={isLoading}
        />
        
        <TagsDisplay 
          tags={tags} 
          isLoading={isLoading}
          progress={progress}
        />
      </div>
    </div>
  );
};

export default AutoTag;