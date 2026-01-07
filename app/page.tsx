import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink, SoftButtonLink } from '@/components/elements/button'
import { Link } from '@/components/elements/link'
import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { Screenshot } from '@/components/elements/screenshot'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { FAQsTwoColumnAccordion, Faq } from '@/components/sections/faqs-two-column-accordion'
import { Feature, FeaturesTwoColumnWithDemos } from '@/components/sections/features-two-column-with-demos'
import { HeroLeftAlignedWithDemo } from '@/components/sections/hero-left-aligned-with-demo'
import { Plan, PricingMultiTier } from '@/components/sections/pricing-multi-tier'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { Testimonial, TestimonialThreeColumnGrid } from '@/components/sections/testimonials-three-column-grid'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroLeftAlignedWithDemo
        id="hero"
        eyebrow={<AnnouncementBadge href="/analyze-bid" text="입찰공고 AI 분석 + 엑셀 자동화 출시" cta="체험하기" />}
        headline="Pool SI 스마트공장, AI로 자동화하세요."
        subheadline={
          <p>
            입찰공고 분석부터 견적서 생성까지. Claude AI가 3~7일 걸리던 작업을 30분 만에 완료합니다.
            2,460개 Pool 업체를 위한 AI 통합 솔루션.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/analyze-bid" size="lg">
              무료 체험하기
            </ButtonLink>

            <PlainButtonLink href="#features" size="lg">
              기능 둘러보기 <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={
          <>
            <Screenshot className="rounded-md lg:hidden" wallpaper="green" placement="bottom-right">
              <Image
                src="/img/screenshots/1-left-1670-top-1408.webp"
                alt=""
                width={1670}
                height={1408}
                className="bg-white/75 md:hidden dark:hidden"
              />
              <Image
                src="/img/screenshots/1-color-olive-left-1670-top-1408.webp"
                alt=""
                width={1670}
                height={1408}
                className="bg-black/75 not-dark:hidden md:hidden"
              />
              <Image
                src="/img/screenshots/1-left-2000-top-1408.webp"
                alt=""
                width={2000}
                height={1408}
                className="bg-white/75 max-md:hidden dark:hidden"
              />
              <Image
                src="/img/screenshots/1-color-olive-left-2000-top-1408.webp"
                alt=""
                width={2000}
                height={1408}
                className="bg-black/75 not-dark:hidden max-md:hidden"
              />
            </Screenshot>
            <Screenshot className="rounded-lg max-lg:hidden" wallpaper="green" placement="bottom">
              <Image
                src="/img/screenshots/1.webp"
                alt=""
                className="bg-white/75 dark:hidden"
                width={3440}
                height={1990}
              />
              <Image
                className="bg-black/75 not-dark:hidden"
                src="/img/screenshots/1-color-olive.webp"
                alt=""
                width={3440}
                height={1990}
              />
            </Screenshot>
          </>
        }
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
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
                className="bg-black/75 not-dark:hidden"
                alt=""
                width={85}
                height={32}
              />
            </Logo>
          </LogoGrid>
        }
      />
      {/* Features */}
      <FeaturesTwoColumnWithDemos
        id="features"
        eyebrow="핵심 기능"
        headline="입찰부터 정산까지, Pool SI 업무의 모든 것을 AI가 처리합니다."
        subheadline={
          <p>
            나라장터 입찰공고 분석, 견적서 자동 생성, 설비 관리, 정부 증빙 문서까지.
            현장에서 사무실까지 모든 업무를 하나의 플랫폼에서.
          </p>
        }
        features={
          <>
            <Feature
              demo={
                <Screenshot wallpaper="purple" placement="bottom-right">
                  <Image
                    src="/img/screenshots/1-left-1000-top-800.webp"
                    alt=""
                    className="bg-white/75 sm:hidden dark:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1000-top-800.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-left-1800-top-660.webp"
                    alt=""
                    className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1800-top-660.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-left-1300-top-1300.webp"
                    alt=""
                    className="bg-white/75 max-lg:hidden xl:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-left-1800-top-1250.webp"
                    alt=""
                    className="bg-white/75 max-xl:hidden dark:hidden"
                    width={1800}
                    height={1250}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="입찰공고 AI 분석"
              subheadline={
                <p>
                  나라장터, 조달청 입찰공고를 붙여넣으면 AI가 사업개요, 요구설비, 평가기준, 제출서류를
                  자동 추출합니다. 견적서 템플릿까지 한 번에.
                </p>
              }
              cta={
                <Link href="/analyze-bid">
                  지금 체험하기 <ArrowNarrowRightIcon />
                </Link>
              }
            />
            <Feature
              demo={
                <Screenshot wallpaper="blue" placement="bottom-left">
                  <Image
                    src="/img/screenshots/1-right-1000-top-800.webp"
                    alt=""
                    className="bg-white/75 sm:hidden dark:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1000-top-800.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-right-1800-top-660.webp"
                    alt=""
                    className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1800-top-660.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-right-1300-top-1300.webp"
                    alt=""
                    className="bg-white/75 max-lg:hidden xl:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-right-1800-top-1250.webp"
                    alt=""
                    className="bg-white/75 max-xl:hidden dark:hidden"
                    width={1800}
                    height={1250}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1800-top-1250.webp"
                    alt=""
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="스마트 설비 관리"
              subheadline={
                <p>로봇, 컨베이어, 센서 등 Pool 설비를 실시간 모니터링. AI가 예방 정비 시점을 예측하고 고장을 사전에 방지합니다.</p>
              }
              cta={
                <Link href="#pricing">
                  요금제 보기 <ArrowNarrowRightIcon />
                </Link>
              }
            />
          </>
        }
      />
      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="검증된 성과"
        headline="Pool SI 업계 최초, Claude AI 기반 자동화 솔루션."
        subheadline={
          <p>
            2,460개 Pool 업체 중 78.5%가 AI 솔루션 미도입 상태.
            UNIO는 입찰 분석, 견적 생성, 정부 증빙까지 모든 업무를 AI로 자동화하여
            작업 시간을 90% 이상 단축합니다.
          </p>
        }
      >
        <Stat stat="30분" text="입찰공고 분석 + 견적서 생성 완료 (기존 3~7일)" />
        <Stat stat="78.5%" text="Pool 업체 AI 미도입율 — 지금이 도입 적기" />
      </StatsWithGraph>
      {/* Testimonial */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="고객사 도입 사례"
        subheadline={<p>Pool SI 업체들이 UNIO를 도입하고 경험한 변화입니다.</p>}
      >
        <Testimonial
          quote={
            <p>
              입찰공고 분석에 3일씩 걸리던 작업이 30분 만에 끝납니다.
              견적서까지 자동 생성되니 영업팀 업무 효율이 크게 올랐어요.
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
          name="김영호"
          byline="대표 / 한솔 FA"
        />
        <Testimonial
          quote={
            <p>
              정부 지원사업 증빙 서류 작성이 가장 힘들었는데,
              AI가 자동으로 양식에 맞춰 생성해주니 행정 업무가 절반으로 줄었습니다.
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
          name="박지현"
          byline="관리팀장 / 스마트 로보틱스"
        />
        <Testimonial
          quote={
            <p>
              설비 고장 예측 기능 덕분에 다운타임을 80% 이상 줄였습니다.
              예방 정비로 비용도 절감되고 고객 신뢰도 높아졌어요.
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
          name="이승훈"
          byline="기술이사 / 케이풀테크"
        />
        <Testimonial
          quote={
            <p>
              월간 고객 리포트 작성에 이틀씩 걸렸는데,
              이제는 버튼 한 번으로 자동 생성됩니다. 고객 만족도도 올랐어요.
            </p>
          }
          img={
            <Image
              src="/img/avatars/12-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="최민수"
          byline="영업팀장 / 우진 시스템"
        />
        <Testimonial
          quote={
            <p>
              1인 사업자인데 UNIO 덕분에 대기업 수준의 제안서와 보고서를 만들 수 있게 됐습니다.
              영업 경쟁력이 확 올랐어요.
            </p>
          }
          img={
            <Image
              src="/img/avatars/11-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="정우성"
          byline="대표 / JW 오토메이션"
        />
        <Testimonial
          quote={
            <p>
              Claude AI 기반이라 분석 정확도가 다릅니다.
              입찰 적합도 분석으로 수주율이 30% 이상 올랐습니다.
            </p>
          }
          img={
            <Image
              src="/img/avatars/14-size-160.webp"
              alt=""
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={160}
              height={160}
            />
          }
          name="한동훈"
          byline="사업본부장 / 미래 엔지니어링"
        />
      </TestimonialThreeColumnGrid>
      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="자주 묻는 질문">
        <Faq
          id="faq-1"
          question="무료 체험은 어떻게 시작하나요?"
          answer="회원가입 후 14일간 모든 기능을 무료로 체험하실 수 있습니다. 신용카드 등록 없이 바로 시작하실 수 있으며, 체험 기간 종료 전 이메일로 안내드립니다."
        />
        <Faq
          id="faq-2"
          question="어떤 AI 모델을 사용하나요?"
          answer="UNIO는 Anthropic의 Claude Sonnet 4 모델을 사용합니다. 입찰공고 분석, 문서 생성, 설비 예측 등 각 기능에 최적화된 프롬프트로 높은 정확도를 제공합니다."
        />
        <Faq
          id="faq-3"
          question="기존 시스템과 연동이 가능한가요?"
          answer="API 연동을 통해 ERP, MES 등 기존 시스템과 연결할 수 있습니다. Pro 플랜 이상에서 전용 API 키가 제공되며, 기술팀이 도입 지원을 해드립니다."
        />
        <Faq
          id="faq-4"
          question="데이터 보안은 어떻게 관리되나요?"
          answer="모든 데이터는 암호화되어 안전하게 저장됩니다. AWS 서울 리전을 사용하며, SOC 2 인증을 준비 중입니다. 고객 데이터는 AI 학습에 사용되지 않습니다."
        />
      </FAQsTwoColumnAccordion>
      {/* Pricing */}
      <PricingMultiTier
        id="pricing"
        headline="Pool SI 규모에 맞는 요금제"
        plans={
          <>
            <Plan
              name="Starter"
              price="₩99,000"
              period="/월"
              subheadline={<p>소규모 Pool SI 업체를 위한 기본 플랜</p>}
              features={[
                '입찰공고 AI 분석 (월 20건)',
                '견적서 자동 생성',
                '기본 리포트 템플릿',
                '이메일 지원',
                '14일 무료 체험',
              ]}
              cta={
                <SoftButtonLink href="/analyze-bid" size="lg">
                  무료 체험 시작
                </SoftButtonLink>
              }
            />
            <Plan
              name="Growth"
              price="₩299,000"
              period="/월"
              subheadline={<p>성장하는 Pool SI 팀을 위한 확장 플랜</p>}
              badge="추천"
              features={[
                'Starter 모든 기능 포함',
                '입찰공고 무제한 분석',
                '정부 증빙 문서 자동화',
                '설비 관리 대시보드',
                '월간 고객 리포트 생성',
                '예방 정비 AI 분석',
                '전화 + 카카오톡 지원',
              ]}
              cta={
                <ButtonLink href="/analyze-bid" size="lg">
                  무료 체험 시작
                </ButtonLink>
              }
            />
            <Plan
              name="Enterprise"
              price="맞춤"
              period="견적"
              subheadline={<p>대규모 Pool SI 업체 및 파트너사를 위한 맞춤 플랜</p>}
              features={[
                'Growth 모든 기능 포함',
                'ERP/MES 시스템 연동',
                '전용 API 키 제공',
                '커스텀 리포트 템플릿',
                '전담 기술 매니저',
                '온사이트 교육',
                'SLA 보장',
              ]}
              cta={
                <SoftButtonLink href="#" size="lg">
                  문의하기
                </SoftButtonLink>
              }
            />
          </>
        }
      />
      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="Pool SI 업무, AI로 혁신할 준비 되셨나요?"
        subheadline={
          <p>
            2,460개 Pool 업체 중 78.5%가 아직 AI를 도입하지 않았습니다.
            지금 UNIO와 함께 업계 선두로 나아가세요.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/analyze-bid" size="lg">
              무료 체험 시작
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
