interface TokenPayload {
  email?: string;
  name?: string;
  sub?: string;
  [key: string]: any;
}

export default function getJwtTokenPayload(): TokenPayload | null {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
    return payload as TokenPayload;
  } catch (err) {
    console.error('Failed to decode token:', err);
    return null;
  }
}
