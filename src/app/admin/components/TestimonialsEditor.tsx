"use client";

import { Field, SectionCard, ListItem, AddButton } from "./EditorField";

interface TestimonialItem {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

interface TestimonialsDict {
  tag: string;
  title_hl: string;
  title_sub: string;
  desc: string;
  items: TestimonialItem[];
}

interface Props {
  data: TestimonialsDict;
  onChange: (data: TestimonialsDict) => void;
}

export default function TestimonialsEditor({ data, onChange }: Props) {
  const set = (key: keyof TestimonialsDict) => (val: string) =>
    onChange({ ...data, [key]: val });

  const updateItem = (i: number, patch: Partial<TestimonialItem>) => {
    const items = data.items.map((t, idx) => idx === i ? { ...t, ...patch } : t);
    onChange({ ...data, items });
  };

  const addItem = () => {
    onChange({
      ...data,
      items: [...data.items, { content: "", author: "", role: "", avatar: "" }],
    });
  };

  const removeItem = (i: number) => {
    onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });
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

      <SectionCard title="Testimonials" icon="💬">
        {data.items.map((item, i) => (
          <ListItem key={i} index={i} label="Testimonial" onRemove={() => removeItem(i)}>
            <Field label="Quote / Content" value={item.content} onChange={(v) => updateItem(i, { content: v })} multiline />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Author name" value={item.author} onChange={(v) => updateItem(i, { author: v })} />
              <Field label="Author role / company" value={item.role} onChange={(v) => updateItem(i, { role: v })} />
            </div>
            <Field label="Avatar image path" value={item.avatar} onChange={(v) => updateItem(i, { avatar: v })} hint='Optional. Ví dụ: "/images/avatar.jpg"' />
          </ListItem>
        ))}
        <AddButton label="Add testimonial" onClick={addItem} />
      </SectionCard>
    </div>
  );
}
