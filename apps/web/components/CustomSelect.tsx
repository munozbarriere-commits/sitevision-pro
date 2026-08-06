"use client";

import React, { useState, useRef, useEffect } from 'react';

type Option = { value: string; label: string };

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '0.95rem 1rem',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.22)',
          background: 'linear-gradient(135deg, rgba(16,24,40,0.95), rgba(28,44,73,0.9))',
          color: 'var(--text)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 10px 25px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        }}
      >
        {selected ? selected.label : placeholder || 'Seleccionar'}
        <span style={{ float: 'right', opacity: 0.7 }}>{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          style={{
            position: 'absolute',
            zIndex: 60,
            left: 0,
            right: 0,
            marginTop: 8,
            maxHeight: 220,
            overflow: 'auto',
            listStyle: 'none',
            padding: '6px',
            borderRadius: 12,
            background: 'linear-gradient(180deg, rgba(12,18,32,0.98), rgba(20,30,58,0.98))',
            boxShadow: '0 8px 30px rgba(2,6,23,0.6)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
              tabIndex={0}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
                margin: '4px 0',
                background: opt.value === value ? 'rgba(37,99,235,0.15)' : 'transparent',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
