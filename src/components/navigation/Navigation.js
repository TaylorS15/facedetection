import React, {useState} from 'react'
import './navigation.css'
import menu from './imgs/menu.svg'
import home from './imgs/home.svg'
import skills from './imgs/skills.svg'
import projects from './imgs/projects.svg'
import contact from './imgs/contact.svg'

const Navigation = ({page}) => {
    const [isOpen, setIsOpen] = useState(false)

    const [homeIsHovered, setHomeIsHovered] = useState(false);
    const [skillsIsHovered, setSkillsIsHovered] = useState(false);
    const [projectsIsHovered, setProjectsIsHovered] = useState(false);
    const [contactIsHovered, setContactIsHovered] = useState(false);
  
    return (
      <nav className='navbar inline float-right m-4 rounded-lg text-large'>
        <button className="menu-button fixed my-4 mx-[12vw] p-2 right-0 bg-pred rounded-lg" onClick={() => setIsOpen(!isOpen)}>
            <img className="w-10" src={menu} alt='menu' />
        </button>

        <ul className={`bg-pred rounded-lg my-[4.5rem] mx-0 fixed transition-all right-[-20rem] ${isOpen ? ' open' : ''}`}>
            <a href='#'>
                <li className={`list-item ${homeIsHovered ? 'active' : '' }`} 
                    onMouseEnter={() => setHomeIsHovered(true)} onMouseLeave={() => setHomeIsHovered(false)}>

                    <p className='text'>Home</p>
                    <img className='menu-icon' src={home} alt='home' />
                </li>
            </a>

            <a href='#'>
                <li className={`list-item ${skillsIsHovered ? 'active' : '' }`} 
                    onMouseEnter={() => setSkillsIsHovered(true)} onMouseLeave={() => setSkillsIsHovered(false)}>

                    <p className='text'>Skills</p>
                    <img className='menu-icon' src={skills} alt='home'/>
                </li>
            </a>
            <a href='#'>
                <li className={`list-item ${projectsIsHovered ? 'active' : '' }`} 
                    onMouseEnter={() => setProjectsIsHovered(true)} onMouseLeave={() => setProjectsIsHovered(false)}>

                    <p className='text'>Projects</p>
                    <img className='menu-icon' src={projects} alt='home' />
                </li>
            </a>
            <a href='#'>
                <li className={`list-item ${contactIsHovered ? 'active' : '' }`} 
                    onMouseEnter={() => setContactIsHovered(true)} onMouseLeave={() => setContactIsHovered(false)}>

                    <p className='text'>Contact</p>
                    <img className='menu-icon' src={contact} alt='home' />
                </li>
            </a>
        </ul>
      </nav>
    )
}

export default Navigation;