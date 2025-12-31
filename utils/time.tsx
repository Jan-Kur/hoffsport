export function isLive(timestamp: string) {
  const date = new Date(timestamp)
  const end = new Date(date.getTime())
  end.setMinutes(end.getMinutes() + 20)

  return date.getTime() <= Date.now() && end.getTime() >= Date.now()
}

export function formatTime(date: Date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pl-PL', { 
    weekday: 'long',
    day: 'numeric',
    month: 'long' 
  }).format(date)
}

export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}