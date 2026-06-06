"use client";

import { SectionCard, Field } from "./EditorField";

export interface SiteSettings {
  google_tag_manager: string;
  google_search_console: string;
  site_url: string;
}

interface Props {
  data: SiteSettings;
  onChange: (data: SiteSettings) => void;
}

export default function SettingsEditor({ data, onChange }: Props) {
  const set = (key: keyof SiteSettings) => (val: string) =>
    onChange({ ...data, [key]: val });

  return (
    <div className="flex flex-col gap-5">
      {/* Google Tag Manager */}
      <SectionCard title="Google Tag Manager" icon="📊">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3 rounded-lg bg-blue-500/8 border border-blue-500/20 px-4 py-3">
            <span className="text-lg mt-0.5">ℹ️</span>
            <div className="text-xs text-slate-400 leading-relaxed">
              <p className="font-semibold text-blue-300 mb-1">Cách lấy GTM ID:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                <li>Vào <span className="text-white">tagmanager.google.com</span></li>
                <li>Tạo account và container mới (loại Web)</li>
                <li>Copy ID có dạng <code className="bg-white/10 px-1 rounded text-cyan-300">GTM-XXXXXXX</code></li>
                <li>Paste vào ô bên dưới</li>
              </ol>
            </div>
          </div>

          <Field
            label="GTM Container ID"
            value={data.google_tag_manager}
            onChange={set("google_tag_manager")}
            hint='Ví dụ: GTM-ABC1234 (để trống nếu chưa có)'
          />

          {data.google_tag_manager && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
              <span>✅</span>
              GTM <strong>{data.google_tag_manager}</strong> sẽ được nhúng vào toàn bộ portfolio
            </div>
          )}
        </div>
      </SectionCard>

      {/* Google Search Console */}
      <SectionCard title="Google Search Console" icon="🔍">
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3 rounded-lg bg-yellow-500/8 border border-yellow-500/20 px-4 py-3">
            <span className="text-lg mt-0.5">ℹ️</span>
            <div className="text-xs text-slate-400 leading-relaxed">
              <p className="font-semibold text-yellow-300 mb-1">Cách lấy mã xác minh:</p>
              <ol className="list-decimal list-inside space-y-0.5">
                <li>Vào <span className="text-white">search.google.com/search-console</span></li>
                <li>Add property → URL prefix → nhập URL portfolio</li>
                <li>Chọn phương thức <strong className="text-white">"HTML tag"</strong></li>
                <li>
                  Copy phần <code className="bg-white/10 px-1 rounded text-cyan-300">content="..."</code> (chỉ lấy giá trị trong ngoặc kép)
                </li>
              </ol>
            </div>
          </div>

          <Field
            label="Verification Code"
            value={data.google_search_console}
            onChange={set("google_search_console")}
            hint='Chỉ dán giá trị content, không cần cả thẻ <meta>. Ví dụ: abc123XYZ...'
          />

          {data.google_search_console && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
              <span>✅</span>
              Mã GSC đã được cấu hình – deploy lên Vercel và nhấn Verify trên Google
            </div>
          )}
        </div>
      </SectionCard>

      {/* Site URL */}
      <SectionCard title="Site URL" icon="🌐">
        <Field
          label="Domain chính của website"
          value={data.site_url}
          onChange={set("site_url")}
          hint='URL đầy đủ bao gồm https://. Dùng để tạo sitemap và OpenGraph.'
        />
      </SectionCard>

      {/* Status summary */}
      <div className="rounded-xl border border-white/8 bg-white/3 p-4 flex flex-col gap-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Trạng thái tích hợp</p>
        <StatusRow
          label="Google Tag Manager"
          value={data.google_tag_manager}
          placeholder="Chưa cấu hình"
        />
        <StatusRow
          label="Google Search Console"
          value={data.google_search_console ? `${data.google_search_console.slice(0, 12)}...` : ""}
          placeholder="Chưa cấu hình"
        />
        <StatusRow
          label="Site URL"
          value={data.site_url}
          placeholder="Chưa đặt"
        />
      </div>
    </div>
  );
}

function StatusRow({ label, value, placeholder }: { label: string; value: string; placeholder: string }) {
  const active = Boolean(value);
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`text-xs font-medium flex items-center gap-1.5 ${active ? "text-emerald-400" : "text-slate-600"}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-400" : "bg-slate-700"}`} />
        {active ? value : placeholder}
      </span>
    </div>
  );
}
