"use client";

import {
  IssueTracking,
  KanbanBoard,
  ProgressChart,
  ProjectCards,
  TriageHub,
} from "@/components/linear";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 pb-16 pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <h1
            className="mb-6 text-white"
            style={{
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 538,
              letterSpacing: "-0.5px",
              lineHeight: "1.1",
            }}
          >
            엑셀처럼 쉽고,{" "}
            <span className="bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] bg-clip-text text-transparent">
              AI처럼 강력하게
            </span>
          </h1>
          <p
            className="mx-auto max-w-2xl mb-8"
            style={{
              fontSize: "20px",
              fontWeight: 510,
              lineHeight: "1.6",
              color: "rgb(208, 214, 224)",
            }}
          >
            Pool 로봇SI 전용 스마트 제조 플랫폼
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgb(138, 143, 152)" }}>
              <svg className="w-5 h-5 text-[#5E6AD2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>10분 설치</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgb(138, 143, 152)" }}>
              <svg className="w-5 h-5 text-[#5E6AD2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>0.7개월 ROI</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "rgb(138, 143, 152)" }}>
              <svg className="w-5 h-5 text-[#5E6AD2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Pool 1,932개사 대상</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-200 bg-[#5E6AD2] text-white hover:bg-[#4F5BC3] shadow-lg hover:shadow-xl"
              style={{
                letterSpacing: "-0.13px",
                fontWeight: 510,
                fontSize: "16px",
              }}
            >
              무료 파일럿 신청
            </button>
            <button
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-200 bg-white/5 text-white hover:bg-white/8 border border-white/8"
              style={{
                letterSpacing: "-0.13px",
                fontWeight: 510,
                fontSize: "16px",
              }}
            >
              사례 영상 보기
            </button>
          </div>
        </div>
      </section>

      {/* Project Cards */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-center text-white"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 538,
              letterSpacing: "-0.032em",
            }}
          >
            UNIO 핵심 기술
          </h2>
          <p
            className="mb-12 text-center mx-auto max-w-2xl"
            style={{
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "1.6",
              color: "rgb(138, 143, 152)",
            }}
          >
            Pool 로봇SI에 최적화된 3가지 핵심 기술로 2.5세대 전환을 지원합니다
          </p>
          <ProjectCards />
        </div>
      </section>

      {/* Kanban Board */}
      <section
        className="px-4 py-20"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          borderTop: "0.8px solid rgba(255, 255, 255, 0.06)",
          borderBottom: "0.8px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-center text-white"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 538,
              letterSpacing: "-0.032em",
            }}
          >
            Pool SI 작업 관리 현황
          </h2>
          <p
            className="mb-12 text-center mx-auto max-w-2xl"
            style={{
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "1.6",
              color: "rgb(138, 143, 152)",
            }}
          >
            실시간으로 파트너사 작업 진행 상황을 확인하고 관리하세요
          </p>
          <KanbanBoard />
        </div>
      </section>

      {/* Dashboard */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-center text-white"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 538,
              letterSpacing: "-0.032em",
            }}
          >
            데이터 기반 생산 관리
          </h2>
          <p
            className="mb-12 text-center mx-auto max-w-2xl"
            style={{
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "1.6",
              color: "rgb(138, 143, 152)",
            }}
          >
            실시간 데이터로 생산 현황을 한눈에 파악하고 빠르게 의사결정하세요
          </p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ProgressChart />
            <IssueTracking />
          </div>
        </div>
      </section>

      {/* Triage Hub */}
      <section
        className="px-4 py-20"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          borderTop: "0.8px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-4 text-center text-white"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 538,
              letterSpacing: "-0.032em",
            }}
          >
            AI 예지보전 시스템
          </h2>
          <p
            className="mb-12 text-center mx-auto max-w-2xl"
            style={{
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "1.6",
              color: "rgb(138, 143, 152)",
            }}
          >
            설비 이상을 사전에 감지하고 AI가 최적의 조치를 추천합니다
          </p>
          <TriageHub />
        </div>
      </section>
    </main>
  );
}
