import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimpleCentered } from '@/components/sections/call-to-action-simple-centered'
import { FAQsAccordion, Faq } from '@/components/sections/faqs-accordion'
import { PlanComparisonTable } from '@/components/sections/plan-comparison-table'
import { Plan, PricingHeroMultiTier } from '@/components/sections/pricing-hero-multi-tier'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '요금제 - UNIO',
  description: 'UNIO 스마트공장 AI 플랫폼 요금제. OTT칩 50만원부터 시작하는 합리적인 가격.',
  openGraph: {
    title: '요금제 - UNIO',
    description: 'UNIO 스마트공장 AI 플랫폼 요금제.',
  },
}

function plans(option: string) {
  return (
    <>
      <Plan
        name="스타터"
        price={option === '월간' ? '₩50만' : '₩500만'}
        period={option === '월간' ? '/월' : '/년'}
        subheadline={<p>OTT칩으로 시작하는 첫 스마트공장</p>}
        features={[
          'OTT칩 1개 포함',
          '입찰 공고 AI 분석 (월 10건)',
          '견적서 자동 생성',
          '기본 대시보드',
          '이메일 지원',
        ]}
        cta={
          <SoftButtonLink href="/analyze-bid" size="lg">
            무료 체험
          </SoftButtonLink>
        }
      />
      <Plan
        name="프로"
        price={option === '월간' ? '₩200만' : '₩2,000만'}
        period={option === '월간' ? '/월' : '/년'}
        subheadline={<p>성장하는 Pool SI 협력업체를 위한 플랜</p>}
        badge="인기"
        features={[
          '스타터 기능 전체 포함',
          'OTT칩 5개 포함',
          '입찰 분석 무제한',
          'AI 설비 모니터링',
          '예측 정비 알림',
          '실시간 대시보드',
          '카카오톡 알림 연동',
        ]}
        cta={
          <ButtonLink href="/analyze-bid" size="lg">
            무료 체험
          </ButtonLink>
        }
      />
      <Plan
        name="엔터프라이즈"
        price="문의"
        period=""
        subheadline={<p>대규모 Pool SI 운영을 위한 맞춤 솔루션</p>}
        features={[
          '프로 기능 전체 포함',
          'OTT칩 무제한',
          '전용 AI 모델 학습',
          'API 연동',
          'SLA 99.9% 보장',
          'SSO/SAML 지원',
          '전담 기술 매니저',
        ]}
        cta={
          <SoftButtonLink href="/analyze-bid" size="lg">
            문의하기
          </SoftButtonLink>
        }
      />
    </>
  )
}

