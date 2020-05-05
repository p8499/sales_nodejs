const REGEX_DATETIME = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
const REGEX_DATE = /^(\d{4})(\d{2})(\d{2})$/;

function parseDateTime(str: string): Date {
  REGEX_DATETIME.exec(str);
  return new Date(parseInt(RegExp.$1), parseInt(RegExp.$2) - 1, parseInt(RegExp.$3), parseInt(RegExp.$4), parseInt(RegExp.$5), parseInt(RegExp.$6), 0);
}

function formatDateTime(date: Date): string {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const dte = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');
  return `${year}${month}${dte}${hour}${minute}${second}`;
}

function parseDate(str: string): Date {
  REGEX_DATE.exec(str);
  return new Date(parseInt(RegExp.$1), parseInt(RegExp.$2) - 1, parseInt(RegExp.$3), 0, 0, 0, 0);
}

function formatDate(date: Date): string {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const dte = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${dte}`;
}


export {
  parseDateTime, formatDateTime, parseDate, formatDate,
};
