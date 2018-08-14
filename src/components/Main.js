import React from 'react'
import Link from 'gatsby-link'
  
class Main extends React.Component {
  render() {

    let close = <div className="close" onClick={() => {this.props.onCloseArticle()}}></div>

    return (
      <div id="main" style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>

        <article id="intro" className={`${this.props.article === 'intro' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Intro</h2>
          {/* <span className="image main"><img src={logo} alt="" /></span> */}
          <p>Welcome to Ethereal Technologies, a software house aiming to deliver the best results for all our clients. To see more about some of the open source work we have contributed find more info on our <a href="https://github.com/jackjefferies">Github</a>.</p>
          {close}
        </article>

        <article id="work" className={`${this.props.article === 'work' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Work</h2>
          {/* <span className="image main"><img src={logo} alt="" /></span> */}
          <p>At Ethereal Technologies we plan to exceed our customers expectations, delivering a high quality service, that will leave you no longer wanting to spend valuable time trying to find contractors you can rely on.</p>
          {close}
        </article>

        <article id="about" className={`${this.props.article === 'about' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">About</h2>
          {/* <span className="image main"><img src={logo} alt="" /></span> */}
          <p>At Ethereal Technologies, we work with our clients to reach goals that were once thought to be unachievable.</p>
          {close}
        </article>

        <article id="contact" className={`${this.props.article === 'contact' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{display:'none'}}>
          <h2 className="major">Contact</h2>
          <p>Feel free to contact us.</p>
          <ul className="icons">
          <li><a href="mailto:jack.h.jefferies+ethereal@gmail.com" className="icon fa-envelope"><span className="label">Email</span></a> Email </li>      
            {/* <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li> */}
            <li><a href="https://www.facebook.com/Ethereal-Technologies-2059245424332198/" className="icon fa-facebook"><span className="label">Facebook</span></a> Facebook </li>
            {/* <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li> */}
            <li><a href="https://github.com/jackjefferies" className="icon fa-github"><span className="label">GitHub</span></a> Github </li>
          </ul>
          {close}
        </article>

      </div>
    )
  }
}

Main.propTypes = {
  route: React.PropTypes.object,
  article: React.PropTypes.string,
  articleTimeout: React.PropTypes.bool,
  onCloseArticle: React.PropTypes.func,
  timeout: React.PropTypes.bool
}

export default Main