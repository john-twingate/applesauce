"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormLabel, FormMessage } from '@/components/ui/form'

// This is a mock of the company list. In a real application, you'd fetch this from an API or database.
const companyList = [
  { name: "1stDibs", linkedinUrl: "http://www.linkedin.com/company/1stdibs" },
  { name: "360Learning", linkedinUrl: "http://www.linkedin.com/company/360learning" },
  // ... add all other companies here
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState(companyList)

  const handleSearch = () => {
    const results = companyList.filter(
      (company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.linkedinUrl.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setSearchResults(results)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Search Companies</h1>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Search by company name or LinkedIn URL"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="space-y-2">
        {searchResults.map((company, index) => (
          <div key={index} className="p-4 border rounded">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            <a
              href={company.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {company.linkedinUrl}
            </a>
            <Link
              href={`/accounts/new?name=${encodeURIComponent(company.name)}&linkedinUrl=${encodeURIComponent(company.linkedinUrl)}`}
            >
              <Button className="mt-2">Add to Accounts</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

