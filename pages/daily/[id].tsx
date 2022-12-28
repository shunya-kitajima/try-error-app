import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { supabase } from '../../utils/supabase'

const getAllDailyIds = async () => {
  const { data: ids } = await supabase.from('dailies').select('id')
  return ids!.map((id) => {
    return {
      params: {
        id: String(id.id),
      },
    }
  })
}

const DailyPage: NextPage = () => {
  return <div></div>
}

export default DailyPage
