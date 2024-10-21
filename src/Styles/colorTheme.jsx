export const colors = {
  sidebar: {
    bg: 'bg-[#614B3B]',
    hover: 'hover:bg-[#725A49]',
    text: 'text-white',
    textHover: 'hover:text-white',
    activeItem: 'bg-[#725A49]'
  },
  card: {
    primary: 'bg-[#8B6F5C]',    // Dark brown cards
    secondary: 'bg-[#B4A194]',  // Light brown cards
    accent: 'bg-[#9D8475]'      // Medium brown cards
  },
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    light: 'text-white'
  },
  background: 'bg-[#F8F7F6]',
  border: 'border-[#E5E1DD]',
  icon: {
    primary: 'text-white',
    secondary: 'text-gray-400'
  }
};

// Helper function to combine color classes
export const combineClasses = (...classes) => {
  return classes.join(' ');
};