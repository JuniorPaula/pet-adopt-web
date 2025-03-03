import { PetProps } from "./pet.type"
import { UserProps } from "./user.type"

export interface AdoptProps {
  id: number
  pet_id: number
  old_owner_id: number
  adopter_id: number
  adopt_date: string
  pet: PetProps
  old_owner: UserProps
  adopter: UserProps
}