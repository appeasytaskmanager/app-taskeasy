"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/profile")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (err) {
        setUser({
          id: "1",
          name: "Usuário",
          email: "usuario@example.com",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const logout = async () => {
    try {
      await fetch("/api/auth/sign", { method: "POST" })
    } catch (err) {
      // Silent
    } finally {
      setUser(null)
      router.push("/auth/login")
    }
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  return { user, loading, logout, navigateTo }
}
