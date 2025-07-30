"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Edit, Trash2, Plus } from "lucide-react"
import AccountLayout from "@/components/AccountLayout"
import { useEffect } from "react"

// Mock addresses data
const addresses = [
  {
    id: 1,
    type: "Home",
    name: "Md Rimel",
    address: "123 Main Street, Kingston, NY 12401, United States",
    phone: "+1 (555) 123-4567",
    isDefault: true
  },
  {
    id: 2,
    type: "Office",
    name: "Md Rimel",
    address: "456 Business Ave, New York, NY 10001, United States",
    phone: "+1 (555) 987-6543",
    isDefault: false
  },
  {
    id: 3,
    type: "Home",
    name: "Md Rimel",
    address: "789 Residential Blvd, Brooklyn, NY 11201, United States",
    phone: "+1 (555) 456-7890",
    isDefault: false
  }
]

export default function AddressPage() {
  useEffect(() => {
    document.title = "Address Book | E-Store";
  }, []);

  return (
    <AccountLayout 
      title="Address Book"
      breadcrumbItems={[
        { label: "Address Book", isCurrent: true }
      ]}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-red-500">Address Book</h2>
        <Button className="bg-red-500 hover:bg-red-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>
      
      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{address.name}</h3>
                    <Badge className="bg-gray-100 text-gray-800">
                      {address.type}
                    </Badge>
                    {address.isDefault && (
                      <Badge className="bg-green-100 text-green-800">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{address.address}</p>
                  <p className="text-sm text-gray-500">{address.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-gray-300">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Trash
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {addresses.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Addresses Yet</h3>
          <p className="text-gray-600 mb-6">You haven't added any addresses yet.</p>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Address
          </Button>
        </div>
      )}
    </AccountLayout>
  )
} 