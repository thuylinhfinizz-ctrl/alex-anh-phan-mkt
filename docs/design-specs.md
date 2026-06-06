# Design Specifications: Portfolio Alex Anh Phan

## 🎨 Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| Primary Cyan | #06b6d4 | Buttons, highlights, text accents, borders |
| Primary Glow | #0ea5e9 | Hover states, neon glow effects |
| Black BG | #09090b | Background for Hero & Contact sections |
| White BG | #ffffff | Main background for About, Skills, Projects, References |
| Surface Light| #f8fafc | Cards and UI elements on White BG |
| Surface Dark | #18181b | Cards and inputs on Black BG |
| Text Primary (Light) | #f8fafc | Text on Black BG |
| Text Primary (Dark) | #0f172a | Text on White BG |
| Text Muted | #64748b | Subtitles, descriptions |

## 📝 Typography
| Element | Size (Mobile/Desktop) | Weight | Line Height |
|---------|-----------------------|--------|-------------|
| H1 (Hero) | 40px / 64px | 800 (Bold) | 1.1 |
| H2 (Section Title) | 28px / 40px | 700 (Bold) | 1.2 |
| H3 (Card Title) | 20px / 24px | 600 (Semibold)| 1.3 |
| Body | 16px / 18px | 400 (Regular)| 1.6 |
| Small | 14px / 14px | 400 (Regular)| 1.5 |

## 📐 Spacing & Layout
| Name | Value | Usage |
|------|-------|-------|
| Section Padding | 80px / 120px | Top & Bottom spacing for each section |
| Container Max | 1200px | Max width for content |
| Element Gap | 16px / 24px | Gap between cards, flex items |

## 🔲 Border Radius (Shadcn UI)
| Element | Value |
|---------|-------|
| Buttons | 9999px (Pill/Rounded full) or 8px (Rounded-md) |
| Cards | 16px (Rounded-2xl) |
| Inputs/Textarea | 8px (Rounded-md) |

## ✨ Animations (Framer Motion)
- **Hero/Contact (Dark Mode):** Subtle neon glow pulsing, text fade-in from bottom.
- **Projects/Skills (Light Mode):** Cards slide up on scroll, hover to elevate (translateY -4px) with subtle cyan border highlight.
- **Transitions:** Smooth background color transition between sections (Black -> White -> Black).
