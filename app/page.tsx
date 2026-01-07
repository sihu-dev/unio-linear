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
            엑셀만 알면
            <br />
            <span className="bg-gradient-to-r from-[#5E6AD2] to-[#7C3AED] bg-clip-text text-transparent">
              AI를 쓸 수 있습니다
            </span>
          </h1>
          <p
            className="mx-auto max-w-2xl"
            style={{
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "1.6",
              color: "rgb(138, 143, 152)",
            }}
          >
            Pool 기업 전용 AI 플랫폼으로 입찰서 작성 시간을{" "}
            <strong className="text-[#5E6AD2]">2일에서 2시간</strong>
            으로 단축하세요
          </p>
        </div>
      </section>

      {/* Project Cards */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-12 text-center text-white"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 538,
              letterSpacing: "-0.032em",
            }}
          >
            3대 핵심 프로젝트
          </h2>
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
            className="mb-12 text-center text-white"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 538,
              letterSpacing: "-0.032em",
            }}
          >
            투명한 작업 프로세스
          </h2>
          <KanbanBoard />
        </div>
      </section>

      {/* Dashboard */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2
            className="mb-12 text-center text-white"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 538,
              letterSpacing: "-0.032em",
            }}
          >
            실시간 프로젝트 현황
          </h2>
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
            className="mb-12 text-center text-white"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 538,
              letterSpacing: "-0.032em",
            }}
          >
            AI 자동 분류 시스템
          </h2>
          <TriageHub />
        </div>
      </section>
    </main>
  );
}
