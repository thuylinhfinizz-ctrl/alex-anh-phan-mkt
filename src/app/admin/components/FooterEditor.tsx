"use client";

import { Field, SectionCard } from "./EditorField";

interface Socials {
  linkedin: string;
  github: string;
  email: string;
}

interface FooterDict {
  title_hl: string;
  title_sub: string;
  desc: string;
  cta: string;
  copyright: string;
  socials: Socials;
}

interface Props {
  data: FooterDict;
  onChange: (data: FooterDict) => void;
}

export default function FooterEditor({ data, onChange }: Props) {
  const set = (key: keyof FooterDict) => (val: string) =>
    onChange({ ...data, [key]: val });

  const setSocial = (key: keyof Socials) => (val: string) =>
    onChange({ ...data, socials: { ...data.socials, [key]: val } });

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Footer Content" icon="🔻">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Title (highlighted)" value={data.title_hl} onChange={set("title_hl")} />
          <Field label="Title (sub)" value={data.title_sub} onChange={set("title_sub")} />
        </div>
        <Field label="Description" value={data.desc} onChange={set("desc")} multiline />
        <Field label="CTA Button text" value={data.cta} onChange={set("cta")} />
        <Field label="Copyright text" value={data.copyright} onChange={set("copyright")} />
      </SectionCard>

      <SectionCard title="Social Links Labels" icon="🔗">
        <p className="text-xs text-slate-500">Đây là label hiển thị, không phải URL. Thay đổi URL trong code component Footer.tsx nếu cần.</p>
        <div className="grid grid-cols-3 gap-3">
          <Field label="LinkedIn label" value={data.socials.linkedin} onChange={setSocial("linkedin")} />
          <Field label="GitHub label" value={data.socials.github} onChange={setSocial("github")} />
          <Field label="Email label" value={data.socials.email} onChange={setSocial("email")} />
        </div>
      </SectionCard>
    </div>
  );
}
