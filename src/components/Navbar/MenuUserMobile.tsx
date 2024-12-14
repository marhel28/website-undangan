'use client';
import Link from 'next/link';
import { DATA_MENU_USER } from './DATA_MENU_USER';
import { usePathname } from 'next/navigation';

export default function MenuUserMobile() {
  const pathname = usePathname();
  const pathWithBaseUrlName = process.env.NEXT_PUBLIC_BASE_URL + pathname;

  const isAffiliate = true;

  const classActive = 'text-[var(--primary-color)] font-medium';

  // Path yang akan menyembunyikan nav
  const hiddenPaths = [ '/success-payment', '/invitation-client'];

  // Cek apakah pathname ada di dalam DATA_MENU_USER path
  const shouldDisplayNav = DATA_MENU_USER.some((menu) => pathname === menu.path || pathWithBaseUrlName === menu.path);

  return (
    <nav className={`${hiddenPaths.includes(pathname) || !shouldDisplayNav ? 'hidden' : 'block'} fixed bottom-0 w-full md:w-[500px] z-50`}>
      <ul className="flex flex-row justify-evenly bg-white border-t py-4 w-screen md:w-[500px] rounded-t-3xl container mx-auto">
        {/* menu user  */}
        {DATA_MENU_USER.map((menu, idx) =>
          // Exclude the first element if isAffiliate is false and the index is 1
          !isAffiliate && idx === 1 ? null : (
            <li key={idx} className="px-3 text-gray-600">
              <Link href={menu.path} className={`${pathname === menu.path || pathWithBaseUrlName === menu.path ? classActive : ''} flex flex-col justify-center items-center`}>
                {menu.svg}
                <span className="text-xs mt-0.5 ">{menu.title}</span>
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
