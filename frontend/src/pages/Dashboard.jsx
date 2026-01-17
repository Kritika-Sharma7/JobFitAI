// import { useEffect, useState } from "react";
// import Dashboard from "../components/dashboard/Dashboard";
// import { getDashboardData } from "../services/api";

// /* -------------------- MODE FLAG -------------------- */
// const USE_MOCK_DATA = true; // set to false when backend is ready

// /* -------------------- MOCK DATA (UI MODE ONLY) -------------------- */
// const mockDashboardData = {
//   stats: {
//     totalResumes: 3,
//     totalJDAnalyzed: 5,
//     averageMatchScore: 68,
//     bestMatchScore: 82
//   },
//   recentResumes: [
//     {
//       version: 3,
//       createdAt: "2025-12-24T12:22:07.393Z",
//       skillsCount: 6
//     },
//     {
//       version: 2,
//       createdAt: "2025-12-23T10:15:00.000Z",
//       skillsCount: 5
//     }
//   ],
//   recentJDMatches: [
//     {
//       jdId: "frontend_jd_1",
//       matchScore: 72,
//       verdict: "Partial Match",
//       createdAt: "2025-12-24T12:30:00.000Z"
//     },
//     {
//       jdId: "frontend_jd_2",
//       matchScore: 82,
//       verdict: "Strong Match",
//       createdAt: "2025-12-23T15:45:00.000Z"
//     }
//   ]
// };

// export default function DashboardPage() {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   /* -------------------- DATA LOADING -------------------- */
//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         if (USE_MOCK_DATA) {
//           // UI MODE (no backend)
//           setTimeout(() => {
//             setDashboardData(mockDashboardData);
//             setLoading(false);
//           }, 600);
//         } else {
//           // BACKEND MODE
//           const res = await getDashboardData();
//           setDashboardData(res.data.dashboard);
//           setLoading(false);
//         }
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, []);

//   /* -------------------- UI STATES -------------------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-slate-400">
//         Loading dashboard…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-400">
//         {error}
//       </div>
//     );
//   }

//   /* -------------------- RENDER -------------------- */
//   return (
//     <div className="min-h-screen bg-slate-950 pt-28 pb-20 px-6">
//       <div className="max-w-7xl mx-auto">
//         <Dashboard data={dashboardData} />
//       </div>
//     </div>
//   );
// }



// ======= EDITED CODE BY RS =======

import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import { getDashboardData } from "../services/api";

/* -------------------- MODE FLAG -------------------- */
const USE_MOCK_DATA = false; // set to false when backend is ready

/* -------------------- MOCK DATA (UI MODE ONLY) -------------------- */
const mockDashboardData = {
  stats: {
    totalResumes: 3,
    totalJDAnalyzed: 5,
    averageMatchScore: 68,
    bestMatchScore: 82
  },
  recentResumes: [
    {
      version: 3,
      createdAt: "2025-12-24T12:22:07.393Z",
      skillsCount: 6
    },
    {
      version: 2,
      createdAt: "2025-12-23T10:15:00.000Z",
      skillsCount: 5
    }
  ],
  recentJDMatches: [
    {
      jdId: "frontend_jd_1",
      matchScore: 72,
      verdict: "Partial Match",
      createdAt: "2025-12-24T12:30:00.000Z"
    },
    {
      jdId: "frontend_jd_2",
      matchScore: 82,
      verdict: "Strong Match",
      createdAt: "2025-12-23T15:45:00.000Z"
    }
  ]
};

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* -------------------- DATA LOADING {RS EDITED}-------------------- */
  useEffect(() => {
      const loadDashboard = async () => {
        try {
          setLoading(true);
          setError(null);

          if (USE_MOCK_DATA) {
            setTimeout(() => {
              setDashboardData(mockDashboardData);
              setLoading(false);
            }, 600);
          } else {
            const res = await getDashboardData();
            // ✅ FIX HERE
            setDashboardData(res);
            setLoading(false);
          }
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      loadDashboard();
    }, []);


  /* -------------------- UI STATES -------------------- */
  if (loading) {
    return <Dashboard data={null} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-gray-400 text-sm mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-primary text-sm">
          Try Again
        </button>
      </div>
    );
  }

  /* -------------------- RENDER -------------------- */
  return <Dashboard data={dashboardData} />;
}

