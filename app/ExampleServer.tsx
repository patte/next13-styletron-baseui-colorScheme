import { Quote } from '@/ui/Quote'

export default async function ExampleServer() {
  const data = await fetch('https://dummyjson.com/quotes').then((res) =>
    res.json(),
  )

  return (
    <>
      <h1>Let's go server!</h1>
      <div>
        {data?.quotes?.slice(0, 4).map(({ quote, author }: any, i: number) => (
          <div key={`q${i}`} style={{ marginTop: '5px' }}>
            <Quote quote={quote} author={author} />
          </div>
        ))}
      </div>
    </>
  )
}
