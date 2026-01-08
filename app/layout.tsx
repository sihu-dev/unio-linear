import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { GitHubIcon } from '@/components/icons/social/github-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { YouTubeIcon } from '@/components/icons/social/youtube-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'UNIO - Pool SI 스마트공장 AI 플랫폼',
  description:
    '52세 김 대표도 10분 만에 AI 공장을 갖습니다. OTT칩 50만원으로 시작하는 스마트공장. 1,932개 공장이 AI를 기다립니다.',
  keywords: ['스마트공장', 'AI', 'Pool SI', 'OTT칩', '제조업', 'MES', '자동화'],
  authors: [{ name: 'UNILAB' }],
  openGraph: {
    title: 'UNIO - Pool SI 스마트공장 AI 플랫폼',
    description: '52세 김 대표도 10분 만에 AI 공장을 갖습니다.',
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <>
          <NavbarWithLinksActionsAndCenteredLogo
            id="navbar"
            links={
              <>
                <NavbarLink href="/pricing">요금제</NavbarLink>
                <NavbarLink href="/about">회사소개</NavbarLink>
                <NavbarLink href="/dashboard">대시보드</NavbarLink>
                <NavbarLink href="/analyze-bid" className="sm:hidden">
                  입찰분석
                </NavbarLink>
              </>
            }
            logo={
              <NavbarLogo href="/">
                <span className="text-xl font-bold tracking-tight text-olive-950 dark:text-white">UNIO</span>
              </NavbarLogo>
            }
            actions={
              <>
                <PlainButtonLink href="/analyze-bid" className="max-sm:hidden">
                  입찰분석
                </PlainButtonLink>
                <ButtonLink href="/analyze-bid">무료 체험</ButtonLink>
              </>
            }
          />

          <Main>{children}</Main>

          <FooterWithNewsletterFormCategoriesAndSocialIcons
            id="footer"
            cta={
              <NewsletterForm
                headline="UNIO 소식 받기"
                subheadline={
                  <p>
                    스마트공장 트렌드, 신제품 소식, 고객 성공 사례를 이메일로 받아보세요.
                  </p>
                }
                action="#"
              />
            }
            links={
              <>
                <FooterCategory title="제품">
                  <FooterLink href="/#features">기능 소개</FooterLink>
                  <FooterLink href="/pricing">요금제</FooterLink>
                  <FooterLink href="/analyze-bid">입찰분석 AI</FooterLink>
                </FooterCategory>
                <FooterCategory title="회사">
                  <FooterLink href="/about">회사소개</FooterLink>
                  <FooterLink href="#">채용</FooterLink>
                  <FooterLink href="#">블로그</FooterLink>
                </FooterCategory>
                <FooterCategory title="지원">
                  <FooterLink href="#">고객센터</FooterLink>
                  <FooterLink href="#">API 문서</FooterLink>
                  <FooterLink href="#">문의하기</FooterLink>
                </FooterCategory>
                <FooterCategory title="법적고지">
                  <FooterLink href="/privacy-policy">개인정보처리방침</FooterLink>
                  <FooterLink href="#">이용약관</FooterLink>
                  <FooterLink href="#">보안정책</FooterLink>
                </FooterCategory>
              </>
            }
            fineprint="© 2025 UNILAB / 레인피플. All rights reserved."
            socialLinks={
              <>
                <SocialLink href="https://x.com" name="X">
                  <XIcon />
                </SocialLink>
                <SocialLink href="https://github.com/sihu-dev/unio-linear" name="GitHub">
                  <GitHubIcon />
                </SocialLink>
                <SocialLink href="https://www.youtube.com" name="YouTube">
                  <YouTubeIcon />
                </SocialLink>
              </>
            }
          />
        </>
      </body>
    </html>
  )
}
