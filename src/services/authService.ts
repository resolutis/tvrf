const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://94x2bbtt7d.execute-api.eu-west-2.amazonaws.com/prod";

const API_KEY = import.meta.env.VITE_API_KEY || ""; // Read API key from .env file

interface AuthResponse {
  message: string;
}

export class AuthError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "AuthError";
  }
}

export const authService = {
  async register(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY, // Use the API key from .env
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthError(
          data.message || "Registration failed",
          response.status
        );
      }

      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError("Failed to connect to the server");
    }
  },

  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY, // Use the API key from .env
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthError(data.message || "Login failed", response.status);
      }

      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError("Failed to connect to the server");
    }
  },

  async unregister(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/unregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY, // Use the API key from .env
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthError(
          data.message || "Unregister failed",
          response.status
        );
      }

      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError("Failed to connect to the server");
    }
  },
};
