export type EventName =
  | 'page_view'
  | 'cta_click'
  | 'nav_click'
  | 'form_submit'
  | 'form_error'
  | 'auth_sign_in'
  | 'auth_sign_out'

export type EventProps = {
  page_view: {
    path: string
    search?: string
  }
  cta_click: {
    label: string
    href?: string
    location: string
  }
  nav_click: {
    label: string
    href: string
  }
  form_submit: {
    form: string
  }
  form_error: {
    form: string
    code: string
  }
  auth_sign_in: Record<string, never>
  auth_sign_out: Record<string, never>
}
