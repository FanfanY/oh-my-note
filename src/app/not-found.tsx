import Image from 'next/image'
import Link from 'next/link'
import styles from 'src/app/not-found.module.scss'

function Error() {
  return (
    <div>
      <div className={styles['stars']}>
        <div className={styles['custom-navbar']}>
          <div className={styles['brand-logo']}>
            <Image alt="" src="http://salehriaz.com/404Page/img/logo.svg" width={80} height={80} />
          </div>
        </div>
        <div className={styles['central-body']}>
          <Image
            alt=""
            className={styles['image-404']}
            src="http://salehriaz.com/404Page/img/404.svg"
            width={300}
            height={300}
          />
          <Link href="/" className={styles['btn-go-home']}>
            GO BACK HOME
          </Link>
        </div>
        <div className={styles['objects']}>
          <Image
            alt=""
            className={styles['object-rocket']}
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width={40}
            height={40}
          />
          <div className={styles['earth-moon']}>
            <Image
              alt=""
              className={styles['object-earth']}
              src="http://salehriaz.com/404Page/img/earth.svg"
              width={100}
              height={100}
            />
            <Image
              alt=""
              className={styles['object-moon']}
              src="http://salehriaz.com/404Page/img/moon.svg"
              width={80}
              height={80}
            />
          </div>
          <div className={styles['box-astronaut']}>
            <Image
              alt=""
              className={styles['object-astronaut']}
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width={140}
              height={140}
            />
          </div>
        </div>
        <div className={styles['glowing-stars']}>
          <div className={styles['star']}></div>
          <div className={styles['star']}></div>
          <div className={styles['star']}></div>
          <div className={styles['star']}></div>
          <div className={styles['star']}></div>
        </div>
      </div>
    </div>
  )
}

export default Error
