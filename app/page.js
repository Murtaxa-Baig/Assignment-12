import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          marginTop: '100px'
        }}>
        <h1>
          Github API implementation in Nextjs
        </h1>

        <Link href="/github">
          <button
          style={{
            border:'none',
            borderRadius:'20px',
            fontSize:'24px',
            padding:'20px',
            backgroundColor:'gray'

          }}
          >
            Show details
          </button>
        </Link>
      </div>
    </>
  )
}
