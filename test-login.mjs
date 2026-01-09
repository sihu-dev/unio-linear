import { chromium } from 'playwright';

async function testLogin() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n=== UNIO 로그인 테스트 시작 ===\n');

  // 1. 로그인 페이지 접근
  console.log('1. 로그인 페이지 접근 테스트...');
  try {
    await page.goto('https://unio-linear.vercel.app/auth/login', { waitUntil: 'networkidle', timeout: 30000 });
    const url = page.url();
    console.log('   현재 URL: ' + url);

    const title = await page.title();
    console.log('   페이지 타이틀: ' + title);

    const emailInput = await page.$('input[type="email"]');
    const passwordInput = await page.$('input[type="password"]');
    const submitButton = await page.$('button[type="submit"]');

    console.log('   이메일 입력란: ' + (emailInput ? '✅' : '❌'));
    console.log('   비밀번호 입력란: ' + (passwordInput ? '✅' : '❌'));
    console.log('   로그인 버튼: ' + (submitButton ? '✅' : '❌'));

    const registerLink = await page.$('a[href*="register"]');
    console.log('   회원가입 링크: ' + (registerLink ? '✅' : '❌'));

  } catch (e) {
    console.log('   ❌ 오류: ' + e.message);
  }

  // 2. 회원가입 페이지 접근
  console.log('\n2. 회원가입 페이지 접근 테스트...');
  try {
    await page.goto('https://unio-linear.vercel.app/auth/register', { waitUntil: 'networkidle', timeout: 30000 });
    const url = page.url();
    console.log('   현재 URL: ' + url);

    const nameInput = await page.$('input[name="name"]');
    const emailInput = await page.$('input[type="email"]');
    const passwordInput = await page.$('input[type="password"]');
    const companyInput = await page.$('input[name="company"]');

    console.log('   이름 입력란: ' + (nameInput ? '✅' : '❌'));
    console.log('   이메일 입력란: ' + (emailInput ? '✅' : '❌'));
    console.log('   비밀번호 입력란: ' + (passwordInput ? '✅' : '❌'));
    console.log('   회사명 입력란: ' + (companyInput ? '✅' : '❌'));

  } catch (e) {
    console.log('   ❌ 오류: ' + e.message);
  }

  // 3. 대시보드 접근 (비로그인)
  console.log('\n3. 대시보드 접근 테스트 (비로그인)...');
  try {
    await page.goto('https://unio-linear.vercel.app/dashboard', { waitUntil: 'networkidle', timeout: 30000 });
    const url = page.url();
    console.log('   현재 URL: ' + url);

    if (url.includes('/auth/login')) {
      console.log('   ✅ 로그인 페이지로 리다이렉트됨 (정상)');
    } else if (url.includes('/dashboard')) {
      console.log('   ⚠️ 대시보드에 직접 접근됨 (미들웨어 확인 필요)');
    }

  } catch (e) {
    console.log('   ❌ 오류: ' + e.message);
  }

  // 4. 랜딩 페이지 확인
  console.log('\n4. 랜딩 페이지 확인...');
  try {
    await page.goto('https://unio-linear.vercel.app/', { waitUntil: 'networkidle', timeout: 30000 });
    const url = page.url();
    console.log('   현재 URL: ' + url);

    try {
      const heroText = await page.$eval('h1', el => el.textContent);
      console.log('   Hero 텍스트: ' + (heroText ? heroText.substring(0, 50) + '...' : '없음'));
    } catch {
      console.log('   Hero 텍스트: 찾을 수 없음');
    }

  } catch (e) {
    console.log('   ❌ 오류: ' + e.message);
  }

  console.log('\n=== 테스트 완료 ===\n');

  await browser.close();
}

testLogin().catch(console.error);
