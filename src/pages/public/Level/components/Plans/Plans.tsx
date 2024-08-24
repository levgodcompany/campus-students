import { useEffect, useState } from "react";
import style from "./plans.module.css";
import { PlaneDto } from "../../types/Level.types";
import LevelService from "../../service/Level.service";
import formateador from "../../../../../utilities/formateador";

interface PlanProps {
  idLevel: number;
}

const Plans: React.FC<PlanProps> = ({ idLevel }) => {
  const [plans, setPlans] = useState<PlaneDto[]>([]);

  useEffect(() => {
    fetchLevelPlanes();
  }, []);

  const fetchLevelPlanes = async () => {
    try {
      if (idLevel) {
        const service = LevelService.crud();
        service.setUrl(`/level/suscriptions/${Number(idLevel)}`);
        const res = await service.findAll<PlaneDto[]>();
        setPlans(res);
      }
    } catch (error) {
      console.error("Error fetching level data:", error);
    }
  };

  function calcularDescuento(
    precio: number,
    porcentajeDescuento: number
  ): number {
    const descuento = (precio * porcentajeDescuento) / 100;
    const nuevoPrecio = precio - descuento;
    return nuevoPrecio;
  }

  const renderAmount = (
    numInstallments: number,
    amount: number,
    discountPercentage: number
  ) => (
    <div className={style.containerAmount}>
      <div className={style.amountCuota}>
        <span>
          {numInstallments > 1 ? `${numInstallments} Cuotas` : "1 Pago de"}
        </span>
      </div>
      <div className={style.amount}>
        {discountPercentage > 0 ? (
          <div>
            <strong className={style.amountDisc}>
              {/* <img
                className={style.imgArg}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABQBAMAAABsc2MHAAAAIVBMVEVmzP///////wD/zMz/zJn/zDP/zADMmWbMmTPMmQDMZgDgyTvdAAAA4ElEQVR42u3WMRKCMBAFUK+A6KBlVifOptPKFmzwGKQA5QS2sbDfFIzaYaenVG9A8Wdo9h3gzyckm0yUUkoppUaUgA0OzMGBIQRgYJoHEQkHXEMRUxkRWGC/KI5clEkPCsyn+/rB3WmHajifGa7t2aznqE+2V++e5G8GFHjJmImYNwvBBKY2RiKK3QrTcNm0RMxErmFQw2lLb345n2Ialh0xefJM9p7DGv44nwLXkCJyDW2M7vP/y8B9aDvQPsSfFPxZxk8b/DzET+ws2VZSbTPwrTfavQymbzGllFJKDfcFPVK9l9NwEpYAAAAASUVORK5CYII="
                alt=""
              /> */}
              {formateador.format(
                calcularDescuento(amount, discountPercentage)
              )} ARS
            </strong>
            <p className={style.amountDiscTach}>
              {formateador.format(amount)} ARS
            </p>
          </div>
        ) : (
          <strong className={style.amountDisc}>
            {/* <img
              className={style.imgArg}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABQBAMAAABsc2MHAAAAIVBMVEVmzP///////wD/zMz/zJn/zDP/zADMmWbMmTPMmQDMZgDgyTvdAAAA4ElEQVR42u3WMRKCMBAFUK+A6KBlVifOptPKFmzwGKQA5QS2sbDfFIzaYaenVG9A8Wdo9h3gzyckm0yUUkoppUaUgA0OzMGBIQRgYJoHEQkHXEMRUxkRWGC/KI5clEkPCsyn+/rB3WmHajifGa7t2aznqE+2V++e5G8GFHjJmImYNwvBBKY2RiKK3QrTcNm0RMxErmFQw2lLb345n2Ialh0xefJM9p7DGv44nwLXkCJyDW2M7vP/y8B9aDvQPsSfFPxZxk8b/DzET+ws2VZSbTPwrTfavQymbzGllFJKDfcFPVK9l9NwEpYAAAAASUVORK5CYII="
              alt=""
            /> */}
            {formateador.format(amount)} ARS
          </strong>
        )}
      </div>
    </div>
  );

  const renderDiscount = (discountPercentage: number) => (
    <div className={style.containerDiscount}>
      <span className={style.discount}>{discountPercentage}% OFF🔥</span>
    </div>
  );

  return (
    <div className={style.plansContainer}>
      {plans.map((plan) => (
        <div key={plan.id} className={style.planCard}>
          {plan.discountPercentage > 0 &&
            renderDiscount(plan.discountPercentage)}
          <h3 className={style.planTitle}>{plan.title}</h3>
          {renderAmount(
            plan.numInstallments,
            Number(plan.amount),
            plan.discountPercentage
          )}
          <div className={style.planBenefits}>
            <ul>
              {plan.benefits.map((benefit) => (
                <li className={style.planBenefitsItem} key={benefit.id}>
                  {/* <aside>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#00a8e1"
                        fill-rule="evenodd"
                        d="M19.03 7.47a.75.75 0 0 1 0 1.06l-8 8a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.97 3.97 7.47-7.47a.75.75 0 0 1 1.06 0"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </aside> */}
                  <span className={style.planBenefitsItemPunt}>•</span>
                  <span>{benefit.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plans;
