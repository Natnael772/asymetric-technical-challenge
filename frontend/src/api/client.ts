/**
 * API Client - Base fetch wrapper with error handling
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api";

export interface ApiError {
  message: string;
  status: number;
}

/**
 * Custom error class for API errors
 */
export class FetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "FetchError";
    this.status = status;
  }
}

/**
 * Generic fetch wrapper with error handling
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new FetchError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }

    // Network or parsing error
    throw new FetchError(
      error instanceof Error ? error.message : "Network error occurred",
      0
    );
  }
}

export default fetchApi;
