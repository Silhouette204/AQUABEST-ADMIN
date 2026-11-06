export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-5xl flex-1 flex-col px-6 py-10">
      {children}
      suppressHydrationWarning
    </div>
  )
}
