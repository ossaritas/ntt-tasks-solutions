import { useEffect } from "react";
import Task from "./Task";
import Loader from "../UI/Loader";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../store/task-slice";

const TaskTwo = () => {
  const {
    loading,
    offers: { case2 },
  } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers("case2"));
  }, [dispatch]);

  return (
    <div>
      {loading ? <Loader /> : null}
      {case2.offerList
        ? case2.offerList.map((item) => (
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

export default TaskTwo;
