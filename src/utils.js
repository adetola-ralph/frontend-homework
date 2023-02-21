
export const formatDateToReadableString = date => new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  export const generateRandomNum = () => Math.floor(1000 + Math.random() * 9000);

  export const capitalize = (text) => {
    if (!text) return;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  export const sumItems = items => items.reduce((sum, item) => sum + +item.price * +item.quantity, 0);