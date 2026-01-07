// lib/claude.ts
// Claude API 연동 모듈 (Anthropic SDK 직접 사용)

import Anthropic from '@anthropic-ai/sdk';

// Anthropic Client 인스턴스 (싱글톤)
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 입찰 공고 분석
export async function analyzeBid(bidText: string) {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `당신은 Pool SI(로봇 시스템 통합) 전문 입찰 분석가입니다.
입찰 공고를 정확히 분석하고 JSON 형식으로 정리합니다.
- 사업개요: 사업명, 발주처, 예산, 기간 등 핵심 정보 추출
- 요구설비: 품명, 규격, 수량을 표로 정리
- 평가기준: 평가 항목과 배점 구조화
- 제출서류: 필수/선택 서류 목록
- UNIO추천: Pool SI 관점에서 입찰 적합도, 경쟁률, 권장전략 분석

JSON 외 다른 텍스트 없이 순수 JSON만 반환하세요.`,
    messages: [
      {
        role: 'user',
        content: `다음 입찰 공고를 분석해서 JSON 형식으로 정리해주세요.

입찰 공고:
${bidText}

다음 JSON 형식으로만 응답하세요 (다른 텍스트 없이):
{
  "사업개요": {
    "사업명": "",
    "발주처": "",
    "공고번호": "",
    "예산": "",
    "사업기간": "",
    "납품장소": "",
    "입찰마감": "",
    "계약방식": ""
  },
  "요구설비": [
    {
      "품명": "",
      "규격": "",
      "수량": "",
      "단위": "",
      "비고": ""
    }
  ],
  "핵심요구사항": [],
  "평가기준": [
    {
      "항목": "",
      "배점": "",
      "세부기준": ""
    }
  ],
  "제출서류": [
    {
      "서류명": "",
      "필수여부": "필수/선택",
      "비고": ""
    }
  ],
  "주의사항": [],
  "UNIO추천": {
    "적합도": "상/중/하",
    "예상경쟁률": "",
    "권장전략": "",
    "예상소요비용": ""
  }
}`,
      },
    ],
  });

  // ContentBlock[]에서 텍스트 추출
  const textBlock = message.content.find((block) => block.type === 'text');
  const text = textBlock && textBlock.type === 'text' ? textBlock.text : '';

  try {
    // JSON 추출 (코드 블록 제거)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('JSON not found in response');
  } catch (e) {
    console.error('Parse error:', e);
    return { error: 'Failed to parse response', raw: text };
  }
}

// 정부 증빙 문서 생성
export async function generateComplianceDoc(data: {
  projectName: string;
  period: string;
  metrics: Record<string, any>;
  template: string;
}) {
  const message = await client.messages.create({
    model: 'claude-3-5-haiku-20241022',
    max_tokens: 4096,
    system: `정부 지원사업 증빙 문서 작성 전문가입니다.
요구사항에 맞는 정확한 양식으로 문서를 구조화합니다.`,
    messages: [
      {
        role: 'user',
        content: `정부 지원사업 증빙 문서를 작성해주세요.

프로젝트: ${data.projectName}
기간: ${data.period}
성과 데이터: ${JSON.stringify(data.metrics, null, 2)}
양식: ${data.template}

다음 JSON 형식으로 응답해주세요:
{
  "문서제목": "",
  "작성일": "",
  "섹션": [
    {
      "제목": "",
      "내용": "",
      "표데이터": []
    }
  ],
  "첨부자료": [],
  "서명란": {}
}`,
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  const text = textBlock && textBlock.type === 'text' ? textBlock.text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Parse failed' };
}

// 고객 리포트 생성
export async function generateCustomerReport(data: {
  clientName: string;
  period: { start: string; end: string };
  jobs: any[];
  assets: any[];
  events: any[];
}) {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `Pool SI 전문 고객 리포트 작성 전문가입니다.
작업 데이터, 설비 현황, 이벤트 로그를 분석하여 월간 리포트를 생성합니다.`,
    messages: [
      {
        role: 'user',
        content: `Pool SI 고객사 월간 리포트를 작성해주세요.

고객사: ${data.clientName}
기간: ${data.period.start} ~ ${data.period.end}

작업 데이터:
${JSON.stringify(data.jobs, null, 2)}

설비 데이터:
${JSON.stringify(data.assets, null, 2)}

이벤트 데이터:
${JSON.stringify(data.events, null, 2)}

다음 JSON 형식으로 응답해주세요:
{
  "리포트제목": "",
  "요약": {
    "핵심성과": [],
    "주요이슈": [],
    "권고사항": []
  },
  "KPI": {
    "가동률": "",
    "불량률": "",
    "MTBF": "",
    "MTTR": ""
  },
  "상세분석": {
    "설비현황": "",
    "작업실적": "",
    "이상징후": ""
  },
  "다음달예측": {
    "예상이슈": [],
    "권장조치": []
  }
}`,
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  const text = textBlock && textBlock.type === 'text' ? textBlock.text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Parse failed' };
}

// 예방 정비 분석
export async function analyzeMaintenanceSchedule(assets: any[], events: any[]) {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: `설비 정비 전문가입니다.
설비 이력과 이벤트 데이터를 분석하여 예방 정비 스케줄을 최적화합니다.`,
    messages: [
      {
        role: 'user',
        content: `설비 데이터를 분석해서 예방 정비 스케줄을 생성해주세요.

설비 목록:
${JSON.stringify(assets, null, 2)}

이벤트 이력:
${JSON.stringify(events, null, 2)}

다음 JSON 형식으로 응답해주세요:
{
  "분석요약": "",
  "정비스케줄": [
    {
      "assetId": "",
      "assetName": "",
      "권장정비일": "",
      "정비유형": "",
      "예상비용": "",
      "우선순위": "상/중/하",
      "근거": ""
    }
  ],
  "부품발주": [
    {
      "부품명": "",
      "수량": "",
      "예상비용": "",
      "발주기한": ""
    }
  ],
  "리스크경고": []
}`,
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  const text = textBlock && textBlock.type === 'text' ? textBlock.text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: 'Parse failed' };
}

export default client;
