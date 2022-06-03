import { useEffect } from "react";
import Task from "./Task";
import Loader from "../UI/Loader";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getOffers, getOfferCount } from "../store/task-slice";

const TaskThree = () => {
  const dispatch = useDispatch();
  const {
    offers: { case3 },
    offersCount,
  } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getOfferCount());
  }, [dispatch]);

  useEffect(() => {
    if (offersCount > 0) {
      const numArr = new Array(offersCount).fill(0);
      numArr.map(() => dispatch(getOffers("case3")));
    }
  }, [dispatch, offersCount]);

  return (
    <div>
      {case3.length !== offersCount ? (
        <Loader offerCount={offersCount - case3.length} />
      ) : null}
      {case3
        ? case3.map((item) => (
            <Task
              key={uuidv4()}
              img={item.ImagePath}
              firmName={item.FirmName}
              type={item.ProductDesc}
              description={
                item.popoverContent ? item.popoverContent[0].Description : false
              }
              explanation={
                item.popoverContent ? item.popoverContent[0].Title : ""
              }
              discount={item.QuotaInfo.HasDiscount}
              dsPrice={item.QuotaInfo.PremiumWithDiscount}
              price={item.Cash}
              saleActive={item.SaleClosed}
            />
          ))
        : null}
    </div>
  );
};

export default TaskThree;
