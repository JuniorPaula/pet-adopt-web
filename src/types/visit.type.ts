import { PetProps } from "./pet.type"

export interface VisitProps {
  id: number
  user_id: number
  date: string
  status: string
  pet: PetProps
}