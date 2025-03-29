type DetailsProps = {
  id: number
  user_id: number
  phone: string
  address: string
  city: string
  province: string
  zip_code: string
}

export interface UserProps {
  id: number
  email: string
  first_name: string
  last_name: string
  is_admin: boolean
  details: DetailsProps
}