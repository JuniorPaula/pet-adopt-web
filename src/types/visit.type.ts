import { PetProps } from "./pet.type"
import { UserProps } from "./user.type"

export interface VisitProps {
  id: number
  user_id: number
  date: string
  status: string
  pet: PetProps
  user: UserProps
}