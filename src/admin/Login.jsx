import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/AppStore'
import { Icon, LogoMark, Field, Input } from '../components/ui'

export default function Login() {
  const { signIn } = useStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Enter both fields to continue.')
      return
    }
    signIn(username.trim())
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-margin-mobile py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 justify-center mb-8">
          <LogoMark />
          <span className="font-headline-md text-headline-md font-black text-electric-gold italic tracking-tighter">
            IMMC
          </span>
        </div>

        <div className="bg-surface-charcoal border border-white/5 inner-glow rounded p-8">
          <span className="font-label-bold text-label-bold uppercase text-electric-gold block mb-2">
            Staff Portal
          </span>
          <h1 className="font-headline-md text-2xl uppercase text-primary mb-6">Sign in</h1>

          <form onSubmit={submit} className="space-y-5">
            <Field label="Username">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="reception"
                autoFocus
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </Field>

            {error && <p className="text-intensity-red text-label-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-electric-gold text-void-black font-label-bold text-label-bold uppercase py-4 rounded hover:scale-[0.98] transition-transform"
            >
              Sign in
            </button>
          </form>

          {/* Stated plainly so the owner is never misled about what this is. */}
          <div className="mt-6 pt-6 border-t border-surface-container-high flex gap-3 text-secondary/60">
            <Icon name="info" className="text-[18px] shrink-0 mt-0.5" />
            <p className="text-label-sm">
              Demo build — this gate is not real authentication. Any username and password will
              sign you in, and nothing is stored.
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 font-label-bold text-label-bold uppercase text-secondary hover:text-electric-gold transition-colors"
        >
          <Icon name="arrow_back" className="text-[18px]" />
          Back to site
        </Link>
      </div>
    </div>
  )
}
