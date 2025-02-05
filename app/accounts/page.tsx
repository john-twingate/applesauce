"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { CompanyAccountDetails } from "@/components/company-account-details"
import type { CompanyAccount } from "../../types/company-account"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card} from '@/components/ui/card-component'

import { Form, FormField, FormLabel, FormMessage } from '@/components/ui/form'

export default function AccountPage() {
  const [account, setAccount] = useState<CompanyAccount | null>(null)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const fetchAccount = async () => {
      if (typeof id !== "string") return
      const docRef = doc(db, "companyAccounts", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setAccount({ id: docSnap.id, ...docSnap.data() } as CompanyAccount)
      }
    }
    fetchAccount()
  }, [id])

  const handleUpdate = async (updatedAccount: CompanyAccount) => {
    if (!account?.id) return
    const docRef = doc(db, "companyAccounts", account.id)
    await updateDoc(docRef, updatedAccount)
    setAccount(updatedAccount)
  }

  if (!account) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Account Details</h1>
      <CompanyAccountDetails account={account} onUpdate={handleUpdate} />
    </div>
  )
}

