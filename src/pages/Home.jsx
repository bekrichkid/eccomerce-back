import React from 'react'
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
        <Link
            to="/login"
            className="btn btn-primary btn-wide flex items-center gap-2"
          >
            Sign In with Telegram
          </Link>
    </div>
  )
}

export default Home
