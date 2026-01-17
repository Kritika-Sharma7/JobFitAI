/*
  =====================================================
  AUTH STORE - Session Management & Authentication
  =====================================================
  🔥 CRITICAL: This store manages user sessions and ensures
  clean state separation between different users.
  
  On login/logout: Clears all transient UI state to prevent
  data leakage between accounts.
  =====================================================
*/

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
import api, { getUserProfile, updateUserProfile } from "../services/api";

const TOKEN_KEY = "token";
const ANALYZE_STORE_KEY = "analyze-store";

const useAuthStore = create((set, get) => ({
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
  hydrateAuth: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem("user");
    
    if (!token) return;

    let user = null;
    if (storedUser) {
      try {
        user = JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
      }
    }

    set({
      token,
      user,
      isAuthenticated: true
    });

    // Fetch latest user profile from server
    try {
      const profile = await getUserProfile();
      if (profile) {
        const updatedUser = {
          id: profile.id,
          name: profile.name,
          email: profile.email
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        set({ user: updatedUser });
      }
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  },

  /* =====================
     UPDATE USER NAME
  ===================== */
  updateName: async (name) => {
    try {
      const response = await updateUserProfile({ name });
      if (response.success && response.user) {
        const updatedUser = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        set({ user: updatedUser });
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      console.error("Failed to update name:", err);
      return { success: false, error: err.message };
    }
  },

  /* =====================================================
     🔥 CLEAR SESSION DATA - CRITICAL FOR MULTI-USER
     Clears all transient UI state on login/logout to
     prevent data leakage between different accounts.
  ===================================================== */
  clearSessionData: () => {
    // Remove persisted analyze store data
    localStorage.removeItem(ANALYZE_STORE_KEY);
    
    // Clear any other session-specific keys
    const keysToRemove = [
      "last-jd-id",
      "draft-jd",
      "draft-resume",
      "dashboard-cache"
    ];
    keysToRemove.forEach(key => localStorage.removeItem(key));
  },

  /* =====================
     SIGNUP (REAL API)
  ===================== */
  signup: async (name, email, password) => {
    set({ loading: true, error: null });

    try {
      // Clear any previous session data before signup
      get().clearSessionData();

      const res = await api.post("/auth/signup", {
        name,
        email,
        password
      });

      localStorage.setItem(TOKEN_KEY, res.data.token);
      // Store user data in localStorage for persistence
      localStorage.setItem("user", JSON.stringify({
        id: res.data.user?.id,
        name: res.data.user?.name || name,
        email: res.data.user?.email || email
      }));

      set({
        user: { id: res.data.user?.id, name: res.data.user?.name || name, email: res.data.user?.email || email },
        token: res.data.token,
        isAuthenticated: true,
        loading: false
      });

      return { success: true };
    } catch (err) {
      set({
        error: err.message || "Signup failed",
        loading: false
      });
      return { success: false, error: err.message };
    }
  },

  /* =====================
     LOGIN (REAL API)
  ===================== */
  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      // 🔥 CRITICAL: Clear previous user's session data before login
      get().clearSessionData();

      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem(TOKEN_KEY, res.data.token);
      // Store user data in localStorage for persistence
      localStorage.setItem("user", JSON.stringify({
        id: res.data.userId,
        name: res.data.name,
        email: res.data.email || email
      }));

      set({
        user: { id: res.data.userId, name: res.data.name, email: res.data.email || email },
        token: res.data.token,
        isAuthenticated: true,
        loading: false
      });

      return { success: true };
    } catch (err) {
      set({
        error: err.message || "Login failed",
        loading: false
      });
      return { success: false, error: err.message };
    }
  },

  /* =====================
     LOGOUT
  ===================== */
  logout: () => {
    // Clear token and user
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("user");
    
    // 🔥 CRITICAL: Clear all session data on logout
    get().clearSessionData();

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
