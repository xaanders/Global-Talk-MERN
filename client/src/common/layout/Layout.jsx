import React from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'

function Layout(props) {
  return (
    <React.Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </React.Fragment>

  )
}

export default Layout