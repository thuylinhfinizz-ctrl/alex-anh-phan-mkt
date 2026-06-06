"use client";

import { useState, useEffect, useCallback } from "react";
import HeroEditor from "./components/HeroEditor";
import ExperiencesEditor from "./components/ExperiencesEditor";
import ProjectsEditor from "./components/ProjectsEditor";
import SkillsEditor from "./components/SkillsEditor";
import TestimonialsEditor from "./components/TestimonialsEditor";
import FooterEditor from "./components/FooterEditor";
import SettingsEditor, { type SiteSettings } from "./components/SettingsEditor";

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
type Lang = "en" | "vi";
type Section = "hero" | "experiences" | "projects" | "skills" | "testimonials" | "footer" | "settings";

const SECTIONS: { id: Section; label: string; icon: string; divider?: boolean }[] = [
  { id: "hero", label: "Hero", icon: "🏠" },
  { id: "experiences", label: "Experiences", icon: "💼" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "testimonials", label: "Testimonials", icon: "💬" },
  { id: "footer", label: "Footer", icon: "🔻" },
  { id: "settings", label: "Settings", icon: "⚙️", divider: true },
];

// ─────────────────────────────────────────────────────────
// Login Gate
// ─────────────────────────────────────────────────────────
function LoginGate({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw.trim()) {
      onLogin(pw.trim());
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117]">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-2xl" />
      </div>

      <div
        className={`relative z-10 w-full max-w-sm mx-4 transition-transform duration-200 ${shake ? "animate-bounce" : ""}`}
      >
        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-2xl mb-1">
              🔐
            </div>
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-400 text-center">
              Nhập mật khẩu để chỉnh sửa nội dung portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Mật khẩu admin..."
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoFocus
              className="w-full rounded-xl bg-white/8 border border-white/15 px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition text-sm"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 py-3 text-sm font-semibold text-white transition active:scale-95"
            >
              Đăng nhập →
            </button>
          </form>

          <p className="text-center text-xs text-slate-600">
            Mật khẩu mặc định: <code className="text-slate-400">admin123</code>
            <br />
            Đổi trong file <code className="text-slate-400">.env.local</code>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Toast notification
// ─────────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "success" | "error" | "info" }) {
  const colors = {
    success: "bg-emerald-500/90",
    error: "bg-red-500/90",
    info: "bg-slate-700/90",
  };
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 ${colors[type]} backdrop-blur text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl border border-white/10 transition-all`}
    >
      <span>{type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
      {message}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main Dashboard
// ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [originalData, setOriginalData] = useState<Record<string, any> | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [originalSettings, setOriginalSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [authError, setAuthError] = useState(false);

  const isSettings = activeSection === "settings";

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Load content data
  const loadData = useCallback(async (targetLang: Lang) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms/read?lang=${targetLang}`);
      if (!res.ok) throw new Error("Load failed");
      const json = await res.json();
      setData(json);
      setOriginalData(json);
    } catch {
      showToast("Không tải được dữ liệu", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load settings
  const loadSettings = useCallback(async () => {
    try {
      const res = await fetch("/api/cms/settings/read");
      if (!res.ok) throw new Error("Settings load failed");
      const json = await res.json();
      setSettings(json);
      setOriginalSettings(json);
    } catch {
      showToast("Không tải được settings", "error");
    }
  }, []);

  useEffect(() => {
    if (password) {
      loadData(lang);
      loadSettings();
    }
  }, [password, lang, loadData, loadSettings]);

  const handleLogin = (pw: string) => {
    setPassword(pw);
    setAuthError(false);
  };

  const handleSave = async () => {
    if (isSettings) {
      // Save settings
      if (!settings || !password) return;
      setSaving(true);
      try {
        const res = await fetch("/api/cms/settings/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: settings, password }),
        });
        const json = await res.json();
        if (res.status === 401) { setAuthError(true); showToast("Mật khẩu không đúng!", "error"); return; }
        if (!res.ok || json.error) throw new Error(json.error);
        setOriginalSettings(settings);
        showToast("Settings đã lưu! GTM & GSC áp dụng ngay.", "success");
      } catch {
        showToast("Lưu settings thất bại.", "error");
      } finally {
        setSaving(false);
      }
      return;
    }

    // Save content
    if (!data || !password) return;
    setSaving(true);
    try {
      const res = await fetch("/api/cms/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, data, password }),
      });
      const json = await res.json();
      if (res.status === 401) {
        setAuthError(true);
        showToast("Mật khẩu không đúng!", "error");
        return;
      }
      if (!res.ok || json.error) throw new Error(json.error);
      setOriginalData(data);
      showToast("Đã lưu thành công! Portfolio cập nhật ngay.", "success");
    } catch {
      showToast("Lưu thất bại. Vui lòng thử lại.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (isSettings && originalSettings) {
      setSettings(originalSettings);
      showToast("Đã hoàn tác settings", "info");
      return;
    }
    if (originalData) {
      setData(originalData);
      showToast("Đã hoàn tác thay đổi", "info");
    }
  };

  const isDirty = isSettings
    ? JSON.stringify(settings) !== JSON.stringify(originalSettings)
    : JSON.stringify(data) !== JSON.stringify(originalData);

  // ── Not logged in
  if (!password) {
    return <LoginGate onLogin={handleLogin} />;
  }

  // ── Auth error
  if (authError) {
    return <LoginGate onLogin={(pw) => { setAuthError(false); setPassword(pw); }} />;
  }

  // ─────────────────────────────────────────────────────
  // Dashboard layout
  // ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-[#0f1117]">
      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 border-r border-white/8 bg-white/3 flex flex-col">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-base">
              ✏️
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Portfolio CMS</p>
              <p className="text-xs text-slate-500">Content Manager</p>
            </div>
          </div>
        </div>

        {/* Language toggle – hidden in settings */}
        {!isSettings && (
          <div className="px-4 py-4 border-b border-white/8">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ngôn ngữ</p>
            <div className="flex gap-2">
              {(["en", "vi"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    lang === l
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                      : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {l === "en" ? "🇺🇸 EN" : "🇻🇳 VI"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto">
          {SECTIONS.map((sec) => (
            <div key={sec.id}>
              {sec.divider && <div className="my-2 border-t border-white/8" />}
              <button
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition text-left ${
                  activeSection === sec.id
                    ? sec.id === "settings"
                      ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                      : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/6"
                }`}
              >
                <span className="text-base w-5 text-center">{sec.icon}</span>
                {sec.label}
              </button>
            </div>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-4 py-4 border-t border-white/8 flex flex-col gap-2">
          <a
            href="/en"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 py-2 text-xs text-slate-400 hover:text-white transition"
          >
            🔗 Preview Portfolio
          </a>
          <button
            onClick={() => { setPassword(null); setData(null); }}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 py-2 text-xs text-slate-400 hover:text-red-400 transition"
          >
            🚪 Đăng xuất
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[#0f1117]/90 backdrop-blur">
          <div>
            <h2 className="text-lg font-bold text-white capitalize">
              {SECTIONS.find((s) => s.id === activeSection)?.icon}{" "}
              {isSettings ? "SEO & Analytics Settings" : `${SECTIONS.find((s) => s.id === activeSection)?.label} Section`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isSettings
                ? "Cấu hình Google Tag Manager, Search Console và thông tin site"
                : <>
                    Chỉnh sửa nội dung và nhấn{" "}
                    <span className="text-cyan-400 font-semibold">Save Changes</span> để áp dụng
                  </>}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isDirty && (
              <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Chưa lưu
              </span>
            )}
            {isDirty && (
              <button
                onClick={handleDiscard}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-white/10 hover:bg-white/6 transition"
              >
                ↩ Hoàn tác
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving || !isDirty}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition ${
                isDirty
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white active:scale-95 shadow-lg shadow-cyan-500/25"
                  : "bg-white/8 text-slate-600 cursor-not-allowed"
              }`}
            >
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Đang lưu...
                </>
              ) : (
                <>💾 Save Changes</>
              )}
            </button>
          </div>
        </header>

        {/* Editor area */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <svg className="w-8 h-8 animate-spin text-cyan-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <p className="text-slate-500 text-sm">Đang tải dữ liệu...</p>
            </div>
          ) : isSettings && settings ? (
            <div className="max-w-3xl mx-auto">
              <SettingsEditor
                data={settings}
                onChange={setSettings}
              />
            </div>
          ) : data ? (
            <div className="max-w-3xl mx-auto">
              {activeSection === "hero" && (
                <HeroEditor
                  data={data.hero}
                  onChange={(heroData) => setData({ ...data, hero: heroData })}
                />
              )}
              {activeSection === "experiences" && (
                <ExperiencesEditor
                  data={data.experiences}
                  onChange={(expData) => setData({ ...data, experiences: expData })}
                />
              )}
              {activeSection === "projects" && (
                <ProjectsEditor
                  data={data.projects}
                  onChange={(projData) => setData({ ...data, projects: projData })}
                />
              )}
              {activeSection === "skills" && (
                <SkillsEditor
                  data={data.skills}
                  onChange={(skillsData) => setData({ ...data, skills: skillsData })}
                />
              )}
              {activeSection === "testimonials" && (
                <TestimonialsEditor
                  data={data.testimonials}
                  onChange={(testData) => setData({ ...data, testimonials: testData })}
                />
              )}
              {activeSection === "footer" && (
                <FooterEditor
                  data={data.footer}
                  onChange={(footerData) => setData({ ...data, footer: footerData })}
                />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-slate-500">Không có dữ liệu. Vui lòng thử lại.</p>
            </div>
          )}
        </main>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
