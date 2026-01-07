import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { Feature, FeaturesTwoColumnWithDemos } from '@/components/sections/features-two-column-with-demos'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'
import { Plan, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'
import { FeaturesThreeColumn, Feature as FeatureCard } from '@/components/sections/features-three-column'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero - v7.8 김 대표 스토리 */}
      <HeroSimpleCentered
        id="hero"
        eyebrow={<AnnouncementBadge href="/analyze-bid" text="OTT칩 50만원 출시" cta="자세히 보기" />}
        headline="52세 김 대표도 10분 만에 AI 공장을 갖습니다."
        subheadline={
          <p>
            3,000만원 아닌 <strong>50만원</strong>. 기계는 그대로, <strong>칩만 붙입니다</strong>.
            <br />
            로봇 1,932대가 데이터를 못 쓰고 있습니다. 엑셀만 알면 AI를 쓸 수 있습니다.
          </p>
        }
        cta={
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/analyze-bid" size="lg">
              무료 파일럿 신청
            </ButtonLink>
            <PlainButtonLink href="#weapons" size="lg">
              4가지 무기 보기 <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
      />

      {/* Stats - 핵심 숫자 배지 */}
      <StatsWithGraph
        id="stats"
        eyebrow="왜 지금인가"
        headline="1,932개 공장이 AI를 기다립니다."
        subheadline={
          <p>
            로봇은 있지만 데이터는 없습니다. 새벽 5시 출근하는 김 대표의 현실.
            UNIO는 기존 설비에 칩 하나로 AI를 연결합니다.
          </p>
        }
      >
        <Stat stat="1,932곳" text="로봇 보유 중소 제조업체" />
        <Stat stat="50만원" text="OTT칩 도입 비용 (기존 3,000만원)" />
        <Stat stat="10분" text="설치부터 AI 연결까지" />
      </StatsWithGraph>

      {/* 4가지 무기 - OTT칩, 엑셀브릿지, 도메인AI, AutoReport */}
      <FeaturesThreeColumn
        id="weapons"
        eyebrow="UNIO의 4가지 무기"
        headline="기계는 그대로, 두뇌만 바꿉니다."
        subheadline={
          <p>
            OTT칩으로 연결하고, 엑셀로 분석하고, AI로 예측하고, 보고서는 자동으로.
          </p>
        }
        features={
          <>
            <FeatureCard
              icon={<span className="text-2xl">🔌</span>}
              headline="OTT칩"
              subheadline="기존 로봇/PLC에 부착. 10분 설치, 50만원. 데이터 수집 시작."
            />
            <FeatureCard
              icon={<span className="text-2xl">📊</span>}
              headline="엑셀 브릿지"
              subheadline="익숙한 엑셀로 AI 데이터 분석. 새로운 프로그램 배울 필요 없음."
            />
            <FeatureCard
              icon={<span className="text-2xl">🤖</span>}
              headline="도메인 AI"
              subheadline="Pool SI 전문 AI. 용접, 조립, 도장 패턴을 이해하는 맞춤형 모델."
            />
            <FeatureCard
              icon={<span className="text-2xl">📝</span>}
              headline="AutoReport"
              subheadline="정부 증빙, 고객 리포트 자동 생성. 수기 작업 90% 감소."
            />
          </>
        }
      />

      {/* Features - 기존 vs UNIO 비교 */}
      <FeaturesTwoColumnWithDemos
        id="features"
        eyebrow="Before → After"
        headline="이것이 현실입니다."
        subheadline={
          <p>
            3,000만원 들여 새 시스템? 6개월 교육? 그럴 필요 없습니다.
          </p>
        }
        features={
          <>
            <Feature
              demo={
                <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 p-8">
                  <div className="text-center">
                    <p className="mb-2 text-sm text-red-400">Before</p>
                    <p className="text-4xl font-bold text-red-500">3,000만원</p>
                    <p className="mt-2 text-gray-400">MES 도입 비용</p>
                    <p className="mt-4 text-2xl font-bold text-red-400">6개월</p>
                    <p className="text-gray-400">교육 기간</p>
                  </div>
                </div>
              }
              headline="기존 방식의 한계"
              subheadline={
                <p>
                  비싼 MES 시스템, 긴 교육 기간, 복잡한 설정.
                  결국 엑셀로 돌아가는 현장. 데이터는 여전히 단절.
                </p>
              }
              cta={
                <Link href="#proof">
                  실제 사례 보기 <ArrowNarrowRightIcon />
                </Link>
              }
            />
            <Feature
              demo={
                <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-8">
                  <div className="text-center">
                    <p className="mb-2 text-sm text-emerald-400">After (UNIO)</p>
                    <p className="text-4xl font-bold text-emerald-500">50만원</p>
                    <p className="mt-2 text-gray-400">OTT칩 비용</p>
                    <p className="mt-4 text-2xl font-bold text-emerald-400">10분</p>
                    <p className="text-gray-400">설치 시간</p>
                  </div>
                </div>
              }
              headline="UNIO의 해답"
              subheadline={
                <p>
                  기계는 그대로. 칩만 붙입니다. 엑셀만 알면 AI를 씁니다.
                  52세 김 대표도 10분 만에 AI 공장을 갖습니다.
                </p>
              }
              cta={
                <Link href="/analyze-bid">
                  무료 체험하기 <ArrowNarrowRightIcon />
                </Link>
              }
            />
          </>
        }
      />

      {/* Testimonial - 3개 실증 파트너 */}
      <TestimonialThreeColumnGrid
        id="proof"
        headline="실증 완료. 숫자로 증명합니다."
        subheadline={<p>3개 파트너사에서 검증된 결과입니다.</p>}
      >
        <Testimonial
          quote={
            <p>
              <strong className="text-emerald-400">불량률 67% 감소.</strong>
              <br />
              용접 로봇에 OTT칩 부착 후, AI가 불량 패턴을 학습.
              수기 검사 대비 정확도가 크게 향상됐습니다.
            </p>
          }
          img={
            <Image
              src="/img/avatars/10-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="CM TECH"
          byline="용접 자동화 전문"
        />
        <Testimonial
          quote={
            <p>
              <strong className="text-emerald-400">가동률 23% 향상.</strong>
              <br />
              예방 정비 AI 도입 후 다운타임 감소.
              엑셀 리포트로 현장 관리자도 쉽게 사용합니다.
            </p>
          }
          img={
            <Image
              src="/img/avatars/15-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="벽산"
          byline="건자재 제조"
        />
        <Testimonial
          quote={
            <p>
              <strong className="text-emerald-400">외주비 60% 절감.</strong>
              <br />
              AutoReport로 정부 증빙 서류 자동화.
              월 40시간 수기 작업이 4시간으로 줄었습니다.
            </p>
          }
          img={
            <Image
              src="/img/avatars/13-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="삼웅철강"
          byline="철강 가공"
        />
      </TestimonialThreeColumnGrid>

      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="자주 묻는 질문">
        <Faq
          id="faq-1"
          question="OTT칩은 어떤 로봇/설비에 부착 가능한가요?"
          answer="국내외 주요 로봇(화낙, ABB, 쿠카, 야스카와) 및 PLC(지멘스, 미쓰비시, LS)에 모두 호환됩니다. 10년 이상 된 구형 설비도 지원합니다."
        />
        <Faq
          id="faq-2"
          question="엑셀만 알면 정말 AI를 쓸 수 있나요?"
          answer="네. 엑셀 브릿지가 AI 데이터를 익숙한 엑셀 형식으로 변환합니다. 피벗 테이블, 필터 등 기존에 쓰던 기능 그대로 AI 분석 결과를 활용할 수 있습니다."
        />
        <Faq
          id="faq-3"
          question="50만원 외에 추가 비용이 있나요?"
          answer="OTT칩 50만원은 1회성 구매 비용입니다. 클라우드 분석 서비스는 월 9만9천원부터 시작하며, 무료 파일럿 기간 동안 모든 기능을 체험하실 수 있습니다."
        />
        <Faq
          id="faq-4"
          question="설치에 공장 가동을 중단해야 하나요?"
          answer="아니요. OTT칩은 기존 설비에 부착하는 방식이라 생산 중단 없이 10분 내 설치가 완료됩니다. 야간이나 주말 설치도 가능합니다."
        />
      </FAQsTwoColumnAccordion>

      {/* Pricing - v7.8 기준 */}
      <PricingMultiTier
        id="pricing"
        headline="투명한 가격, 확실한 ROI"
        plans={
          <>
            <Plan
              name="OTT칩"
              price="₩50만원"
              period="1회"
              subheadline={<p>하드웨어 구매 (로봇/PLC당 1개)</p>}
              features={[
                '10분 설치',
                '모든 로봇/PLC 호환',
                '실시간 데이터 수집',
                '1년 무상 AS',
                '기술 지원 포함',
              ]}
              cta={
                <SoftButtonLink href="/analyze-bid" size="lg">
                  견적 문의
                </SoftButtonLink>
              }
            />
            <Plan
              name="UNIO Cloud"
              price="₩99,000"
              period="/월"
              subheadline={<p>AI 분석 + 리포트 자동화</p>}
              badge="추천"
              features={[
                'OTT칩 데이터 연동',
                '엑셀 브릿지 무제한',
                '도메인 AI 분석',
                'AutoReport 자동화',
                '입찰공고 AI 분석',
                '전화 + 카카오톡 지원',
              ]}
              cta={
                <ButtonLink href="/analyze-bid" size="lg">
                  무료 파일럿 시작
                </ButtonLink>
              }
            />
            <Plan
              name="Enterprise"
              price="맞춤"
              period="견적"
              subheadline={<p>대규모 공장 및 파트너사</p>}
              features={[
                'Cloud 모든 기능 포함',
                '온프레미스 설치 옵션',
                'ERP/MES 연동',
                '전용 AI 모델 학습',
                '전담 기술 매니저',
                'SLA 보장',
              ]}
              cta={
                <SoftButtonLink href="#" size="lg">
                  파트너 문의
                </SoftButtonLink>
              }
            />
          </>
        }
      />

      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="김 대표처럼 10분 만에 AI 공장을 만드세요."
        subheadline={
          <p>
            1,932개 공장이 아직 AI를 못 쓰고 있습니다.
            <br />
            50만원으로 시작하는 스마트공장. 지금 무료 파일럿을 신청하세요.
          </p>
        }
        cta={
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/analyze-bid" size="lg">
              무료 파일럿 신청
            </ButtonLink>
            <PlainButtonLink href="#pricing" size="lg">
              요금제 보기 <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
