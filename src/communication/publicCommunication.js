import toast from "react-hot-toast";

const serverUrl = import.meta.env.VITE_SERVER;

if (!serverUrl) {
  toast.error("API Server not set");
}

export const publicCommunication = {
  getAllProducts: async () => {
    try {
      const res = await fetch(`${serverUrl}/products`);
      if (res.ok) {
        return await res.json();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },
  getSingleProduct: async (id) => {
    try {
      const res = await fetch(`${serverUrl}/products/${id}`);
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },
  getProductsByCategory: async (cat) => {
    try {
      const res = await fetch(`${serverUrl}/products/category/${cat}`);
      if (res.ok) {
        return await res.json();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },
  login: async ({ username, password }) => {
    try {
      const res = await fetch(`${serverUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const token = await res.json();
        if (token) {
          return token.token;
        }
      }

      toast.error("Invalid Username or Password");
      return null;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  },
};
