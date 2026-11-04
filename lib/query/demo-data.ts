export type DemoQueryData = {
  message: string
  at: string
}

export function loadDemoData(): Promise<DemoQueryData> {
  return Promise.resolve({
    message: 'Z0 web template',
    at: new Date().toISOString(),
  })
}
