export function Container({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4 pb-36">
      { children }
    </div>
  )
}