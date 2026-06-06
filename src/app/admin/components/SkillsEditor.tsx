"use client";

import { Field, SectionCard, ListItem, AddButton } from "./EditorField";

interface ToolItem {
  name: string;
  logo: string;
}

interface SkillGroup {
  id: string;
  name: string;
  short_desc: string;
  tools: (string | ToolItem)[];
  core_desc: string;
  what_i_do: string[];
}

interface SkillsDict {
  tag: string;
  title_hl: string;
  title_sub: string;
  desc: string;
  groups: SkillGroup[];
}

interface Props {
  data: SkillsDict;
  onChange: (data: SkillsDict) => void;
}

export default function SkillsEditor({ data, onChange }: Props) {
  const set = (key: keyof SkillsDict) => (val: string) =>
    onChange({ ...data, [key]: val });

  const updateGroup = (i: number, patch: Partial<SkillGroup>) => {
    const groups = data.groups.map((g, idx) => idx === i ? { ...g, ...patch } : g);
    onChange({ ...data, groups });
  };

  const updateWhatIDo = (gi: number, wi: number, val: string) => {
    const what_i_do = data.groups[gi].what_i_do.map((w, idx) => idx === wi ? val : w);
    updateGroup(gi, { what_i_do });
  };

  const addGroup = () => {
    onChange({
      ...data,
      groups: [...data.groups, {
        id: `s${Date.now()}`, name: "", short_desc: "", tools: [],
        core_desc: "", what_i_do: [""],
      }],
    });
  };

  const removeGroup = (i: number) => {
    onChange({ ...data, groups: data.groups.filter((_, idx) => idx !== i) });
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
      </SectionCard>

      <SectionCard title="Skill Groups" icon="⚡">
        {data.groups.map((group, gi) => (
          <ListItem key={group.id} index={gi} label="Skill Group" onRemove={() => removeGroup(gi)}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Group name" value={group.name} onChange={(v) => updateGroup(gi, { name: v })} />
              <Field label="Short description" value={group.short_desc} onChange={(v) => updateGroup(gi, { short_desc: v })} />
            </div>
            <Field label="Core description (full)" value={group.core_desc} onChange={(v) => updateGroup(gi, { core_desc: v })} multiline />

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tools & Logos</p>
              {(group.tools || []).map((tool, ti) => {
                const toolName = typeof tool === "string" ? tool : (tool.name || "");
                const toolLogo = typeof tool === "string" ? "" : (tool.logo || "");
                return (
                  <div key={ti} className="flex gap-2 items-end">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Field 
                        label="Tool name" 
                        value={toolName} 
                        onChange={(v) => {
                          const newTools = [...group.tools];
                          newTools[ti] = { name: v, logo: toolLogo };
                          updateGroup(gi, { tools: newTools });
                        }} 
                      />
                      <Field 
                        label="Logo path (e.g. /images/logo.png)" 
                        value={toolLogo} 
                        onChange={(v) => {
                          const newTools = [...group.tools];
                          newTools[ti] = { name: toolName, logo: v };
                          updateGroup(gi, { tools: newTools });
                        }} 
                      />
                    </div>
                    <button
                      onClick={() => {
                        const newTools = group.tools.filter((_, idx) => idx !== ti);
                        updateGroup(gi, { tools: newTools });
                      }}
                      className="text-xs text-red-400 hover:text-red-300 px-2 py-2 rounded hover:bg-red-500/10 transition mb-0.5"
                    >✕</button>
                  </div>
                );
              })}
              <AddButton 
                label="Add tool" 
                onClick={() => {
                  updateGroup(gi, { tools: [...(group.tools || []), { name: "", logo: "" }] });
                }} 
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">What I Do (list items)</p>
              {group.what_i_do.map((item, wi) => (
                <div key={wi} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateWhatIDo(gi, wi, e.target.value)}
                    className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
                  />
                  <button
                    onClick={() => {
                      const what_i_do = group.what_i_do.filter((_, idx) => idx !== wi);
                      updateGroup(gi, { what_i_do });
                    }}
                    className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-500/10 transition"
                  >✕</button>
                </div>
              ))}
              <AddButton label="Add item" onClick={() => updateGroup(gi, { what_i_do: [...group.what_i_do, ""] })} />
            </div>
          </ListItem>
        ))}
        <AddButton label="Add skill group" onClick={addGroup} />
      </SectionCard>
    </div>
  );
}
