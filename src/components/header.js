import React from 'react';

class Header extends React.Component {
    render () {
      return (
        <div className='header'>
        <header>
            <img className='logo' src={this.props.image} alt='Лого'>
            </img>
        </header>
        </div>
      )
    }
  }

  export default Header