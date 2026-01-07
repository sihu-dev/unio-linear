// app/api/generate-excel/route.ts
import { createBidAnalysisExcel, createFullUNIOTemplate } from "@/lib/excel";
import ExcelJS from "exceljs";
import { NextRequest, NextResponse } from "next/server";

type ExcelType = "template" | "bid" | "compliance" | "report" | "maintenance";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data, filename }: { type: ExcelType; data?: any; filename?: string } = body;

    let buffer: Buffer;
    let defaultFilename: string;

    switch (type) {
      case "template":
        buffer = await createFullUNIOTemplate();
        defaultFilename = `UNIO_템플릿_${Date.now()}.xlsx`;
        break;

      case "bid":
        if (!data) {
          return NextResponse.json({ error: "data is required for bid type" }, { status: 400 });
        }
        buffer = await createBidAnalysisExcel(data);
        defaultFilename = `입찰분석_${Date.now()}.xlsx`;
        break;

      case "compliance":
        buffer = await generateComplianceExcel(data);
        defaultFilename = `정부증빙_${Date.now()}.xlsx`;
        break;

      case "report":
        buffer = await generateReportExcel(data);
        defaultFilename = `고객리포트_${Date.now()}.xlsx`;
        break;

      case "maintenance":
        buffer = await generateMaintenanceExcel(data);
        defaultFilename = `정비스케줄_${Date.now()}.xlsx`;
        break;

      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const finalFilename = filename || defaultFilename;

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(finalFilename)}"`,
      },
    });
  } catch (error) {
    console.error("[Generate-Excel] Error:", error);
    return NextResponse.json(
      { error: "엑셀 생성 중 오류가 발생했습니다.", details: String(error) },
      { status: 500 }
    );
  }
}

async function generateComplianceExcel(data: any): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "UNIO Platform";

  const sheet1 = workbook.addWorksheet("성과보고서");
  sheet1.columns = [
    { header: "항목", key: "item", width: 25 },
    { header: "목표", key: "target", width: 20 },
    { header: "실적", key: "actual", width: 20 },
    { header: "달성률", key: "rate", width: 15 },
    { header: "비고", key: "note", width: 30 },
  ];

  const metrics = data?.metrics || {};
  const rows = [
    {
      item: "매출액",
      target: metrics.targetRevenue || "-",
      actual: metrics.actualRevenue || "-",
      rate: "-",
      note: "",
    },
    {
      item: "고용 인원",
      target: metrics.targetEmployees || "-",
      actual: metrics.actualEmployees || "-",
      rate: "-",
      note: "",
    },
    {
      item: "설비 가동률",
      target: "95%",
      actual: metrics.uptime || "-",
      rate: "-",
      note: "",
    },
    {
      item: "불량률",
      target: "5% 이하",
      actual: metrics.defectRate || "-",
      rate: "-",
      note: "",
    },
  ];
  rows.forEach((row) => sheet1.addRow(row));

  const sheet2 = workbook.addWorksheet("집행내역");
  sheet2.columns = [
    { header: "일자", key: "date", width: 12 },
    { header: "항목", key: "item", width: 25 },
    { header: "금액(원)", key: "amount", width: 15 },
    { header: "증빙유형", key: "evidenceType", width: 15 },
    { header: "증빙번호", key: "evidenceNo", width: 20 },
    { header: "비고", key: "note", width: 25 },
  ];

  const expenses = data?.expenses || [];
  expenses.forEach((exp: any) => sheet2.addRow(exp));

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

async function generateReportExcel(data: any): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "UNIO Platform";

  const sheet1 = workbook.addWorksheet("요약");
  sheet1.columns = [
    { header: "항목", key: "item", width: 20 },
    { header: "내용", key: "content", width: 50 },
  ];

  const summary = data?.summary || {};
  sheet1.addRow({ item: "고객사", content: data?.clientName || "-" });
  sheet1.addRow({
    item: "기간",
    content: `${data?.period?.start || ""} ~ ${data?.period?.end || ""}`,
  });
  sheet1.addRow({ item: "가동률", content: summary.uptime || "-" });
  sheet1.addRow({ item: "불량률", content: summary.defectRate || "-" });
  sheet1.addRow({ item: "완료 작업", content: summary.completedJobs || "-" });

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

async function generateMaintenanceExcel(data: any): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "UNIO Platform";

  const sheet1 = workbook.addWorksheet("정비스케줄");
  sheet1.columns = [
    { header: "설비 ID", key: "assetId", width: 12 },
    { header: "설비명", key: "assetName", width: 20 },
    { header: "정비 유형", key: "maintenanceType", width: 15 },
    { header: "권장일", key: "recommendedDate", width: 12 },
    { header: "우선순위", key: "priority", width: 10 },
    { header: "예상 비용", key: "estimatedCost", width: 15 },
    { header: "담당자", key: "assignee", width: 12 },
    { header: "상태", key: "status", width: 10 },
  ];

  const schedule = data?.schedule || [];
  schedule.forEach((item: any) => sheet1.addRow(item));

  const sheet2 = workbook.addWorksheet("부품발주");
  sheet2.columns = [
    { header: "부품명", key: "partName", width: 25 },
    { header: "수량", key: "quantity", width: 10 },
    { header: "단가", key: "unitPrice", width: 15 },
    { header: "금액", key: "amount", width: 15 },
    { header: "발주기한", key: "orderDeadline", width: 12 },
    { header: "공급사", key: "supplier", width: 20 },
  ];

  const parts = data?.parts || [];
  parts.forEach((part: any) => sheet2.addRow(part));

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/generate-excel",
    methods: ["POST"],
    description: "UNIO 엑셀 생성 API",
    types: {
      template: "UNIO 6개 시트 빈 템플릿",
      bid: "입찰 분석 결과 엑셀",
      compliance: "정부 증빙 엑셀",
      report: "고객 리포트 엑셀",
      maintenance: "정비 스케줄 엑셀",
    },
    parameters: {
      type: "template | bid | compliance | report | maintenance (필수)",
      data: "엑셀 데이터 (type에 따라 구조 상이)",
      filename: "저장할 파일명 (옵션)",
    },
  });
}
