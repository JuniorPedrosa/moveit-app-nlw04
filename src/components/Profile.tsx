import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const {level} = useContext(ChallengeContext);
  
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/juniorpedrosa.png" alt="Junior Pedrosa"/>
      <div>
        <strong>Junior Pedrosa</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
          </p>
      </div>
    </div>
  )
}