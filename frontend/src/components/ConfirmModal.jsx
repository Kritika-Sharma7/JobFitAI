import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger" // danger | warning | info
}) {
  const variants = {
    danger: {
      icon: AlertTriangle,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
      btnBg: "bg-red-500 hover:bg-red-600",
    },
    warning: {
      icon: AlertTriangle,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
      btnBg: "bg-amber-500 hover:bg-amber-600",
    },
    info: {
      icon: AlertTriangle,
      iconBg: "bg-accent-purple/10",
      iconColor: "text-accent-purple",
      btnBg: "bg-gradient-to-r from-accent-purple to-accent-cyan hover:opacity-90",
    },
  };

  const style = variants[variant] || variants.danger;
  const Icon = style.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md glass-card p-6"
          >
            <div className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-6 h-6 ${style.iconColor}`} />
            </div>

            <h2 className="text-xl font-bold text-white text-center">
              {title}
            </h2>

            <p className="text-sm text-dark-400 mt-2 text-center">
              {description}
            </p>

            <div className="mt-6 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCancel}
                className="flex-1 px-4 py-2.5 rounded-xl
                           bg-white/5 border border-white/10
                           text-white font-semibold hover:bg-white/10 transition-colors"
              >
                {cancelText}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className={`flex-1 px-4 py-2.5 rounded-xl
                           ${style.btnBg}
                           text-white font-semibold transition-colors`}
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
