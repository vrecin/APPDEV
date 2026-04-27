interface AuthLoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username?: string;
  };
  roles?: string[];
}

const BASE_URL = 'http://127.0.0.1:8000/api';
const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export async function checkBackendConnection(): Promise<boolean> {
  const url = BASE_URL;
  console.log('[API] Checking backend at', url);
  try {
    const response = await fetch(url);
    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      console.log('[API] Successfully connected to backend at', BASE_URL);
      return true;
    }
    console.log('[API] Backend responded but not OK:', response.status, data);
    return false;
  } catch (error) {
    console.log('[API] Failed to connect to backend:', (error as Error)?.message || error, '| URL:', url);
    return false;
  }
}

export async function authLogin({ email, password }: AuthLoginParams): Promise<AuthResponse> {
  try {
    const response = await fetch(BASE_URL + '/login', {
      method: 'POST',
      ...options,
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('[API] Login request: connected to backend, success');
      return data;
    }
    console.log('[API] Login request: connected to backend, error response', response.status, data?.error || data?.message);
    throw new Error(data.error || data.message || 'Login failed');
  } catch (error) {
    if ((error as Error).message === 'Login failed' || ((error as Error).message && !(error as Error).message.includes('Network'))) {
      throw error;
    }
    console.log('[API] Login request: network error (backend unreachable)', (error as Error)?.message);
    throw error;
  }
}

export async function authRegister({ email, password }: RegisterParams): Promise<AuthResponse> {
  try {
    const response = await fetch(BASE_URL + '/register', {
      method: 'POST',
      ...options,
      body: JSON.stringify({
        email: email?.trim() ?? '',
        password: password ?? '',
      }),
    });
    const data = await response.json();

    if (response.ok) {
      console.log('[API] Register request: connected to backend, success');
      return data;
    }
    console.log('[API] Register request: connected to backend, error response', response.status, data?.error || data?.message);
    throw new Error(data.error || data.message || 'Registration failed');
  } catch (error) {
    if ((error as Error).message === 'Registration failed' || ((error as Error).message && !(error as Error).message.includes('Network'))) {
      throw error;
    }
    console.log('[API] Register request: network error (backend unreachable)', (error as Error)?.message);
    throw error;
  }
}

export async function authLogout(token: string): Promise<any> {
  try {
    const response = await fetch(BASE_URL + '/logout', {
      method: 'POST',
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      console.log('[API] Logout request: connected to backend, success');
      return data;
    }
    console.log('[API] Logout request: connected to backend, error', response.status);
    throw new Error(data.error || data.message || 'Logout failed');
  } catch (error) {
    console.log('[API] Logout request: network error', (error as Error)?.message);
    throw error;
  }
}
