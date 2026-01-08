import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HeroLeftAlignedWithPhoto } from '@/components/sections/hero-left-aligned-with-photo'
import { Stat, StatsWithGraph } from '@/components/sections/stats-with-graph'
import { TeamFourColumnGrid, TeamMember } from '@/components/sections/team-four-column-grid'
import { TestimonialTwoColumnWithLargePhoto } from '@/components/sections/testimonial-two-column-with-large-photo'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '회사소개 - UNIO',
  description: 'UNIO는 Pool SI 스마트공장 AI 플랫폼입니다. 중소 제조업체의 디지털 전환을 돕습니다.',
  openGraph: {
    title: '회사소개 - UNIO',
    description: 'UNIO는 Pool SI 스마트공장 AI 플랫폼입니다.',
  },
}

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroLeftAlignedWithPhoto
        id="hero"
        headline="제조업의 AI 전환, UNIO가 함께합니다"
        subheadline={
          <p>
            52세 김 대표님도 10분 만에 AI 공장을 가질 수 있습니다.
            OTT칩 하나로 시작하는 스마트공장, UNIO가 Pool SI의 미래를 열어갑니다.
          </p>
        }
        photo={
          <Image
            src="/img/photos/1.webp"
            alt="UNIO 스마트공장 현장"
            width={1800}
            height={945}
            className="not-dark:bg-white/75 dark:bg-black/75"
          />
        }
      />
      {/* Stats */}
      <StatsWithGraph
        id="stats"
        eyebrow="Pool SI 시장 현황"
        headline="1,932개 공장이 AI를 기다리고 있습니다"
        subheadline={
          <p>
            전국 Pool SI 협력업체 2,460개사 중 78.5%가 아직 AI 시스템을 도입하지 못했습니다.
            UNIO는 OTT칩 50만원으로 누구나 쉽게 스마트공장을 시작할 수 있게 합니다.
          </p>
        }
      >
        <Stat stat="2,460+" text="Pool SI 전국 협력업체 수" />
        <Stat stat="78.5%" text="AI 미도입 비율 - UNIO의 기회" />
      </StatsWithGraph>
      {/* Testimonial */}
      <TestimonialTwoColumnWithLargePhoto
        id="testimonial"
        quote={
          <p>
            UNIO 덕분에 입찰 서류 준비 시간이 3일에서 30분으로 줄었습니다.
            이제 저도 대기업처럼 AI로 분석하고 견적을 냅니다.
          </p>
        }
        img={
          <Image
            src="/img/avatars/16-h-1000-w-1400.webp"
            alt="김영수 대표"
            className="not-dark:bg-white/75 dark:bg-black/75"
            width={1400}
            height={1000}
          />
        }
        name="김영수 대표"
        byline="세진공업 (Pool SI 협력업체)"
      />
      {/* Team */}
      <TeamFourColumnGrid
        id="team"
        headline="UNILAB 팀"
        subheadline={
          <p>
            제조업 현장 경험과 AI 기술을 겸비한 전문가들이 모였습니다.
            현장의 문제를 기술로 해결합니다.
          </p>
        }
      >
        <TeamMember
          img={
            <Image
              src="/img/avatars/1-h-1000-w-800.webp"
              alt="이시후 대표"
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="이시후"
          byline="대표이사 / CEO"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/2-h-1000-w-800.webp"
              alt="박민수 CTO"
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="박민수"
          byline="기술이사 / CTO"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/7-h-1000-w-800.webp"
              alt="김지현 이사"
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="김지현"
          byline="사업개발 이사"
        />
        <TeamMember
          img={
            <Image
              src="/img/avatars/4-h-1000-w-800.webp"
              alt="정수연 팀장"
              className="not-dark:bg-white/75 dark:bg-black/75"
              width={800}
              height={1000}
            />
          }
          name="정수연"
          byline="제품개발 팀장"
        />
      </TeamFourColumnGrid>
      {/* Call To Action */}
      <CallToActionSimple
        id="call-to-action"
        headline="스마트공장, 지금 시작하세요"
        subheadline={
          <p>UNIO 전문가가 귀사에 맞는 AI 솔루션을 제안해 드립니다.</p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/analyze-bid" size="lg">
              무료 입찰 분석
            </ButtonLink>

            <PlainButtonLink href="/pricing" size="lg">
              요금제 보기 <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
