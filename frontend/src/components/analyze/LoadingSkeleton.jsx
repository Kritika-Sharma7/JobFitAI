function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Role Summary */}
      <div className="glass-heavy border border-white/10 rounded-3xl p-8">
        <div className="h-5 w-40 bg-white/10 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 w-64 bg-white/10 rounded"></div>
          <div className="h-8 w-32 bg-white/10 rounded-full"></div>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 w-20 bg-white/10 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Fit Score */}
      <div className="glass-heavy border border-white/10 rounded-3xl p-8">
        <div className="h-5 w-32 bg-white/10 rounded mb-6"></div>
        <div className="flex justify-center">
          <div className="h-24 w-24 bg-white/10 rounded-full"></div>
        </div>
        <div className="h-2 w-full bg-white/10 rounded mt-6"></div>
      </div>

      {/* Skills */}
      <div className="glass-heavy border border-white/10 rounded-3xl p-8 space-y-6">
        <div className="h-5 w-40 bg-white/10 rounded"></div>
        {[1, 2, 3].map(section => (
          <div key={section}>
            <div className="h-4 w-32 bg-white/10 rounded mb-3"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map(tag => (
                <div
                  key={tag}
                  className="h-8 w-20 bg-white/10 rounded-lg"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="glass-heavy border border-white/10 rounded-3xl p-8 space-y-4">
        <div className="h-5 w-56 bg-white/10 rounded"></div>
        {[1, 2].map(card => (
          <div
            key={card}
            className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3"
          >
            <div className="h-4 w-48 bg-white/10 rounded"></div>
            <div className="h-3 w-full bg-white/10 rounded"></div>
            <div className="h-3 w-3/4 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>

      {/* Resume bullets */}
      <div className="glass-heavy border border-white/10 rounded-3xl p-8 space-y-4">
        <div className="h-5 w-64 bg-white/10 rounded"></div>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="h-16 bg-slate-900/60 border border-white/10 rounded-2xl"
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingSkeleton;
