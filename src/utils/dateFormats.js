// Date format constants and utilities

export const DATE_FORMATS = {
  // Standard format for display and database: dd/mmm/yyyy (e.g., 15/Mar/2024)
  DISPLAY: 'dd/mmm/yyyy',
  
  // Preferred month format for interest form: mmm/yyyy (e.g., Mar/2024)
  PREFERRED_MONTH: 'mmm/yyyy',
  
  // Database storage format: dd/mmm/yyyy
  DATABASE: 'dd/mmm/yyyy',
  
  // HTML month input format: yyyy-MM (for internal use only)
  HTML_MONTH_INPUT: 'yyyy-MM'
};

// Date formatting utilities
export const formatDate = (date, format = DATE_FORMATS.DISPLAY) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return '';
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  
  switch (format) {
    case DATE_FORMATS.DISPLAY:
    case DATE_FORMATS.DATABASE:
      return `${day}/${month}/${year}`;
    
    case DATE_FORMATS.PREFERRED_MONTH:
      return `${month}/${year}`;
    
    case DATE_FORMATS.HTML_MONTH_INPUT:
      return `${year}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
    
    default:
      return `${day}/${month}/${year}`;
  }
};

// Parse date from various formats
export const parseDate = (dateString, format = DATE_FORMATS.DISPLAY) => {
  if (!dateString) return null;
  
  try {
    switch (format) {
      case DATE_FORMATS.DISPLAY:
      case DATE_FORMATS.DATABASE:
        // dd/mmm/yyyy format
        const [day, monthStr, year] = dateString.split('/');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months.indexOf(monthStr);
        if (month === -1) return null;
        return new Date(parseInt(year), month, parseInt(day));
      
      case DATE_FORMATS.PREFERRED_MONTH:
        // mmm/yyyy format
        const [monthStr2, year2] = dateString.split('/');
        const months2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month2 = months2.indexOf(monthStr2);
        if (month2 === -1) return null;
        return new Date(parseInt(year2), month2, 1);
      
      case DATE_FORMATS.HTML_MONTH_INPUT:
        // yyyy-MM format
        const [year3, month3] = dateString.split('-');
        return new Date(parseInt(year3), parseInt(month3) - 1, 1);
      
      default:
        return new Date(dateString);
    }
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};

// Convert between formats
export const convertDateFormat = (dateString, fromFormat, toFormat) => {
  const parsedDate = parseDate(dateString, fromFormat);
  return parsedDate ? formatDate(parsedDate, toFormat) : '';
};

// Validate date format
export const isValidDateFormat = (dateString, format) => {
  return parseDate(dateString, format) !== null;
};
