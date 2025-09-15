import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const { user, loading } = useAuth(); // get user from auth
    const axiosSecure = useAxiosSecure();

    // Fetch role only if user exists
    const { data: role = "user", isLoading: roleLoading } = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !!user?.email && !loading, // ✅ only fetch when email is available
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role; // backend sends { role: "admin" }
        },
    });

    return { role, roleLoading };
};

export default useUserRole;
