interface RoutesI {
  path: string
  component: () => JSX.Element
  id: number
  functionality?: number
  permission?: number
}

export const routes: RoutesI[] = []
