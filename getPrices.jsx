function App() {
    const [coinList, setCoinList] = React.useState([])
    const [price,setPrice] = React.useState([])

    React.useEffect(()=> {

        const fetchCoins = async () => {
            let result = await axios("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
            let list = (result.data).map((coin)=>{
                return coin.id
            })
            let prices = (result.data).map(coin => coin.current_price)
            console.log(result)
            setPrice(prices)
            setCoinList(list)
        }

       fetchCoins()

    },[])

    
    return (<CoinTable coinList={coinList} price={price}>
      </CoinTable>)
}


function CoinTable({coinList,price}) { 
    const {Table} = ReactBootstrap

    return (  <Table className="table table-dark table-hover table-striped">
       <thead>
       <tr>
         <th scope="col">Name</th>
         <th scope="col">Price($USD)</th>
       </tr>
     </thead>
     <tbody>
  { 
    coinList ? coinList.map((id, index) => {
      return (
        <tr key={index}>
          <td>{index+1}. {id}</td>
          <td>${price[index]}</td>
        </tr>
      )
    }) :  <tr><td colSpan="2">Loading...</td></tr>
  }
</tbody>

 </Table>
    )
}


ReactDOM.render(<App />, document.getElementById("root"));