export default function Page() {
  return (
    <>
      {/* Hero */}
      <PricingHeroMultiTier
        id="pricing"
        headline="요금제"
        subheadline={
          <p>
            OTT칩 50만원으로 시작하는 스마트공장.
            Pool SI 협력업체 규모에 맞는 합리적인 요금제를 선택하세요.
          </p>
        }
        options={['월간', '연간']}
        plans={{ '월간': plans('월간'), '연간': plans('연간') }}
        footer={
          <LogoGrid>
            <Logo>
              <Image
                src="/img/logos/9-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={51}
                height={32}
              />
              <Image
                src="/img/logos/9-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={51}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/10-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={70}
                height={32}
              />
              <Image
                src="/img/logos/10-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={70}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/11-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={100}
                height={32}
              />
              <Image
                src="/img/logos/11-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={100}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/12-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={85}
                height={32}
              />
              <Image
                src="/img/logos/12-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/13-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={75}
                height={32}
              />
              <Image
                src="/img/logos/13-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={75}
                height={32}
              />
            </Logo>
            <Logo>
              <Image
                src="/img/logos/8-color-black-height-32.svg"
                className="dark:hidden"
                alt=""
                width={85}
                height={32}
              />
              <Image
                src="/img/logos/8-color-white-height-32.svg"
                className="not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
          </LogoGrid>
        }
      />
      {/* Plan Comparison Table */}
      <PlanComparisonTable
        id="pricing"
        plans={['스타터', '프로', '엔터프라이즈']}
        features={[
          {
            title: 'AI 기능',
            features: [
              {
                name: '입찰 공고 AI 분석',
                value: { '스타터': '월 10건', '프로': '무제한', '엔터프라이즈': '무제한' },
              },
              {
                name: '견적서 자동 생성',
                value: true,
              },
              {
                name: 'AI 설비 모니터링',
                value: { '스타터': false, '프로': true, '엔터프라이즈': true },
              },
              {
                name: '예측 정비 알림',
                value: { '스타터': false, '프로': true, '엔터프라이즈': true },
              },
              {
                name: '전용 AI 모델 학습',
                value: { '스타터': false, '프로': false, '엔터프라이즈': true },
              },
            ],
          },
          {
            title: '하드웨어',
            features: [
              {
                name: 'OTT칩 제공',
                value: { '스타터': '1개', '프로': '5개', '엔터프라이즈': '무제한' },
              },
              {
                name: '추가 OTT칩 구매',
                value: true,
              },
              {
                name: '설치 지원',
                value: { '스타터': '원격', '프로': '현장 방문', '엔터프라이즈': '전담 엔지니어' },
              },
            ],
          },
          {
            title: '대시보드 & 리포트',
            features: [
              {
                name: '기본 대시보드',
                value: true,
              },
              {
                name: '실시간 모니터링',
                value: { '스타터': false, '프로': true, '엔터프라이즈': true },
              },
              {
                name: '월간 분석 리포트',
                value: { '스타터': false, '프로': true, '엔터프라이즈': true },
              },
              {
                name: '커스텀 리포트',
                value: { '스타터': false, '프로': false, '엔터프라이즈': true },
              },
            ],
          },
          {
            title: '지원',
            features: [
              {
                name: '이메일 지원',
                value: true,
              },
              {
                name: '카카오톡 알림',
                value: { '스타터': false, '프로': true, '엔터프라이즈': true },
              },
              {
                name: '우선 응대',
                value: { '스타터': false, '프로': true, '엔터프라이즈': true },
              },
              {
                name: '전담 기술 매니저',
                value: { '스타터': false, '프로': false, '엔터프라이즈': true },
              },
            ],
          },
        ]}
      />
      {/* Testimonial */}
      <TestimonialTwoColumnWithLargePhoto
        id="testimonial"
        quote={
          <p>
            처음엔 50만원짜리 OTT칩 하나로 시작했는데, 지금은 프로 플랜으로 공장 5곳을 관리하고 있습니다.
            입찰 분석 덕분에 수주율이 40% 올랐어요.
          </p>
        }
        img={
          <Image
            src="/img/avatars/16-h-1000-w-1400.webp"
            alt="박정민 대표"
            className="not-dark:bg-white/75 dark:bg-black/75"
            width={1400}
            height={1000}
          />
        }
        name="박정민 대표"
        byline="한성테크 (Pool SI 협력업체)"
      />
      {/* FAQs */}
      <FAQsAccordion id="faqs" headline="자주 묻는 질문">
        <Faq
          id="faq-1"
          question="OTT칩이 무엇인가요?"
          answer="OTT칩은 UNIO의 핵심 하드웨어로, 기존 설비에 부착하면 실시간 데이터 수집과 AI 분석이 가능해집니다. 전문 지식 없이도 10분 만에 설치할 수 있습니다."
        />
        <Faq
          id="faq-2"
          question="무료 체험은 어떻게 하나요?"
          answer="회원가입 후 입찰 분석 기능을 바로 체험할 수 있습니다. 신용카드 등록 없이 3건의 입찰 공고를 무료로 분석해 보세요."
        />
        <Faq
          id="faq-3"
          question="연간 결제 시 할인이 있나요?"
          answer="네, 연간 결제 시 약 17% 할인된 가격으로 이용 가능합니다. 스타터 플랜 기준 월 50만원이 연간 500만원(월 약 42만원)으로 할인됩니다."
        />
        <Faq
          id="faq-4"
          question="기존 MES 시스템과 연동되나요?"
          answer="네, UNIO는 주요 MES 시스템과 API 연동을 지원합니다. 엔터프라이즈 플랜에서는 전담 기술 매니저가 연동 작업을 지원해 드립니다."
        />
      </FAQsAccordion>
      {/* Call To Action */}
      <CallToActionSimpleCentered
        id="call-to-action"
        headline="궁금한 점이 있으신가요?"
        subheadline={
          <p>UNIO 전문가가 귀사에 맞는 플랜을 추천해 드립니다.</p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/analyze-bid" size="lg">
              무료 체험 시작
            </ButtonLink>

            <PlainButtonLink href="/about" size="lg">
              회사 소개 <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
