export function Container({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-screen-xl mx-auto py-4 pb-36" style={{ height: "calc(100vh - 80px)" }}>
      { children }
    </div>
  )
}