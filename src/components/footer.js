import React from 'react';
import Button from './Button';
import { FaTelegram } from "react-icons/fa";
import { TfiGithub } from "react-icons/tfi";
import { SiGmail } from "react-icons/si";


export default class Footer extends React.Component {
    render () {
      return (
        <footer>

            <div className='content'>
                <p title="Frontend разработчик">Ганин Данил Константинович</p>
                <FaTelegram title="Телеграм" className='icon' onClick={ () => {window.open('https://t.me/isxs72hs', '_blank')}}/>
                <TfiGithub className='icon' title="Гитхаб" onClick={ () => {window.open('https://github.com/Vadim-Kulkov/Jimine', '_blank')}}/>
                <a title="Почта" href="mailto:92837465qwe10@gmail.com"><SiGmail className='icon'/></a>

                <p title="Backend разработчик">Кульков Вадим Дмитриевич</p>
                <FaTelegram title="Телеграм" className='icon' onClick={ () => {window.open('https://t.me/B8ph8m8t', '_blank')}}/>
                <TfiGithub title="Гитхаб" className='icon' onClick={ () => {window.open('https://github.com/Vadim-Kulkov/Jimine', '_blank')}}/>
                <a title="Почта" href="mailto:a+co-13cf9500183faf66-c29966480@a.kaiten.ru"><SiGmail className='icon'/></a>
                
            </div>
        </footer>
      )
    }
}
