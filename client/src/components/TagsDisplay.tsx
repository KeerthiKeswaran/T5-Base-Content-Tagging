import React from 'react';
import { TagIcon } from 'lucide-react';
import LoadingAnimation from './LoadingAnimation';

interface TagsDisplayProps {
  tags: string[];
  isLoading: boolean;
  progress: number;
}

const TagsDisplay: React.FC<TagsDisplayProps> = ({ tags, isLoading, progress }) => {
  return (
    <div className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <TagIcon className="text-white mr-2" size={20} />
        <h2 className="text-xl font-semibold text-white">AI Generated Tags</h2>
      </div>
      
      <div className="flex-1">
        {isLoading ? (
          <LoadingAnimation progress={progress} />
        ) : tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gradient-to-r from-white/10 to-transparent text-white border border-white/10 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <p>No tags generated yet.</p>
            <p className="text-sm mt-2">Click the "Generate Tags" button to create AI tags for your article.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsDisplay;