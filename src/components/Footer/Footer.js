import css from './Footer.module.css';

function Footer() {
  return (
    <div className={css['footer']}>&copy; {new Date().getFullYear()} All rights reserved.</div>
  );
}

export default Footer;
