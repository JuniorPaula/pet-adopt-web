import { UserProps } from "./user.type"

export interface PetProps {
  id: number
  user_id: number
  name: string
  age: number
  weight: number
  size: string
  color: string
  images: string[]
  available: boolean
  description: string
  owner: UserProps
}