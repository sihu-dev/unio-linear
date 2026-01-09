'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError('로그인 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090A] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-semibold text-white" style={{ letterSpacing: '-0.5px' }}>
              UNIO
            </h1>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">협동로봇 AI 플랫폼</p>
        </div>

        {/* Card */}
        <div
          className="p-8 rounded-xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '0.8px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <h2
            className="text-xl font-semibold text-white mb-6"
            style={{ letterSpacing: '-0.3px' }}
          >
            로그인
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">이메일</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@company.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]/50 transition-all"
                  style={{
                    border: '0.8px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]/50 transition-all"
                  style={{
                    border: '0.8px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#5E6AD2] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#4F5BC3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ letterSpacing: '-0.13px' }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  로그인
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            계정이 없으신가요?{' '}
            <Link href="/auth/register" className="text-[#5E6AD2] hover:underline">
              회원가입
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-500">
          로그인하면 UNIO의{' '}
          <Link href="#" className="underline">
            서비스 약관
          </Link>
          에 동의하게 됩니다.
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090A] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#5E6AD2]/30 border-t-[#5E6AD2] rounded-full animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
