// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";

// export default function Signup() {
//   const navigate = useNavigate();

//   const {
//     signup,
//     isAuthenticated,
//     loading,
//     error
//   } = useAuthStore();

//   const [name, setName] = useState("");
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
//     signup(name, email, password);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
//       <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">

//         {/* Header */}
//         <div className="text-center">
//           <h1 className="text-3xl font-black text-white">
//             Create your account
//           </h1>
//           <p className="text-slate-400 text-sm mt-1">
//             Start using JobFitAI today
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="block text-sm text-slate-300 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="Your name"
//             />
//           </div>

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
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength={6}
//               className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
//               placeholder="Minimum 6 characters"
//             />
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
//               {error}
//             </p>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 transition text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Creating account..." : "Sign Up"}
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm text-slate-400">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-violet-400 hover:text-violet-300 font-medium"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";

// export default function Signup() {
//   const navigate = useNavigate();
//   const { login } = useAuthStore();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!email || !password) {
//       setError("Please fill all fields");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       setLoading(true);

//       /* ---------------- MOCK SIGNUP ---------------- */
//       const fakeUser = { id: "1", email };
//       const fakeToken = "mock-token";

//       localStorage.setItem("token", fakeToken);

//       login(fakeUser, fakeToken);

//       navigate("/analyze");
//     } catch (err) {
//       setError("Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
//       <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-8">
        
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-black text-white">
//             Create your account
//           </h1>
//           <p className="text-slate-400 text-sm mt-2">
//             Start using JobFit AI today
//           </p>
//         </div>

//         {/* Error */}
//         {error && (
//           <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="you@example.com"
//               className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder-slate-500
//                          focus:outline-none focus:ring-2 focus:ring-violet-500"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Minimum 6 characters"
//               className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder-slate-500
//                          focus:outline-none focus:ring-2 focus:ring-violet-500"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`
//               w-full py-3 rounded-xl
//               font-semibold text-white
//               transition-all
//               ${
//                 loading
//                   ? "bg-slate-700 cursor-not-allowed"
//                   : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02] active:scale-[0.98]shadow-lg shadow-violet-500/30"
//               }
//             `}
//           >
//             {loading ? "Creating account..." : "Sign Up"}
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-sm text-slate-400 text-center mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-violet-400 hover:text-violet-300 hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Signup() {
  const navigate = useNavigate();
  const {
    signup,
    loading,
    error,
    isAuthenticated,
    clearError
  } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* =====================
     CLEAR ERROR ON PAGE ENTRY
     (prevents Login → Signup leak)
  ===================== */
  useEffect(() => {
    clearError();
  }, [clearError]);

  /* =====================
     REDIRECT ON SUCCESS
  ===================== */
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/analyze");
    }
  }, [isAuthenticated, navigate]);

  /* =====================
     HANDLE SUBMIT
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">
            Create your account
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Start using JobFit AI today
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
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearError();
              }}
              placeholder="Your name"
              className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-white placeholder-slate-500
                ${error
                  ? "border-red-500"
                  : "border-white/10 focus:ring-2 focus:ring-violet-500"}
                focus:outline-none`}
            />
          </div>

          {/* Email */}
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
              className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-white placeholder-slate-500
                ${error
                  ? "border-red-500"
                  : "border-white/10 focus:ring-2 focus:ring-violet-500"}
                focus:outline-none`}
            />
          </div>

          {/* Password */}
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
              placeholder="Minimum 6 characters"
              className={`w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-white placeholder-slate-500
                ${error
                  ? "border-red-500"
                  : "border-white/10 focus:ring-2 focus:ring-violet-500"}
                focus:outline-none`}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all
              ${
                loading
                  ? "bg-slate-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-500/30"
              }
            `}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            onClick={clearError}
            className="text-violet-400 hover:text-violet-300 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
