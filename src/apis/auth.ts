import api from "@/lib/axios";


export type LoginData = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export const login = (data: LoginData) => {
  return api.post<LoginResponse>("/api/admin/login", data, {
    skipAuth: true,
  });
};
