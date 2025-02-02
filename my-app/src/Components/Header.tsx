import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../header.module.css'

const Header:React.FC = () => {
    const links = [
        {id: 1, page: 'Main Page', path:'/'},
        {id: 2, page: 'History', path:'/history'}
    ]
  return (
    <div className={styles.headerwrp}>
        {links.map(({id, page, path}) => (
            <div key={id} className={styles.header}>
                <Link to={path} className={styles.linkscontainer}>
                    <h2>{page}</h2>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Header
