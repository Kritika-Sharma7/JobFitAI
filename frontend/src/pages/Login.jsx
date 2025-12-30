// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";

// export default function Login() {
//   const navigate = useNavigate();

//   const {
//     login,
//     isAuthenticated,
//     loading,
//     error
//   } = useAuthStore();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Redirect if already logged in
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     login(email, password);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
//       <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">

//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-3xl font-black text-white">Welcome Back</h1>
//           <p className="text-slate-400 text-sm mt-1">
//             Login to continue to JobFitAI
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label className="block text-sm text-slate-300 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="you@example.com"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm text-slate-300 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //               className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
// //               placeholder="••••••••"
// //             />
// //           </div>

// //           {/* Error */}
// //           {error && (
// //             <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
// //               {error}
// //             </p>
// //           )}

// //           {/* Submit */}
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 transition text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
// //           >
// //             {loading ? "Logging in..." : "Login"}
// //           </button>
// //         </form>

// //         {/* Footer */}
// //         <p className="text-center text-sm text-slate-400">
// //           Don’t have an account?{" "}
// //           <Link
// //             to="/signup"
// //             className="text-violet-400 hover:text-violet-300 font-medium"
// //           >
// //             Sign up
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";

// export default function Login() {
//   const navigate = useNavigate();
//   const login = useAuthStore((s) => s.login);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await login(email, password); // mock or real
//       navigate("/analyze");
//     } catch (err) {
//       setError(err.message || "Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
//       <div className="w-full max-w-md rounded-3xl border border-white/10
//                       bg-gradient-to-br from-slate-900/80 to-slate-950/80
//                       shadow-2xl ring-1 ring-violet-500/20 p-8">

//         {/* Header */}
//         <h1 className="text-3xl font-black text-white text-center">
//           Welcome back
//         </h1>
//         <p className="text-slate-400 text-sm text-center mt-2">
//           Login to continue optimizing your job matches
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mt-8 space-y-5">

//           <Input
//             label="Email"
//             type="email"
//             value={email}
//             onChange={setEmail}
//             placeholder="you@example.com"
//           />

//           <Input
//             label="Password"
//             type="password"
//             value={password}
//             onChange={setPassword}
//             placeholder="••••••••"
//           />

//           {error && (
//             <p className="text-red-400 text-sm text-center">
//               {error}
//             </p>
//           )}

//           <button
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-semibold transition
//               ${
//                 loading
//                   ? "bg-slate-700 cursor-not-allowed"
//                   : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.01]"
//               }`}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-slate-400 text-center mt-6">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-violet-400 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ---------- Reusable Input ---------- */
// function Input({ label, type, value, onChange, placeholder }) {
//   return (
//     <div>
//       <label className="block text-sm text-slate-300 mb-1">
//         {label}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         required
//         className="w-full rounded-xl bg-slate-900/70
//                    border border-white/10 px-4 py-3 text-white
//                    placeholder-slate-500 focus:outline-none
//                    focus:ring-2 focus:ring-violet-500"
//       />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  const {
    login,
    loading,
    error,
    isAuthenticated,
    clearError
  } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Clear stale errors on page load
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Redirect after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-2">
            Sign in to continue to JobFit AI
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearError();
              }}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
              loading
                ? "bg-slate-700 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-slate-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            onClick={clearError}
            className="text-violet-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
