export const queryKeys = {
  root: ['app'] as const,
  user: () => [...queryKeys.root, 'user'] as const,
  dashboard: () => [...queryKeys.root, 'dashboard'] as const,
  demo: () => [...queryKeys.root, 'prefetch-demo'] as const,
} as const
