"use client";

import { Field, SectionCard, ListItem, AddButton } from "./EditorField";

interface Metric { value: string; label: string; }
interface TopStat { value: string; label: string; }
interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image?: string;
  short_desc?: string;
  desc: string;
  metrics: Metric[];
  link_text: string;
}

interface ProjectsDict {
  tag: string;
  title_hl: string;
  title_sub: string;
  desc: string;
  top_stats: TopStat[];
  filters: string[];
  items: ProjectItem[];
  show_more: string;
  more_desc: string;
}

interface Props {
  data: ProjectsDict;
  onChange: (data: ProjectsDict) => void;
}

export default function ProjectsEditor({ data, onChange }: Props) {
  const set = (key: keyof ProjectsDict) => (val: string) =>
    onChange({ ...data, [key]: val });

  const updateStat = (i: number, field: keyof TopStat, val: string) => {
    const top_stats = data.top_stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
    onChange({ ...data, top_stats });
  };

  const updateProject = (i: number, patch: Partial<ProjectItem>) => {
    const items = data.items.map((p, idx) => idx === i ? { ...p, ...patch } : p);
    onChange({ ...data, items });
  };

  const updateMetric = (pi: number, mi: number, field: keyof Metric, val: string) => {
    const metrics = data.items[pi].metrics.map((m, idx) => idx === mi ? { ...m, [field]: val } : m);
    updateProject(pi, { metrics });
  };

  const addProject = () => {
    onChange({
      ...data,
      items: [
        ...data.items,
        { id: `p${Date.now()}`, title: "", category: data.filters[1] ?? "", image: "", short_desc: "", desc: "", metrics: [], link_text: "View Case Study" },
      ],
    });
  };

  const removeProject = (i: number) => {
    onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });
  };

  const addMetric = (pi: number) => {
    updateProject(pi, { metrics: [...data.items[pi].metrics, { value: "", label: "" }] });
  };

  const removeMetric = (pi: number, mi: number) => {
    updateProject(pi, { metrics: data.items[pi].metrics.filter((_, idx) => idx !== mi) });
  };

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Section Header" icon="🏷️">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Tag" value={data.tag} onChange={set("tag")} />
          <Field label="Title (highlighted)" value={data.title_hl} onChange={set("title_hl")} />
          <Field label="Title (sub)" value={data.title_sub} onChange={set("title_sub")} />
        </div>
        <Field label="Description" value={data.desc} onChange={set("desc")} multiline />
        <Field label="Show More button" value={data.show_more} onChange={set("show_more")} />
        <Field label="Show More description" value={data.more_desc} onChange={set("more_desc")} />
      </SectionCard>

      <SectionCard title="Top Stats (4 numbers)" icon="📊">
        {data.top_stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Field label={`Stat ${i + 1} – Value`} value={stat.value} onChange={(v) => updateStat(i, "value", v)} />
            <Field label={`Stat ${i + 1} – Label`} value={stat.label} onChange={(v) => updateStat(i, "label", v)} />
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Filter Categories" icon="🔖">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-slate-500">Các tab lọc dự án (phân cách bằng dấu phẩy)</p>
          <input
            type="text"
            value={data.filters.join(", ")}
            onChange={(e) => onChange({ ...data, filters: e.target.value.split(",").map((f) => f.trim()).filter(Boolean) })}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
          />
        </div>
      </SectionCard>

      <SectionCard title="Projects" icon="💼">
        {data.items.map((proj, pi) => (
          <ListItem key={proj.id} index={pi} label="Project" onRemove={() => removeProject(pi)}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Project title" value={proj.title} onChange={(v) => updateProject(pi, { title: v })} />
              <Field label="Category" value={proj.category} onChange={(v) => updateProject(pi, { category: v })} hint="Phải khớp với filter bên trên" />
            </div>
            <Field label="Short Description (Home page)" value={proj.short_desc ?? ""} onChange={(v) => updateProject(pi, { short_desc: v })} multiline hint="Mô tả ngắn hiển thị trên thẻ dự án ngoài trang chủ." />
            <Field label="Full Description (Popup detail)" value={proj.desc} onChange={(v) => updateProject(pi, { desc: v })} multiline hint="Mô tả chi tiết hiển thị khi click vào xem dự án." />
            <Field label="Image path" value={proj.image ?? ""} onChange={(v) => updateProject(pi, { image: v })} hint='Ví dụ: "/images/project.png"' />
            <Field label="CTA Link text" value={proj.link_text} onChange={(v) => updateProject(pi, { link_text: v })} />

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Metrics</p>
              {proj.metrics.map((metric, mi) => (
                <div key={mi} className="flex gap-2 items-end">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <Field label="Value" value={metric.value} onChange={(v) => updateMetric(pi, mi, "value", v)} />
                    <Field label="Label" value={metric.label} onChange={(v) => updateMetric(pi, mi, "label", v)} />
                  </div>
                  <button
                    onClick={() => removeMetric(pi, mi)}
                    className="text-xs text-red-400 hover:text-red-300 px-2 py-2 rounded hover:bg-red-500/10 transition mb-0.5"
                  >✕</button>
                </div>
              ))}
              <AddButton label="Add metric" onClick={() => addMetric(pi)} />
            </div>
          </ListItem>
        ))}
        <AddButton label="Add project" onClick={addProject} />
      </SectionCard>
    </div>
  );
}
