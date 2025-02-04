"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { CompanyAccount } from "../types/company-account"

const formSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  linkedinUrl: z.string().url("Must be a valid URL"),
  headcount: z.string(),
  aeOwner: z.string(),
  sdrOwner: z.string(),
  existingSolution: z.string(),
  notes: z.string(),
})

interface CompanyAccountFormProps {
  onSubmit: (data: CompanyAccount) => void
  initialData?: CompanyAccount
}

export function CompanyAccountForm({ onSubmit, initialData }: CompanyAccountFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CompanyAccount>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      industry: "",
      linkedinUrl: "",
      headcount: "",
      aeOwner: "",
      sdrOwner: "",
      existingSolution: "",
      notes: "",
    },
  })

  const handleSubmit = async (data: CompanyAccount) => {
    setIsSubmitting(true)
    await onSubmit(data)
    setIsSubmitting(false)
    if (!initialData) {
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="headcount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headcount</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aeOwner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AE Owner</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sdrOwner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SDR Owner</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="existingSolution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Existing Solution</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : initialData ? "Update Account" : "Add Account"}
        </Button>
      </form>
    </Form>
  )
}

