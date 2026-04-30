# Chat Launcher

A premium, customizable floating chat launcher for Next.js/React applications. Support for WhatsApp and Facebook Messenger out of the box.

## Features

- 🚀 **Built for Next.js**: Seamless integration with Next.js navigation and images.
- 🎨 **Fully Customizable**: Control colors, branding, and chat options via props.
- 📱 **Responsive**: Beautifully designed for both mobile and desktop.
- ⚡ **Lightweight**: Optimized animations with Framer Motion.
- 🔒 **Privacy Aware**: Automatically hides on specific routes (e.g., PDF capture pages).

## Installation

```bash
bun i chat-launcher
# or
npm install chat-launcher
```

## Integration

### 1. Style Setup

Choose the setup method that matches your project's technology stack:

#### For Tailwind CSS Projects
Add the package to your `tailwind.config.js` or `tailwind.config.ts`. This allows your project's Tailwind engine to scan the launcher components and include the necessary styles in your main CSS bundle:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Add the chat-launcher distribution path
    './node_modules/chat-launcher/dist/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}
export default config
```

#### For Non-Tailwind Projects
Import the pre-built CSS file at the root of your application (e.g., in `layout.tsx` or `_app.tsx`):

```tsx
import 'chat-launcher/dist/index.css';
```

## Implementation

### 1. Global Configuration (Optional)
You can set up global defaults using the `ChatLauncherProvider`. This is recommended for monorepos or multi-page applications.

```tsx
// layout.tsx or _app.tsx
import { ChatLauncherProvider } from 'chat-launcher';

const globalConfig = {
  brandName: "Haqqman Studio",
  primaryColor: "#0f172a",
  whatsappNumber: "2348000000000"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ChatLauncherProvider config={globalConfig}>
          {children}
        </ChatLauncherProvider>
      </body>
    </html>
  );
}
```

### 2. Local Usage
Place the component anywhere in your app. It will inherit global settings but can be overridden locally.

```tsx
import { ChatLauncher } from 'chat-launcher';

function Page() {
  return (
    <ChatLauncher 
      brandSubtitle="Direct support for this page"
      primaryColor="#ef4444" // Overrides global primaryColor
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `whatsappNumber` | `string` | `'2348060088104'` | International format WhatsApp number. |
| `messengerUsername` | `string` | `'haqqmanhq'` | Facebook Messenger username. |
| `logoUrl` | `string` | `Haqqman Logo` | URL for the header logo. |
| `brandName` | `string` | `'Agency by Haqqman'` | Title displayed in the header. |
| `brandSubtitle` | `string` | `'Chat with us...'` | Subtitle displayed in the header. |
| `showHaqqmanBranding` | `boolean` | `true` | Show or hide "by Haqqman" in the footer. |
| `primaryColor` | `string` | `'#1C2742'` | Used for header and label text. |
| `secondaryColor` | `string` | `'#79C142'` | Used for the FAB and Messenger button. |
| `accentColor` | `string` | `'#9ccc48'` | Used for input focus rings. |
| `options` | `ChatOption[]` | `OPTIONS` | Array of `{ label, value }` for the inquiry dropdown. |


## License

MIT © [Haqqman](https://haqqman.com)
