export function applyTheme(dark: boolean): void {
  const body = document.body
  if (dark) {
    body.classList.add('dark-theme')
  } else {
    body.classList.remove('dark-theme')
  }
}
export function getStoredTheme(): boolean {
  const stored = localStorage.getItem('theme')
  return stored === 'dark'
}

export function saveTheme(isDarkTheme: boolean): void {
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light')
}
