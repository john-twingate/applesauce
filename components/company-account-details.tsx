"use client"

import { useState } from "react"
import type { CompanyAccount } from "../types/company-account"
import { CompanyAccountForm } from "./company-account-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CompanyAccountDetailsProps {
  account: CompanyAccount
  onUpdate: (account: CompanyAccount) => void
}

export function CompanyAccountDetails({ account, onUpdate }: CompanyAccountDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedAccount: CompanyAccount) => {
    onUpdate(updatedAccount)
    setIsEditing(false)
  }

  if (isEditing) {
    return <CompanyAccountForm onSubmit={handleUpdate} initialData={account} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{account.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Industry:</strong> {account.industry}
          </p>
          <p>
            <strong>LinkedIn URL:</strong>{" "}
            <a href={account.linkedinUrl} target="_blank" rel="noopener noreferrer">
              {account.linkedinUrl}
            </a>
          </p>
          <p>
            <strong>Headcount:</strong> {account.headcount}
          </p>
          <p>
            <strong>AE Owner:</strong> {account.aeOwner}
          </p>
          <p>
            <strong>SDR Owner:</strong> {account.sdrOwner}
          </p>
          <p>
            <strong>Existing Solution:</strong> {account.existingSolution}
          </p>
          <p>
            <strong>Notes:</strong> {account.notes}
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="mt-4">
          Edit
        </Button>
      </CardContent>
    </Card>
  )
}

