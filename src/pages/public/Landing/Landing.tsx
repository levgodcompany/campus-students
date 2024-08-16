import styles from "./Landing.module.css";
import TypeLevelAndLevel from "./components/TypeLevelAndLevel/TypeLevelAndLevel";

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <TypeLevelAndLevel />
    </div>
  );
};

export default Landing;
