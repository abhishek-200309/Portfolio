const SESSION_KEY = 'am_portfolio_owner';

export function isOwnerSession(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function setOwnerSession(): void {
  sessionStorage.setItem(SESSION_KEY, '1');
}

export function clearOwnerSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
