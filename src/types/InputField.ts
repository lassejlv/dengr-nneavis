import { InputHTMLAttributes, JSX } from 'react'

export interface InputField extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  jsx?: () => JSX.Element
}
