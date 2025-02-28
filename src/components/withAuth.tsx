import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthService } from '../services/api/auth'; // Adjust the path as needed

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = AuthService.getToken();

      if (!token) {
        router.replace("/login"); // Redirect to login page if not authenticated
      }
    }, [router]);

    // Render the protected component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;