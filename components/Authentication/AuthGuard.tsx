// components/AuthGuard.tsx
import useAuthStatus from "@/hooks/useAuthStatus";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, loading } = useAuthStatus();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Nếu không còn loading và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      router.push("/login"); // Hoặc bất kỳ trang đăng nhập nào của bạn
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // Hiển thị trạng thái loading hoặc không hiển thị gì trong khi kiểm tra auth
    return <div>Đang kiểm tra xác thực...</div>;
  }

  // Nếu người dùng đã đăng nhập, hiển thị nội dung của route
  return <>{children}</>;
};

export default AuthGuard;
