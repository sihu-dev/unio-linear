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
      {/* Hero - v7.8 with Oatmeal visual */}
      <HeroLeftAlignedWithDemo
        id="hero"
        eyebrow={<AnnouncementBadge href="/analyze-bid" text="OTT칩 50만원 출시 — AI 공장의 시작" cta="자세히 보기" />}
        headline="52세 김 대표도 10분 만에 AI 공장을 갖습니다."
        subheadline={
          <p>
            3,000만원 아닌 <strong>50만원</strong>. 기계는 그대로, 칩만 붙입니다.
            1,932개 공장이 데이터를 못 쓰고 있습니다. 엑셀만 알면 AI를 쓸 수 있습니다.
          </p>
        }
        cta={
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/analyze-bid" size="lg">
              무료 파일럿 신청
            </ButtonLink>

            <SoftButtonLink href="/dashboard" size="lg">
              대시보드 체험
            </SoftButtonLink>

            <PlainButtonLink href="#features" size="lg">
              4가지 무기 보기 <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>
        }
        demo={
          <>
            <Screenshot className="rounded-md lg:hidden" wallpaper="green" placement="bottom-right">
              <Image
                src="/img/screenshots/1-left-1670-top-1408.webp"
                alt="UNIO 대시보드"
                width={1670}
                height={1408}
                className="bg-white/75 md:hidden dark:hidden"
              />
              <Image
                src="/img/screenshots/1-color-olive-left-1670-top-1408.webp"
                alt="UNIO 대시보드"
                width={1670}
                height={1408}
                className="bg-black/75 not-dark:hidden md:hidden"
              />
              <Image
                src="/img/screenshots/1-left-2000-top-1408.webp"
                alt="UNIO 대시보드"
                width={2000}
                height={1408}
                className="bg-white/75 max-md:hidden dark:hidden"
              />
              <Image
                src="/img/screenshots/1-color-olive-left-2000-top-1408.webp"
                alt="UNIO 대시보드"
                width={2000}
                height={1408}
                className="bg-black/75 not-dark:hidden max-md:hidden"
              />
            </Screenshot>
            <Screenshot className="rounded-lg max-lg:hidden" wallpaper="green" placement="bottom">
              <Image
                src="/img/screenshots/1.webp"
                alt="UNIO 대시보드"
                className="bg-white/75 dark:hidden"
                width={3440}
                height={1990}
              />
              <Image
                className="bg-black/75 not-dark:hidden"
                src="/img/screenshots/1-color-olive.webp"
                alt="UNIO 대시보드"
                width={3440}
                height={1990}
              />
            </Screenshot>
          </>
        }
        footer={
          <LogoGrid>
            <Logo>
              <Image src="/img/logos/9-color-black-height-32.svg" className="dark:hidden" alt="CM TECH" width={51} height={32} />
              <Image src="/img/logos/9-color-white-height-32.svg" className="not-dark:hidden" alt="CM TECH" width={51} height={32} />
            </Logo>
            <Logo>
              <Image src="/img/logos/10-color-black-height-32.svg" className="dark:hidden" alt="벽산" width={70} height={32} />
              <Image src="/img/logos/10-color-white-height-32.svg" className="not-dark:hidden" alt="벽산" width={70} height={32} />
            </Logo>
            <Logo>
              <Image src="/img/logos/11-color-black-height-32.svg" className="dark:hidden" alt="삼웅철강" width={100} height={32} />
              <Image src="/img/logos/11-color-white-height-32.svg" className="not-dark:hidden" alt="삼웅철강" width={100} height={32} />
            </Logo>
            <Logo>
              <Image src="/img/logos/12-color-black-height-32.svg" className="dark:hidden" alt="화낙" width={85} height={32} />
              <Image src="/img/logos/12-color-white-height-32.svg" className="not-dark:hidden" alt="화낙" width={85} height={32} />
            </Logo>
            <Logo>
              <Image src="/img/logos/13-color-black-height-32.svg" className="dark:hidden" alt="ABB" width={75} height={32} />
              <Image src="/img/logos/13-color-white-height-32.svg" className="not-dark:hidden" alt="ABB" width={75} height={32} />
            </Logo>
            <Logo>
              <Image src="/img/logos/8-color-black-height-32.svg" className="dark:hidden" alt="쿠카" width={85} height={32} />
              <Image src="/img/logos/8-color-white-height-32.svg" className="not-dark:hidden" alt="쿠카" width={85} height={32} />
            </Logo>
          </LogoGrid>
        }
      />

      {/* Features - 4가지 무기 */}
      <FeaturesTwoColumnWithDemos
        id="features"
        eyebrow="UNIO의 4가지 무기"
        headline="기계는 그대로, 두뇌만 바꿉니다."
        subheadline={
          <p>
            OTT칩으로 연결하고, 엑셀로 분석하고, AI로 예측하고, 보고서는 자동으로.
            새벽 5시 출근하던 김 대표의 하루가 바뀝니다.
          </p>
        }
        features={
          <>
            <Feature
              demo={
                <Screenshot wallpaper="purple" placement="bottom-right">
                  <Image
                    src="/img/screenshots/1-left-1000-top-800.webp"
                    alt="OTT칩 + 엑셀 브릿지"
                    className="bg-white/75 sm:hidden dark:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1000-top-800.webp"
                    alt="OTT칩 + 엑셀 브릿지"
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-left-1800-top-660.webp"
                    alt="OTT칩 + 엑셀 브릿지"
                    className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1800-top-660.webp"
                    alt="OTT칩 + 엑셀 브릿지"
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-left-1300-top-1300.webp"
                    alt="OTT칩 + 엑셀 브릿지"
                    className="bg-white/75 max-lg:hidden xl:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
                    alt="OTT칩 + 엑셀 브릿지"
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-left-1800-top-1250.webp"
                    alt="OTT칩 + 엑셀 브릿지"
                    className="bg-white/75 max-xl:hidden dark:hidden"
                    width={1800}
                    height={1250}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-left-1800-top-1250.webp"
                    alt="OTT칩 + 엑셀 브릿지"
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="OTT칩 + 엑셀 브릿지"
              subheadline={
                <p>
                  기존 로봇/PLC에 칩 하나 부착. 10분 설치, 50만원.
                  수집된 데이터는 익숙한 엑셀 형식으로 바로 분석 가능합니다.
                </p>
              }
              cta={
                <Link href="/analyze-bid">
                  무료 체험하기 <ArrowNarrowRightIcon />
                </Link>
              }
            />
            <Feature
              demo={
                <Screenshot wallpaper="blue" placement="bottom-left">
                  <Image
                    src="/img/screenshots/1-right-1000-top-800.webp"
                    alt="도메인 AI + AutoReport"
                    className="bg-white/75 sm:hidden dark:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1000-top-800.webp"
                    alt="도메인 AI + AutoReport"
                    className="bg-black/75 not-dark:hidden sm:hidden"
                    width={1000}
                    height={800}
                  />
                  <Image
                    src="/img/screenshots/1-right-1800-top-660.webp"
                    alt="도메인 AI + AutoReport"
                    className="bg-white/75 max-sm:hidden lg:hidden dark:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1800-top-660.webp"
                    alt="도메인 AI + AutoReport"
                    className="bg-black/75 not-dark:hidden max-sm:hidden lg:hidden"
                    width={1800}
                    height={660}
                  />
                  <Image
                    src="/img/screenshots/1-right-1300-top-1300.webp"
                    alt="도메인 AI + AutoReport"
                    className="bg-white/75 max-lg:hidden xl:hidden dark:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1300-top-1300.webp"
                    alt="도메인 AI + AutoReport"
                    className="bg-black/75 not-dark:hidden max-lg:hidden xl:hidden"
                    width={1300}
                    height={1300}
                  />
                  <Image
                    src="/img/screenshots/1-right-1800-top-1250.webp"
                    alt="도메인 AI + AutoReport"
                    className="bg-white/75 max-xl:hidden dark:hidden"
                    width={1800}
                    height={1250}
                  />
                  <Image
                    src="/img/screenshots/1-color-olive-right-1800-top-1250.webp"
                    alt="도메인 AI + AutoReport"
                    className="bg-black/75 not-dark:hidden max-xl:hidden"
                    width={1800}
                    height={1250}
                  />
                </Screenshot>
              }
              headline="도메인 AI + AutoReport"
              subheadline={
                <p>
                  Pool SI 전문 AI가 용접, 조립, 도장 패턴을 분석.
                  정부 증빙, 고객 리포트는 자동 생성. 수기 작업 90% 감소.
                </p>
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

      {/* Stats - 핵심 숫자 */}
      <StatsWithGraph
        id="stats"
        eyebrow="왜 지금인가"
        headline="1,932개 공장이 AI를 기다립니다."
        subheadline={
          <p>
            로봇은 있지만 데이터는 없습니다. 3,000만원 MES 도입? 6개월 교육?
            UNIO는 50만원으로 10분 만에 AI 공장을 만듭니다.
          </p>
        }
      >
        <Stat stat="1,932곳" text="로봇 보유 중소 제조업체 (데이터 미활용)" />
        <Stat stat="50만원" text="OTT칩 도입 비용 (기존 MES 3,000만원)" />
        <Stat stat="10분" text="설치부터 AI 연결까지 소요 시간" />
      </StatsWithGraph>

      {/* Testimonial - 실증 파트너 */}
      <TestimonialThreeColumnGrid
        id="testimonial"
        headline="실증 완료. 숫자로 증명합니다."
        subheadline={<p>3개 파트너사에서 검증된 결과입니다. Before/After로 확인하세요.</p>}
      >
        <Testimonial
          quote={
            <p>
              <strong className="text-emerald-500">불량률 67% 감소.</strong> 용접 로봇에 OTT칩 부착 후, AI가 불량 패턴을 학습했습니다.
              수기 검사 대비 정확도가 크게 향상됐어요.
            </p>
          }
          img={<Image src="/img/avatars/10-size-160.webp" alt="" className="not-dark:bg-white/75 dark:bg-black/75" width={160} height={160} />}
          name="CM TECH"
          byline="용접 자동화 전문"
        />
        <Testimonial
          quote={
            <p>
              <strong className="text-emerald-500">가동률 23% 향상.</strong> 예방 정비 AI 도입 후 다운타임이 크게 줄었습니다.
              엑셀 리포트로 현장 관리자도 쉽게 씁니다.
            </p>
          }
          img={<Image src="/img/avatars/15-size-160.webp" alt="" className="not-dark:bg-white/75 dark:bg-black/75" width={160} height={160} />}
          name="벽산"
          byline="건자재 제조"
        />
        <Testimonial
          quote={
            <p>
              <strong className="text-emerald-500">외주비 60% 절감.</strong> AutoReport로 정부 증빙 서류 자동화.
              월 40시간 수기 작업이 4시간으로 줄었습니다.
            </p>
          }
          img={<Image src="/img/avatars/13-size-160.webp" alt="" className="not-dark:bg-white/75 dark:bg-black/75" width={160} height={160} />}
          name="삼웅철강"
          byline="철강 가공"
        />
        <Testimonial
          quote={
            <p>
              52세인데 엑셀밖에 모릅니다. 그런데 UNIO는 엑셀로 다 되더라고요.
              새벽 5시 출근이 8시로 바뀌었어요.
            </p>
          }
          img={<Image src="/img/avatars/12-size-160.webp" alt="" className="not-dark:bg-white/75 dark:bg-black/75" width={160} height={160} />}
          name="김영호 대표"
          byline="중소 제조업체 대표"
        />
        <Testimonial
          quote={
            <p>
              MES 도입하려고 3,000만원 견적 받았는데, OTT칩은 50만원이에요.
              10년 된 구형 로봇에도 바로 붙였습니다.
            </p>
          }
          img={<Image src="/img/avatars/11-size-160.webp" alt="" className="not-dark:bg-white/75 dark:bg-black/75" width={160} height={160} />}
          name="박지현 팀장"
          byline="생산관리 담당"
        />
        <Testimonial
          quote={
            <p>
              정부 지원사업 증빙 때문에 매달 야근했는데, AutoReport 쓰고 나서
              버튼 한 번이면 끝나요. 진짜 편해졌습니다.
            </p>
          }
          img={<Image src="/img/avatars/14-size-160.webp" alt="" className="not-dark:bg-white/75 dark:bg-black/75" width={160} height={160} />}
          name="이승훈 이사"
          byline="경영지원실"
        />
      </TestimonialThreeColumnGrid>

      {/* FAQs */}
      <FAQsTwoColumnAccordion id="faqs" headline="자주 묻는 질문">
        <Faq
          id="faq-1"
          question="OTT칩은 어떤 설비에 부착할 수 있나요?"
          answer="화낙, ABB, 쿠카, 야스카와 등 국내외 주요 로봇과 지멘스, 미쓰비시, LS 등 PLC에 모두 호환됩니다. 10년 이상 된 구형 설비도 지원합니다."
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
          question="설치할 때 공장 가동을 중단해야 하나요?"
          answer="아니요. OTT칩은 기존 설비에 부착하는 방식이라 생산 중단 없이 10분 내 설치가 완료됩니다. 야간이나 주말 설치도 가능합니다."
        />
      </FAQsTwoColumnAccordion>

      {/* Pricing */}
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
            50만원으로 시작하는 스마트공장. 지금 무료 파일럿을 신청하세요.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
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
