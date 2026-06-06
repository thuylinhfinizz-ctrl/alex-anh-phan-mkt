"use client";

import { Field, SectionCard } from "./EditorField";

interface HeroDict {
  greeting: string;
  name1: string;
  name2: string;
  left_desc: string;
  cta_projects: string;
  right_subtitle: string;
  right_title_hl: string;
  right_title_sub: string;
  right_desc: string;
  cta_video: string;
  scroll_down: string;
}

interface Props {
  data: HeroDict;
  onChange: (data: HeroDict) => void;
}

export default function HeroEditor({ data, onChange }: Props) {
  const set = (key: keyof HeroDict) => (val: string) =>
    onChange({ ...data, [key]: val });

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Identity" icon="👤">
        <Field label="Greeting text" value={data.greeting} onChange={set("greeting")} hint='Ví dụ: "Hello, I am"' />
        <div className="grid grid-cols-2 gap-3">
          <Field label="First Name" value={data.name1} onChange={set("name1")} />
          <Field label="Last Name" value={data.name2} onChange={set("name2")} />
        </div>
      </SectionCard>

      <SectionCard title="Left Column" icon="◀️">
        <Field label="Description" value={data.left_desc} onChange={set("left_desc")} multiline />
        <Field label="CTA Button – Projects" value={data.cta_projects} onChange={set("cta_projects")} />
      </SectionCard>

      <SectionCard title="Right Column" icon="▶️">
        <Field label="Subtitle" value={data.right_subtitle} onChange={set("right_subtitle")} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title (highlighted)" value={data.right_title_hl} onChange={set("right_title_hl")} />
          <Field label="Title (sub)" value={data.right_title_sub} onChange={set("right_title_sub")} />
        </div>
        <Field label="Description" value={data.right_desc} onChange={set("right_desc")} multiline />
        <Field label="CTA Button – Video" value={data.cta_video} onChange={set("cta_video")} />
      </SectionCard>

      <SectionCard title="Scroll indicator" icon="⬇️">
        <Field label="Scroll text" value={data.scroll_down} onChange={set("scroll_down")} />
      </SectionCard>
    </div>
  );
}
