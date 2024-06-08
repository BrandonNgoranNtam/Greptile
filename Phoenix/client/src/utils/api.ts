// src/utils/api.ts
import { devLog } from './utils';

const BASE_URL = "http://localhost:3000/api";

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function fetchWithAuth(
  url: string,
  options: FetchOptions = {},
  token?: string,
  requiresAuth: boolean = true
): Promise<any> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (requiresAuth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  devLog("token:", token);

  devLog("fetchWithAuth:", url, options, requiresAuth);

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    devLog("response:", response);
    const error = await response.json();
    devLog("error:", error);
    throw new Error(error.message || "Something went wrong");
  }

  devLog("response:", response);
  return response.json();
}

export async function get(url: string, token?: string, requiresAuth: boolean = true): Promise<any> {
  return fetchWithAuth(url, { method: "GET" }, token, requiresAuth);
}

export async function post(url: string, body: any, token?: string, requiresAuth: boolean = true): Promise<any> {
  return fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(body),
  }, token, requiresAuth);
}

export async function put(url: string, body: any, token?: string, requiresAuth: boolean = true): Promise<any> {
  return fetchWithAuth(url, {
    method: "PUT",
    body: JSON.stringify(body),
  }, token, requiresAuth);
}

export async function del(url: string, body: any, token?: string, requiresAuth: boolean = true): Promise<any> {
  return fetchWithAuth(url, {
    method: "DELETE",
    body: JSON.stringify(body),
  }, token, requiresAuth);
}
