"use client";

import React, { useState } from 'react';

interface MoodEmojiReactionPanelProps {
  showCounters?: boolean;
  onReaction?: (emoji: string) => void;
  className?: string;
  initialReactions?: Record<string, number>;
}

const MoodEmojiReactionPanel: React.FC<MoodEmojiReactionPanelProps> = ({
  showCounters = true,
  onReaction = () => { },
  className = '',
  initialReactions = {}
}) => {
  const emojis = ['😄', '😢', '😲', '👍', '❤️'];
  const [reactions, setReactions] = useState<Record<string, number>>(
    emojis.reduce((acc, emoji) => ({ ...acc, [emoji]: initialReactions[emoji] || 0 }), {})
  );
  const [animating, setAnimating] = useState<Record<string, boolean>>({});

  const handleReaction = (emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [emoji]: prev[emoji] + 1
    }));
    setAnimating(prev => ({ ...prev, [emoji]: true }));
    onReaction(emoji);

    // Remove animation after 500ms
    setTimeout(() => {
      setAnimating(prev => ({ ...prev, [emoji]: false }));
    }, 50000);
  };

  return (
    <div className={`flex flex-nowrap items-center gap-1 p-1 bg-white rounded-full shadow-lg border border-gray-200 ${className}`}>
      {emojis.map(emoji => (
        <button
          key={emoji}
          onClick={() => handleReaction(emoji)}
          className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-lg sm:text-xl rounded-full transition-all duration-200 focus:outline-none ${animating[emoji] ? 'animate-bounce' : ''
            }`}
          aria-label={`React with ${emoji}`}
        >
          <div className="relative flex items-center justify-center transition-transform duration-200 hover:-translate-y-1 hover:scale-125">
            <span className="select-none">{emoji}</span>
            {showCounters && reactions[emoji] > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                {reactions[emoji]}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default MoodEmojiReactionPanel;
