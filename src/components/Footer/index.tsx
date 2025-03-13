import { useState } from 'react'
import styles from './index.module.scss'
import { Input } from '../ui/input'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted email:', email)
    setEmail('')
  }

  return (
    <footer className={`${styles.footer} bg-light-green`}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h2 className={styles.heading}>Nyhedsbrev</h2>
          <p className={styles.text}>
            Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og få de seneste klima opdateringer direkte i din indbakke.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} aria-label='Email for newsletter' required />
            <button type='submit' className={styles.button}>
              Tilmeld
            </button>
          </form>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>Kontakt</h2>
          <div className={styles.contact}>
            <p>Rødningen 32</p>
            <p>2210 Vinterby Øster</p>
            <p>+45 88229422</p>
            <p>
              <a href='mailto:dga@info.dk'>dga@info.dk</a>
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.heading}>FN's Verdensmål</h2>
          <p className={styles.text}>
            Vi støtter på organisatorisk plan op om FN's verdensmål og har derfor besluttet at en del af overskuddet går direkte til verdensmål nr. 13; Klimahandling
          </p>
          <a href='#' className={styles.link}>
            Læs mere om verdensmålene her
          </a>
        </div>
      </div>
    </footer>
  )
}
