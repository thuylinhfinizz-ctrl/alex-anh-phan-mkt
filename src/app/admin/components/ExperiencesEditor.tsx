"use client";

import { Field, SectionCard, ListItem, AddButton } from "./EditorField";

interface Stat { value: string; label: string; }
interface Achievement { value: string; label: string; }
interface Company {
  id: string;
  name: string;
  logo: string;
  website: string;
  role: string;
  period: string;
  responsibilities: string[];
  achievements: Achievement[];
  skills: string[];
}

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface ExperiencesDict {
  tag: string;
  title_hl: string;
  title_sub: string;
  left_desc: string;
  stats: Stat[];
  download_cv: string;
  companies: Company[];
  brands: Brand[];
  marquee: string;
}

interface Props {
  data: ExperiencesDict;
  onChange: (data: ExperiencesDict) => void;
}

export default function ExperiencesEditor({ data, onChange }: Props) {
  const set = (key: keyof ExperiencesDict) => (val: string) =>
    onChange({ ...data, [key]: val });

  const updateBrand = (i: number, patch: Partial<Brand>) => {
    const brands = (data.brands || []).map((b, idx) => idx === i ? { ...b, ...patch } : b);
    onChange({ ...data, brands });
  };

  const addBrand = () => {
    onChange({
      ...data,
      brands: [
        ...(data.brands || []),
        { id: `b${Date.now()}`, name: "", logo: "" },
      ],
    });
  };

  const removeBrand = (i: number) => {
    onChange({ ...data, brands: (data.brands || []).filter((_, idx) => idx !== i) });
  };

  const updateStat = (i: number, field: keyof Stat, val: string) => {
    const stats = data.stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    onChange({ ...data, stats });
  };

  const updateCompany = (i: number, patch: Partial<Company>) => {
    const companies = data.companies.map((c, idx) => idx === i ? { ...c, ...patch } : c);
    onChange({ ...data, companies });
  };

  const updateResp = (ci: number, ri: number, val: string) => {
    const resp = data.companies[ci].responsibilities.map((r, idx) => idx === ri ? val : r);
    updateCompany(ci, { responsibilities: resp });
  };

  const addResp = (ci: number) => {
    updateCompany(ci, { responsibilities: [...data.companies[ci].responsibilities, ""] });
  };

  const removeResp = (ci: number, ri: number) => {
    updateCompany(ci, { responsibilities: data.companies[ci].responsibilities.filter((_, idx) => idx !== ri) });
  };

  const updateAchieve = (ci: number, ai: number, field: keyof Achievement, val: string) => {
    const achievements = data.companies[ci].achievements.map((a, idx) =>
      idx === ai ? { ...a, [field]: val } : a
    );
    updateCompany(ci, { achievements });
  };

  const addCompany = () => {
    onChange({
      ...data,
      companies: [
        ...data.companies,
        { id: `c${Date.now()}`, name: "", logo: "", website: "", role: "", period: "", responsibilities: [""], achievements: [], skills: [] },
      ],
    });
  };

  const removeCompany = (i: number) => {
    onChange({ ...data, companies: data.companies.filter((_, idx) => idx !== i) });
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Section Header" icon="🏷️">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Tag" value={data.tag} onChange={set("tag")} />
          <Field label="Title (highlighted)" value={data.title_hl} onChange={set("title_hl")} />
          <Field label="Title (sub)" value={data.title_sub} onChange={set("title_sub")} />
        </div>
        <Field label="Left description" value={data.left_desc} onChange={set("left_desc")} multiline />
        <Field label="Download CV button" value={data.download_cv} onChange={set("download_cv")} />
        <Field label="Marquee text" value={data.marquee} onChange={set("marquee")} />
      </SectionCard>

      <SectionCard title="Stats (4 numbers)" icon="📊">
        {data.stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Field label={`Stat ${i + 1} – Value`} value={stat.value} onChange={(v) => updateStat(i, "value", v)} />
            <Field label={`Stat ${i + 1} – Label`} value={stat.label} onChange={(v) => updateStat(i, "label", v)} />
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Brands & Consulting Clients (Marquee)" icon="🤝">
        {(data.brands || []).map((brand, bi) => (
          <ListItem key={brand.id} index={bi} label="Brand" onRemove={() => removeBrand(bi)}>
            {/* Logo preview + upload path */}
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                {brand.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 rounded-xl object-contain bg-white/8 border border-white/10 p-1"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-2xl">
                    🤝
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <Field
                  label="Brand Name"
                  value={brand.name}
                  onChange={(v) => updateBrand(bi, { name: v })}
                />
                <Field
                  label="Brand Logo URL"
                  value={brand.logo ?? ""}
                  onChange={(v) => updateBrand(bi, { logo: v })}
                  hint="Đường dẫn ảnh logo. Ví dụ: /images/logo.png hoặc https://... (để trống nếu chưa có)"
                />
              </div>
            </div>
          </ListItem>
        ))}
        <AddButton label="Add brand logo" onClick={addBrand} />
      </SectionCard>

      <SectionCard title="Companies / Work Experience" icon="🏢">
        {data.companies.map((company, ci) => (
          <ListItem key={company.id} index={ci} label="Company" onRemove={() => removeCompany(ci)}>
            {/* Logo preview + upload path */}
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                {company.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-16 h-16 rounded-xl object-contain bg-white/8 border border-white/10 p-1"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center text-2xl">
                    🏢
                  </div>
                )}
              </div>
              <div className="flex-1">
                <Field
                  label="Company Logo URL"
                  value={company.logo ?? ""}
                  onChange={(v) => updateCompany(ci, { logo: v })}
                  hint='Đường dẫn ảnh logo. Ví dụ: /images/rt-logo.png hoặc https://... (để trống nếu chưa có)'
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Company name" value={company.name} onChange={(v) => updateCompany(ci, { name: v })} />
              <Field label="Website URL" value={company.website} onChange={(v) => updateCompany(ci, { website: v })} />
              <Field label="Your role / title" value={company.role} onChange={(v) => updateCompany(ci, { role: v })} />
              <Field label="Period" value={company.period} onChange={(v) => updateCompany(ci, { period: v })} hint='Ví dụ: "2022 - Present"' />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Responsibilities</p>
              {company.responsibilities.map((resp, ri) => (
                <div key={ri} className="flex gap-2">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => updateResp(ci, ri, e.target.value)}
                    className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                  />
                  <button
                    onClick={() => removeResp(ci, ri)}
                    className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-500/10 transition"
                  >✕</button>
                </div>
              ))}
              <AddButton label="Add responsibility" onClick={() => addResp(ci)} />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Key Achievements</p>
              {company.achievements.map((ach, ai) => (
                <div key={ai} className="grid grid-cols-2 gap-2">
                  <Field label="Value" value={ach.value} onChange={(v) => updateAchieve(ci, ai, "value", v)} />
                  <Field label="Label" value={ach.label} onChange={(v) => updateAchieve(ci, ai, "label", v)} />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skills (comma-separated)</p>
              <input
                type="text"
                value={company.skills.join(", ")}
                onChange={(e) => updateCompany(ci, { skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                placeholder="e.g. Strategic Leadership, Data Analytics"
              />
            </div>
          </ListItem>
        ))}
        <AddButton label="Add company" onClick={addCompany} />
      </SectionCard>
    </div>
  );
}
