"use client"

import { useState } from "react"
import type { CompanyAccount } from "../types/company-account"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CompanyAccountForm } from "./company-account-form"

interface CompanyAccountListProps {
  accounts: CompanyAccount[]
  onUpdate: (account: CompanyAccount) => void
}

export function CompanyAccountList({ accounts, onUpdate }: CompanyAccountListProps) {
  const [selectedAccount, setSelectedAccount] = useState<CompanyAccount | null>(null)

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <Card key={account.id}>
          <CardHeader>
            <CardTitle>{account.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Industry:</strong> {account.industry}
            </p>
            <p>
              <strong>Size:</strong> {account.size}
            </p>
            <p>
              <strong>Existing Solution:</strong> {account.existingSolution}
            </p>
            <p>
              <strong>Priorities:</strong> {account.priorities.join(", ")}
            </p>
            <p>
              <strong>Notes:</strong> {account.notes}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setSelectedAccount(account)}>
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Company Account</DialogTitle>
                </DialogHeader>
                {selectedAccount && (
                  <CompanyAccountForm
                    initialData={selectedAccount}
                    onSubmit={(data) => {
                      onUpdate({ ...data, id: selectedAccount.id })
                      setSelectedAccount(null)
                    }}
                  />
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

