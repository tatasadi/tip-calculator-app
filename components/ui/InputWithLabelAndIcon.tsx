import React from "react"
import Image from "next/image"
import { Input } from "./input"
import { Label } from "./label"

interface InputProps {
  type: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  label?: string
  iconSrc?: string
  iconAlt?: string
  className?: string
  placeholder?: string
  errors?: string[]
  showErrors?: boolean
}

const InputWithLabelAndIcon = ({
  type,
  value,
  onChange,
  name,
  label,
  iconSrc,
  iconAlt,
  className = "",
  placeholder = "",
  errors = [],
  showErrors = false,
}: InputProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        {label && (
          <Label
            htmlFor={name}
            className="text-neutral-dark-grayish-cyan mb-[0.38rem]"
          >
            {label}
          </Label>
        )}
        {showErrors && (errors?.length ?? 0) > 0 && (
          <p className="text-primary-red text-right">{errors?.[0] ?? ""}</p>
        )}
      </div>
      <div className="relative">
        <Input
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`bg-neutral-very-light-grayish-cyan placeholder:text-neutral-grayish-cyan text-neutral-very-dark-cyan hover:border-primary-strong-cyan focus:border-primary-strong-cyan cursor-pointer rounded-[0.3125rem] border-2 px-4 py-[0.38rem] text-right ring-0 ring-offset-0 hover:border-2 focus-visible:ring-transparent ${className} ${
            (errors?.length ?? 0) > 0
              ? "border-primary-red"
              : "border-transparent"
          }`}
        />
        <div className="absolute left-[1.2rem] top-[0.7rem]">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "Icon"}
              layout="responsive"
              width={16}
              height={16}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default InputWithLabelAndIcon
