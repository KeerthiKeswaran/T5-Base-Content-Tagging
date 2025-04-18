import React from 'react';
import { FileTextIcon } from 'lucide-react';

interface ArticleInputProps {
  article: string;
  setArticle: (article: string) => void;
  onGenerateTags: () => void;
  isLoading: boolean;
}

const ArticleInput: React.FC<ArticleInputProps> = ({ 
  article, 
  setArticle, 
  onGenerateTags,
  isLoading
}) => {
  return (
    <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <FileTextIcon className="text-white mr-2" size={20} />
        <h2 className="text-xl font-semibold text-white">Article Content</h2>
      </div>
      
      <textarea
        className="w-full h-64 bg-black text-white border border-gray-800 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
        placeholder="Paste your article content here..."
        value={article}
        onChange={(e) => setArticle(e.target.value)}
      />
      
      <button
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 focus:outline-none ${
          isLoading 
            ? 'bg-gray-900 text-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-white/10 via-white/5 to-transparent text-white hover:from-white/20 hover:via-white/10 hover:to-transparent focus:ring-2 focus:ring-white/20'
        }`}
        onClick={onGenerateTags}
        disabled={isLoading || !article.trim()}
      >
        {isLoading ? 'Generating Tags...' : 'Generate Tags'}
      </button>
    </div>
  );
};

export default ArticleInput;