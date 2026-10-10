import { useState } from 'react'
import { adminFetch, setToken } from '../../lib/adminApi'

const input =
  'mt-1 w-full rounded border border-oak/60 bg-white px-3 py-2 text-sm focus:border-lantern focus:outline-none'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const { token } = await adminFetch('/login', { method: 'POST', body: { username, password } })
      setToken(token)
      onLogin()
    } catch (err) {
      setError(err.message)
    }
    setBusy(false)
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="font-display text-3xl font-bold">Admin login</h1>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <label className="block text-sm font-medium">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={input}
            autoComplete="username"
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={input}
            autoComplete="current-password"
          />
        </label>
        {error && <p className="text-sm text-lantern">{error}</p>}
        <button
          type="submit"
          disabled={busy || !username || !password}
          className="w-full rounded-full bg-lantern px-8 py-3 font-medium text-paper hover:bg-lantern/85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </div>
  )
}
