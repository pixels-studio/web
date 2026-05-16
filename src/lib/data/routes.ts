export type NavLink = {
  label: string;
  href: string;
};

export const primaryLinks: NavLink[] = [
  { label: 'Work', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Information', href: '#information' },
  { label: 'Contact', href: '#contact' }
];

export const secondaryLinks: NavLink[] = [
  { label: 'Twitter', href: 'http://x.com/_abhiii' },
  { label: 'Email', href: 'mailto:abhi@pixels.studio' }
];
