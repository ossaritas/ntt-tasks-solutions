import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getOffers } from "../store/task-slice";

import Task from "./Task";

const TaskOne = () => {
  const {
    offers: { case1 },
  } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers("case1"));
  }, [dispatch]);

  return (
    <div>
      {case1.offerList
        ? case1.offerList.map((item) => (
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
              discount={
                item.QuotaInfo.HasDiscount ? item.QuotaInfo.HasDiscount : false
              }
              dsPrice={item.QuotaInfo.PremiumWithDiscount}
              price={item.Cash}
              saleActive={item.SaleClosed}
            />
          ))
        : null}
    </div>
  );
};

export default TaskOne;
