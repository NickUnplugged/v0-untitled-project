"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const regions = [
  { value: "east-asia", label: "East Asia" },
  { value: "south-asia", label: "South Asia" },
  { value: "southeast-asia", label: "Southeast Asia" },
  { value: "central-asia", label: "Central Asia" },
  { value: "middle-east", label: "Middle East" },
  { value: "eastern-europe", label: "Eastern Europe" },
  { value: "western-europe", label: "Western Europe" },
  { value: "northern-europe", label: "Northern Europe" },
  { value: "southern-europe", label: "Southern Europe" },
  { value: "north-africa", label: "North Africa" },
  { value: "west-africa", label: "West Africa" },
  { value: "east-africa", label: "East Africa" },
  { value: "southern-africa", label: "Southern Africa" },
  { value: "central-africa", label: "Central Africa" },
  { value: "north-america", label: "North America" },
  { value: "central-america", label: "Central America" },
  { value: "south-america", label: "South America" },
  { value: "caribbean", label: "Caribbean" },
  { value: "oceania", label: "Oceania" },
]

export default function RegionSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const router = useRouter()

  const handleSelect = (currentValue: string) => {
    setValue(currentValue)
    setOpen(false)
    // In a real app, this would navigate to the region page
    // router.push(`/explore/${currentValue}`)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select a Region to Explore</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white text-black"
          >
            {value ? regions.find((region) => region.value === value)?.label : "Select region..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search regions..." />
            <CommandList>
              <CommandEmpty>No region found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {regions.map((region) => (
                  <CommandItem key={region.value} value={region.value} onSelect={() => handleSelect(region.value)}>
                    <Check className={cn("mr-2 h-4 w-4", value === region.value ? "opacity-100" : "opacity-0")} />
                    {region.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button className="w-full" disabled={!value}>
        Explore Now
      </Button>
    </div>
  )
}
