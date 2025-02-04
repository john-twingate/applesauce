"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "./firebase"
import type { CompanyAccount } from "./types/company-account"
import { CompanyAccountForm } from "./components/company-account-form"
import { useAuth } from "./contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth"
import { auth } from "./firebase"
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui/form'

export default function Home() {
  const [accounts, setAccounts] = useState<CompanyAccount[]>([])
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      fetchAccounts()
    }
  }, [user, loading, router])

  const fetchAccounts = async () => {
    const querySnapshot = await getDocs(collection(db, "companyAccounts"))
    const fetchedAccounts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as CompanyAccount)
    setAccounts(fetchedAccounts)
  }

  const handleAddAccount = async (data: CompanyAccount) => {
    try {
      await addDoc(collection(db, "companyAccounts"), data)
      await fetchAccounts()
    } catch (error) {
      console.error("Error adding document: ", error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Company Accounts Manager</h1>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Account</h2>
          <CompanyAccountForm onSubmit={handleAddAccount} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link href="/search">
              <Button className="w-full">Search Companies</Button>
            </Link>
            <h3 className="text-xl font-semibold mt-4 mb-2">Recent Accounts</h3>
            {accounts.slice(0, 5).map((account) => (
              <Link key={account.id} href={`/accounts/${account.id}`}>
                <Button variant="outline" className="w-full text-left">
                  {account.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

