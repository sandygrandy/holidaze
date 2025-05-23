export function formatDateRange(from: string, to: string): string {
    const fromDate = new Date(from);
    const toDate = new Date(to);
  
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    const formattedFrom = fromDate.toLocaleDateString(undefined, options);
    const formattedTo = toDate.toLocaleDateString(undefined, options);
  
    return `${formattedFrom} → ${formattedTo}`;
  }
  

  export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }