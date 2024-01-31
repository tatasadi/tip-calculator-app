"use client"
import Image from "next/image"
import Reference from "@/components/Reference"
import logo from "@/public/images/logo.svg"
import Input from "@/components/ui/InputWithLabelAndIcon"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { z } from "zod"

const formSchema = z.object({
  bill: z
    .number({ invalid_type_error: "Should be a Number" })
    .min(0, "Should be a positive number"),
  customTip: z
    .number({ invalid_type_error: "Should be a Number" })
    .min(0, "Should be a positive number")
    .max(100, "Should be less than 100"),
  numberOfPeople: z
    .number({ invalid_type_error: "Should be a Number" })
    .min(1, "Can't be zero"),
})

const initState = {
  bill: "",
  customTip: "",
  numberOfPeople: "",
  tipPercent: 0,
  tipAmount: 0,
  touched: {
    // Add a touched state to track if the user has interacted with the inputs
    bill: false,
    customTip: false,
    numberOfPeople: false,
  },
}
export default function Home() {
  const [state, setState] = useState(initState)
  const [errors, setErrors] = useState({
    bill: [] as string[],
    customTip: [] as string[],
    numberOfPeople: [] as string[],
  })
  const { bill, customTip, numberOfPeople, tipAmount, tipPercent } = state
  const tipTotal = tipAmount * Number(numberOfPeople)

  useEffect(() => {
    const toValidate = {
      bill: Number(bill),
      numberOfPeople: Number(numberOfPeople),
      customTip: 0,
    }
    if (tipPercent === 0) {
      toValidate.customTip = Number(customTip)
    }

    const result = formSchema.safeParse(toValidate)

    if (result.success) {
      // calculate tip
      const billAmount = Number(bill)
      const tipPercentAmount =
        (tipPercent > 0 ? tipPercent : Number(customTip)) / 100
      const tipAmount = billAmount * tipPercentAmount
      setState((prevState) => ({
        ...prevState,
        tipAmount,
      }))
    } else {
      const newErrors = result.error.flatten().fieldErrors
      setErrors({
        bill: newErrors.bill || [],
        customTip: newErrors.customTip || [],
        numberOfPeople: newErrors.numberOfPeople || [],
      })
    }
  }, [bill, customTip, numberOfPeople, tipPercent])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      touched: { ...prevState.touched, [name]: true },
    }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
    if (name === "customTip") {
      setState((prevState) => ({
        ...prevState,
        tipPercent: 0,
      }))
    }
  }

  const handleTipChange = (tipPercent: number) => {
    setState((prevState) => ({
      ...prevState,
      tipPercent,
      customTip: "",
    }))
  }

  const handleReset = () => {
    setState(initState)
    setErrors({
      bill: [] as string[],
      customTip: [] as string[],
      numberOfPeople: [] as string[],
    })
  }

  return (
    <main className="flex h-full min-h-screen w-full max-w-7xl flex-col items-center pt-[3.125rem] lg:min-h-0 lg:pt-[10.19rem]">
      <h1 className="sr-only">Splitter</h1>
      <div className="flex flex-col items-center justify-end gap-[2.554rem] lg:gap-[5.4915rem]">
        <Image src={logo} alt="logo" />
        <div className="flex flex-col gap-8 rounded-t-[1.5625rem] bg-white py-8 shadow-[0_32px_43px_0_rgba(79,166,175,0.20)] sm:rounded-[1.5625rem] lg:max-w-[57.5rem] lg:flex-row lg:items-stretch lg:gap-12">
          <div className="flex flex-col gap-8 px-8 lg:w-1/2 lg:py-12 lg:pl-12 lg:pr-0">
            <Input
              name="bill"
              label="Bill"
              value={bill}
              onChange={handleChange}
              type="text"
              iconSrc="/images/icon-dollar.svg"
              iconAlt="Dollar Icon"
              placeholder="0"
              errors={state.touched.bill ? errors.bill : []}
              showErrors={true}
            />
            <div>
              <p className="text-neutral-dark-grayish-cyan mb-4">
                Select Tip %
              </p>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                <Button
                  variant="cyan"
                  onClick={() => handleTipChange(5)}
                  className={tipPercent === 5 ? "tip-active" : ""}
                >
                  5%
                </Button>
                <Button
                  variant="cyan"
                  onClick={() => handleTipChange(10)}
                  className={tipPercent === 10 ? "tip-active" : ""}
                >
                  10%
                </Button>
                <Button
                  variant="cyan"
                  onClick={() => handleTipChange(15)}
                  className={tipPercent === 15 ? "tip-active" : ""}
                >
                  15%
                </Button>
                <Button
                  variant="cyan"
                  onClick={() => handleTipChange(25)}
                  className={tipPercent === 25 ? "tip-active" : ""}
                >
                  25%
                </Button>
                <Button
                  variant="cyan"
                  onClick={() => handleTipChange(50)}
                  className={tipPercent === 50 ? "tip-active" : ""}
                >
                  50%
                </Button>
                <Input
                  name="customTip"
                  label=""
                  type="text"
                  value={customTip}
                  onChange={handleChange}
                  placeholder="Custom"
                  className="placeholder:text-neutral-dark-cyan cursor-pointer text-center"
                  errors={state.touched.customTip ? errors.customTip : []}
                />
              </div>
            </div>
            <Input
              name="numberOfPeople"
              label="Number of People"
              value={numberOfPeople}
              onChange={handleChange}
              type="text"
              iconSrc="/images/icon-person.svg"
              iconAlt="Person Icon"
              placeholder="0"
              errors={state.touched.numberOfPeople ? errors.numberOfPeople : []}
              showErrors={true}
            />
          </div>
          <div className="px-6 lg:w-1/2 lg:py-8 lg:pl-0 lg:pr-8">
            <div className="bg-neutral-very-dark-cyan flex flex-col rounded-[0.9375rem] px-6 pb-6 pt-[2.44rem] lg:h-full">
              <div className="mb-[1.31rem] flex justify-between font-bold">
                <p className="text-white">
                  Tip Amount
                  <span className="text-neutral-grayish-cyan block text-[0.8125rem]">
                    / person
                  </span>
                </p>
                <p className="text-primary-strong-cyan text-[2rem] tracking-[-0.04169rem] lg:text-[3rem]">
                  ${tipAmount.toFixed(2)}
                </p>
              </div>
              <div className="mb-[1.31rem] flex justify-between font-bold">
                <p className="text-white">
                  Total
                  <span className="text-neutral-grayish-cyan block text-[0.8125rem]">
                    / person
                  </span>
                </p>
                <p className="text-primary-strong-cyan text-[2rem] tracking-[-0.04169rem] lg:text-[3rem]">
                  ${tipTotal.toFixed(2)}
                </p>
              </div>
              <Button
                variant="cyan"
                size="lg"
                className="bg-primary-strong-cyan text-neutral-very-dark-cyan hover:bg-neutral-light-cyan mt-auto w-full text-xl uppercase leading-normal"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Reference />
    </main>
  )
}
