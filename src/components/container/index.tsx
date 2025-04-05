export function Container({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-screen-xl mx-auto py-4 pb-36 px-4 sm:px-6 lg:px-8">
      { children }
    </div>
  )
}