// The token lives in sessionStorage: it disappears when the tab is closed.
const KEY = 'yakimachi-admin-token'

export const getToken = () => sessionStorage.getItem(KEY)
export const setToken = (t) => sessionStorage.setItem(KEY, t)
export const clearToken = () => sessionStorage.removeItem(KEY)

// Calls /api/admin/<path> with the token attached. Throws an Error (with .data from the
// server) for any non-2xx answer. If the server says our token is no longer valid,
// we clear it and tell the app to show the login screen again.
export async function adminFetch(path, { method = 'GET', body } = {}) {
  const token = getToken()
  const res = await fetch(`/api/admin${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  let data = null
  try {
    data = await res.json()
  } catch {
    /* empty or non-JSON body */
  }

  if (res.status === 401 && token) {
    clearToken()
    window.dispatchEvent(new Event('admin-logout'))
  }
  if (!res.ok) {
    const first = data?.errors ? Object.values(data.errors)[0] : null
    throw Object.assign(new Error(data?.error || first || 'Request failed'), { status: res.status, data })
  }
  return data
}

export const londonToday = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date())
