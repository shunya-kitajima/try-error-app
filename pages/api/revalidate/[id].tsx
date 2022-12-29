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
  const {
    query: { id },
  } = req
  let revalidated = false
  try {
    await res.revalidate(`/daily/${id}`)
    revalidated = true
  } catch (err) {
    console.log(err)
  }
  res.status(200).json({ revalidated })
}

export default handler
