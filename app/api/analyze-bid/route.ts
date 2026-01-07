// app/api/analyze-bid/route.ts
import { analyzeBid } from '@/lib/claude';
import { createBidAnalysisExcel } from '@/lib/excel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { bidText, outputFormat = 'json' } = await req.json();

    if (!bidText || bidText.trim().length < 50) {
      return NextResponse.json(
        { error: '입찰 공고 내용이 너무 짧습니다. 최소 50자 이상 입력해주세요.' },
        { status: 400 }
      );
    }

    console.log('[Analyze-Bid] Analyzing bid with Claude AI...');
    const analysis = await analyzeBid(bidText);

    if (analysis.error) {
      return NextResponse.json(
        { error: '분석 중 오류가 발생했습니다.', details: analysis.error },
        { status: 500 }
      );
    }

    if (outputFormat === 'json') {
      return NextResponse.json({
        success: true,
        analysis,
        timestamp: new Date().toISOString(),
      });
    }

    if (outputFormat === 'excel') {
      const excelBuffer = await createBidAnalysisExcel(analysis);
      const filename = `입찰분석_${analysis.사업개요?.사업명?.substring(0, 20) || 'UNIO'}_${Date.now()}.xlsx`;

      return new NextResponse(excelBuffer as unknown as BodyInit, {
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
        },
      });
    }

    return NextResponse.json({ error: 'Invalid output format' }, { status: 400 });
  } catch (error) {
    console.error('[Analyze-Bid] Error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/analyze-bid',
    methods: ['POST'],
    description: '입찰 공고 분석 API (Claude AI + Excel 자동화)',
    parameters: {
      bidText: '입찰 공고 텍스트 (필수, 최소 50자)',
      outputFormat: 'json | excel (기본: json)',
    },
    features: [
      'Claude Sonnet 4 API',
      '입찰 공고 자동 분석',
      'UNIO 표준 6개 시트 엑셀 생성',
    ],
  });
}
