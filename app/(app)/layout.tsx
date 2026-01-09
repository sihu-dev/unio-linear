'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Bot,
  ChevronRight,
} from 'lucide-react';

const navigation = [
  { name: '대시보드', href: '/dashboard', icon: LayoutDashboard },
  { name: 'AI 분석', href: '/dashboard/ai', icon: Bot },
  { name: '입찰 목록', href: '/dashboard/bids', icon: FileText },
  { name: '설정', href: '/dashboard/settings', icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#08090A] flex">
      {/* Sidebar */}
      <aside
        className="w-64 flex flex-col fixed inset-y-0 left-0"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRight: '0.8px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#5E6AD2] flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span
              className="text-lg font-semibold text-white"
              style={{ letterSpacing: '-0.5px' }}
            >
              UNIO
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#5E6AD2]/10 text-[#5E6AD2]'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div
          className="p-4"
          style={{
            borderTop: '0.8px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
