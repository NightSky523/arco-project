import api from "@/lib/axios";

export type MeResponse = {
  id: number;
  username: string;
};

export const getProfile = () => {
  return api.get<MeResponse>("/admin/profile");
};

export type UpdatePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export const updatePassword = (data: UpdatePasswordData) => {
  return api.put("/admin/password", data);
};
