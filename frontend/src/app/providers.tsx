'use client';
import ThemeMuiRegistry from '@/providers/ThemeMuiRegistry';

export function Providers({ children }: { children: React.ReactNode }) {

  return (
      <ThemeMuiRegistry options={{ key: 'mui' }}>
        {children}
      </ThemeMuiRegistry>
  )
}