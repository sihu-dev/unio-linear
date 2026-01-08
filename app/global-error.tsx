'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="ko">
      <body>
        <div style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#08090A',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            심각한 오류가 발생했습니다
          </h1>
          <p style={{ marginTop: '1rem', color: '#9ca3af' }}>
            페이지를 새로고침하거나 잠시 후 다시 시도해 주세요.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: '2rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#5E6AD2',
              color: 'white',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  )
}
