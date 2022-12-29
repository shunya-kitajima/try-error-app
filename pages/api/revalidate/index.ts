import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

type Msg = {
  message: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) => {
  let revalidated = false
  try {
    await res.revalidate('/dailies')
    revalidated = true
  } catch (err) {
    console.log(err)
  }
  res.status(200).json({ revalidated })
}

export default handler