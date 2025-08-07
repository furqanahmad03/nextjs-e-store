"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AccountLayout from "@/components/AccountLayout"
import { useEffect } from "react"

// Mock user data
const userData = {
  firstName: "Md",
  lastName: "Rimel",
  email: "rimell111@gmail.com",
  address: "Kingston, 5236, United State",
}

export default function ProfilePage() {
  useEffect(() => {
    document.title = "My Profile | E-Store";
  }, []);

  return (
    <AccountLayout 
      title="Edit Your Profile"
      breadcrumbItems={[
        { label: "My Profile", isCurrent: true }
      ]}
    >
      <h2 className="text-xl font-bold text-red-500 mb-6">Edit Your Profile</h2>
      
      <form className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              defaultValue={userData.firstName}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              defaultValue={userData.lastName}
              className="mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={userData.email}
              className="mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              Address
            </Label>
            <Input
              id="address"
              type="text"
              defaultValue={userData.address}
              className="mt-1"
            />
          </div>
        </div>

        {/* Password Changes */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Changes</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button 
            type="button" 
            variant="outline" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </AccountLayout>
  )
} 