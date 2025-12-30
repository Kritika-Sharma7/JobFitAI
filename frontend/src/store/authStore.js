// import { create } from "zustand";
// import api from "../services/api"; // axios instance with interceptor

// const useAuthStore = create((set, get) => ({
//   user: null,
//   token: null,
// //   isAuthenticated: false,
// //   loading: false,
// //   error: null,

// //   /* ========================
// //      LOGIN
// //   ========================= */
// //   login: async (email, password) => {
// //     // try {
// //     //   set({ loading: true, error: null });

// //     //   const res = await api.post("/auth/login", {
// //     //     email,
// //     //     password
// //     //   });

// //     //   const { token, user } = res.data;

// //     //   localStorage.setItem("token", token);

// //     //   set({
// //     //     user,
// //     //     token,
// //     //     isAuthenticated: true,
// //     //     loading: false
// //     //   });
// //     // } catch (err) {
// //     //   set({
// //     //     error:
// //     //       err?.response?.data?.message ||
// //     //       "Invalid email or password",
// //     //     loading: false
// //     //   });
// //     // }
// //       const fakeUser = { id: "1", email };
// //       const fakeToken = "mock-token";

// //       localStorage.setItem("token", fakeToken);

// //       set({
// //         user: fakeUser,
// //         token: fakeToken,
// //         isAuthenticated: true
// //       });
// //   },

// //   /* ========================
// //      SIGNUP
// //   ========================= */
// //   signup: async (name, email, password) => {
// //     try {
// //       set({ loading: true, error: null });

// //       const res = await api.post("/auth/signup", {
// //         name,
// //         email,
// //         password
// //       });

// //       const { token, user } = res.data;

// //       localStorage.setItem("token", token);

// //       set({
// //         user,
// //         token,
// //         isAuthenticated: true,
// //         loading: false
// //       });
// //     } catch (err) {
// //       set({
// //         error:
// //           err?.response?.data?.message ||
// //           "Signup failed",
// //         loading: false
// //       });
// //     }
// //   },

// //   /* ========================
// //      LOGOUT
// //   ========================= */
// //   logout: () => {
// //     localStorage.removeItem("token");
// //     set({
// //       user: null,
// //       token: null,
// //       isAuthenticated: false,
// //       loading: false,
// //       error: null
// //     });
// //   },

// //   /* ========================
// //      HYDRATE AUTH ON REFRESH
// //   ========================= */
// //   hydrateAuth: async () => {
// //     const token = localStorage.getItem("token");

// //     if (!token) {
// //       set({ isAuthenticated: false });
// //       return;
// //     }

// //     try {
// //       set({ loading: true });

// //       // Optional: verify token by hitting backend
// //       // const res = await api.get("/auth/me");
// //       // set({ user: res.data.user });

// //       set({
// //         token,
// //         isAuthenticated: true,
// //         loading: false
// //       });
// //     } catch (err) {
// //       // Token invalid or expired
// //       localStorage.removeItem("token");
// //       set({
// //         user: null,
// //         token: null,
// //         isAuthenticated: false,
// //         loading: false
// //       });
// //     }
// //   }
// // }));

// // export default useAuthStore;
// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,

//   /* =====================
//      HYDRATE AUTH (FIX)
//   ===================== */
//   hydrateAuth: () => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       set({
//         token,
//         user: { id: "1", email: "mock@user.com" },
//         isAuthenticated: true
//       });
//     }
//   },

//   login: async (email, password) => {
//     set({ loading: true, error: null });
//     await new Promise((res) => setTimeout(res, 500));

//     const fakeUser = { id: "1", email };
//     const fakeToken = "mock-token";

//     localStorage.setItem("token", fakeToken);

//     set({
//       user: fakeUser,
//       token: fakeToken,
//       isAuthenticated: true,
//       loading: false
//     });
//   },

//   signup: async (name, email, password) => {
//     set({ loading: true, error: null });
//     await new Promise((res) => setTimeout(res, 500));

//     const fakeUser = { id: "1", name, email };
//     const fakeToken = "mock-token";

//     localStorage.setItem("token", fakeToken);

//     set({
//       user: fakeUser,
//       token: fakeToken,
//       isAuthenticated: true,
//       loading: false
//     });
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     set({
//       user: null,
//       token: null,
//       isAuthenticated: false
//     });
//   }
// }));

// export default useAuthStore;
import { create } from "zustand";
import api from "../services/api";

const TOKEN_KEY = "token";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  loading: false,
  error: null,

  /* =====================
     CLEAR ERROR
  ===================== */
  clearError: () => set({ error: null }),

  /* =====================
     HYDRATE AUTH (on reload)
  ===================== */
  hydrateAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    set({
      token,
      isAuthenticated: true
    });
  },

  /* =====================
     SIGNUP (REAL API)
  ===================== */
  signup: async (name, email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/auth/signup", {
        email,
        password
      });

      localStorage.setItem(TOKEN_KEY, res.data.token);

      set({
        user: { id: res.data.userId, email },
        token: res.data.token,
        isAuthenticated: true,
        loading: false
      });
    } catch (err) {
      set({
        error: err.message || "Signup failed",
        loading: false
      });
    }
  },

  /* =====================
     LOGIN (REAL API)
  ===================== */
  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem(TOKEN_KEY, res.data.token);

      set({
        user: { id: res.data.userId, email },
        token: res.data.token,
        isAuthenticated: true,
        loading: false
      });
    } catch (err) {
      set({
        error: err.message || "Login failed",
        loading: false
      });
    }
  },

  /* =====================
     LOGOUT
  ===================== */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  }
}));

export default useAuthStore;
