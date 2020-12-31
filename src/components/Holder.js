import React from 'react'

const quote = [
  {
    proverb: "live and let's live",
    author: "lekan"
  },
  {
    proverb: "Whatever the mind can conceive and believe the mind can achieve",
    author: "ola"
  },
  {
    proverb: "when you are poor, you want everything and when you have everything they want you to fall",
    author: "yusuf"
  },
  {
    proverb: "aim for the moon, you may hit the star",
    author: "Mrs bukola"
  },
  {
    proverb: "with great power comes great responsibility",
    author: "Mr peter"
  }
]
function Holder() {
 const [counter, setCounter] = React.useState(1)

  return (
    <>
    <center>
      <div>
        We are the great men
      </div>
      <div>Total quote: {quote.length}</div>
    </center>
    <hr/>
    <section style={{cursor: "pointer"}}
     onClick={()=>{setCounter(counter + 1)}}>
      <div>
        <h3>{quote[counter%quote.length].proverb}</h3>
        <p style={{display:"flex", justifyContent:"flex-end"}}><i>- {quote[counter%quote.length].author} -</i></p>
      </div>
    </section>
    </>
  )
}

export default Holder
