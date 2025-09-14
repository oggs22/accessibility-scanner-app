const getFormatDate = (dateStr: string, useUTC: boolean = true) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  
  const year = useUTC ? date.getUTCFullYear() : date.getFullYear();
  const month = String((useUTC ? date.getUTCMonth() : date.getMonth()) + 1).padStart(2, "0");
  const day = String(useUTC ? date.getUTCDate() : date.getDate()).padStart(2, "0");
  const hours = String(useUTC ? date.getUTCHours() : date.getHours()).padStart(2, "0");
  const minutes = String(useUTC ? date.getUTCMinutes() : date.getMinutes()).padStart(2, "0");
  const seconds = String(useUTC ? date.getUTCSeconds() : date.getSeconds()).padStart(2, "0");
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export default getFormatDate;