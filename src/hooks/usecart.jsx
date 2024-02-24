/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query"; // Import useQuery from react-query
import { AuthContext } from "../Contexts/AuthProvider";

const usecart = () => {
  const { user } = useContext(AuthContext);

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://food-iota-lovat.vercel.app/carts?email=${user?.email}`
      );
      return res.json();
    },
  });

  return [cart, refetch];
};

export default usecart;
