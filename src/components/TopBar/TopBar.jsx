import './TopBar.css';

export default function TopBar({ role, roleOptions, onRoleChange, theme, onThemeToggle }) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar-eyebrow">Finance Monitor</p>
        <h1 className="topbar-title">Personal Finance Dashboard</h1>
        <p className="topbar-subtitle">Track your money, review transactions, and spot spending signals.</p>
      </div>

      <div className="topbar-actions">
        <button type="button" className="topbar-theme-btn" onClick={onThemeToggle}>
          {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
        </button>

        <label className="topbar-role-switcher" htmlFor="role">
          <span>Role</span>
          <select id="role" value={role} onChange={(e) => onRoleChange(e.target.value)}>
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}
