import { Suspense } from "react";
import LoginPage from "@/components/Authentication/LoginPage";

const page = () => {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  );
};

export default page;
