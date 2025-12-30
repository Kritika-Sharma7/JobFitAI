export default function ConfirmModal({
  open,
  title = "Are you sure?",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl
                      bg-slate-900 border border-white/10
                      p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">
          {title}
        </h2>

        <p className="text-sm text-white/70 mt-2">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg
                       border border-white/20
                       text-white/80 hover:bg-white/10"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg
                       bg-red-600 hover:bg-red-500
                       text-white font-medium"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
