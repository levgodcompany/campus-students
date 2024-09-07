import { useAppSelector } from "../../../../../redux/hooks";
interface LevelProps {
  select: (levelTitle: string, idLevel: number, idCohort: number, cohortTitle: string | null) => void;
}
const Level: React.FC<LevelProps> = ({ select }) => {
  const studentState = useAppSelector((state) => state.student?.levels);

  const selectLevel = (
    levelTitle: string,
    idLevel: number,
    idCohort: number,
    cohortTitle: string | null
  ) => {
    select(levelTitle, idLevel, idCohort, cohortTitle);
  };

  const renderLevels = () => {
    if (studentState) {
      return (
        <div>
          {studentState.map((level) => (
            <div key={level.id}>
              {level.cohorts.length > 1 ? (
                <div>
                  <span>{level.title}</span>
                  {level.cohorts.map((c) => (
                    <div
                      onClick={() => selectLevel(level.title, level.id, c.id,c.title)}
                      key={c.id}
                    >
                      {c.title}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <span
                    onClick={() =>
                      selectLevel(level.title, level.id, level.cohorts[0].id, null)
                    }
                  >
                    {level.title}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
    return <></>;
  };

  return <div>{renderLevels()}</div>;
};

export default Level;
