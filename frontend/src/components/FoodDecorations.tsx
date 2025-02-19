import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Pizza, Salad, Utensils, Wine } from 'lucide-react';

type FoodDecorationType = 'home' | 'book' | 'dashboard' | 'auth';

const decorations = {
  home: [Coffee, Pizza, Salad, Wine],
  book: [Utensils, Wine],
  dashboard: [Coffee, Pizza],
  auth: [Utensils],
};

const FoodDecorations: React.FC<{ type: FoodDecorationType }> = ({ type }) => {
  const Icons = decorations[type];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-gray-200 opacity-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.1, 
            scale: 1,
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 2
          }}
        >
          <Icon size={48 + Math.random() * 48} />
        </motion.div>
      ))}
    </div>
  );
};

export default FoodDecorations;
