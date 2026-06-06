"use client";

import React from "react";

interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  hint?: string;
}

export function Field({ label, value, onChange, multiline, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none transition"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition"
        />
      )}
    </div>
  );
}

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  icon?: string;
}

export function SectionCard({ title, children, icon }: SectionCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/3 backdrop-blur overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        {icon && <span className="text-base">{icon}</span>}
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="p-4 flex flex-col gap-4">{children}</div>
    </div>
  );
}

interface ListItemProps {
  index: number;
  onRemove: () => void;
  children: React.ReactNode;
  label?: string;
}

export function ListItem({ index, onRemove, children, label }: ListItemProps) {
  return (
    <div className="relative rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
          {label ?? `Item`} #{index + 1}
        </span>
        <button
          onClick={onRemove}
          className="text-xs text-red-400 hover:text-red-300 transition hover:bg-red-500/10 px-2 py-1 rounded"
        >
          🗑️ Remove
        </button>
      </div>
      {children}
    </div>
  );
}

interface AddButtonProps {
  label: string;
  onClick: () => void;
}

export function AddButton({ label, onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-cyan-500/40 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/5 py-2.5 text-sm font-medium transition"
    >
      <span className="text-lg leading-none">+</span>
      {label}
    </button>
  );
}
