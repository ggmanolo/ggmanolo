import { useState, useEffect } from 'react';

export const useYearsSince = (startDate) => {
  const [years, setYears] = useState(0);

  useEffect(() => {
    const start = new Date(startDate);
    const now = new Date();
    const diff = now.getFullYear() - start.getFullYear();

    if (now.getMonth() < start.getMonth() || 
       (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())) {
      setYears(diff - 1);
    } else {
      setYears(diff);
    }
  }, [startDate]);

  return years;
}
