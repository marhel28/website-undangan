import { HandHeart, BookUser, MessageSquareText, ScrollText, Settings } from 'lucide-react';

type TDATA_MENU_USER = {
  title: string;
  path: string;
  svg?: React.ReactElement;
};

export const DATA_MENU_USER: TDATA_MENU_USER[] = [
  {
    title: 'Undangan',
    path: '/',
    svg: <ScrollText strokeWidth={1.5} />,
  },
  {
    title: 'Donasi',
    path: '/donation',
    svg: <HandHeart strokeWidth={1.5} />,
  },
  {
    title: 'Tamu',
    path: '/guest-book',
    svg: <BookUser strokeWidth={1.5} />,
  },
  {
    title: 'Ucapan',
    path: '/comments',
    svg: <MessageSquareText strokeWidth={1.5} />,
  },
  {
    title: 'Settings',
    path: '/settings',
    svg: <Settings strokeWidth={1.5} />,
  },
];
