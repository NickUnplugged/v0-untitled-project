"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const states = [
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
  { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal-pradesh", label: "Himachal Pradesh" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west-bengal", label: "West Bengal" },
  { value: "delhi", label: "Delhi" },
  { value: "jammu-kashmir", label: "Jammu & Kashmir" },
  { value: "ladakh", label: "Ladakh" },
]

export default function StateSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const router = useRouter()

  const handleSelect = (currentValue: string) => {
    setValue(currentValue)
    setOpen(false)
    router.push(`/explore/${currentValue}`)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Select a State to Explore</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800 hover:border-amber-500/50"
          >
            {value ? states.find((state) => state.value === value)?.label : "Select state..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-zinc-900 border-zinc-700">
          <Command className="bg-zinc-900">
            <CommandInput placeholder="Search states..." className="text-white" />
            <CommandList>
              <CommandEmpty className="text-zinc-400">No state found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-y-auto">
                {states.map((state) => (
                  <CommandItem
                    key={state.value}
                    value={state.value}
                    onSelect={() => handleSelect(state.value)}
                    className="text-white hover:bg-zinc-800 aria-selected:bg-zinc-800"
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4 text-amber-500", value === state.value ? "opacity-100" : "opacity-0")}
                    />
                    {state.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        className="w-full bg-amber-500 text-black hover:bg-amber-600"
        disabled={!value}
        onClick={() => router.push(`/explore/${value}`)}
      >
        Explore Now
      </Button>
    </div>
  )
}
