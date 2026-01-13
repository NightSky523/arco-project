import { Navigate, Outlet } from "react-router-dom";
import { useGlobal } from "@/stores/global";

export function ProtectedRoute() {
  const { me, loadingMe } = useGlobal();

  if (loadingMe) {
    return <div className="flex items-center justify-center min-h-screen">加载中...</div>;
  }

  if (!me) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
