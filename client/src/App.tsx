import { Link } from "react-router"
import { Button } from "./components/ui/button"

function App() {

  return (
    <>
      <Button size="lg" variant="default">
        <Link to="/game">Play a game</Link>
      </Button>
    </>
  )
}

export default App
