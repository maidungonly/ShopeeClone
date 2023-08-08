import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { AppContext } from 'src/contexts/app.context'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { Schema, schema } from 'src/utils/rules'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])
export default function useSearchProduct() {
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate()

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}
