export const TopNav = ({ activeTab, onChange, isAdmin }) => {
  const tabs = [
    { id: "overview", label: "⬡ AQI Dashboard" },
    { id: "map", label: "🗺 Ward Map" },
    { id: "analytics", label: "📊 Analytics" },
    { id: "reports", label: "🚨 Reports" },
    { id: "advisories", label: "📢 Advisories" },
    { id: "public", label: "🌐 Public Feed" }
  ];

  if (isAdmin) {
    tabs.push({ id: "users", label: "👥 Users" });
  }

  return (
    <nav className="top-nav" id="main-navigation">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={activeTab === t.id ? "active" : ""}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
};
