import { Orders } from "../models/order.model";
import ApiResponse from "../utils/ApiResponse";

const fetchOrder = async (req, res) => {
  try {
    let data = req.body.orders;
    await data.splice(0, 0, { Order_date: req.body.order_date });
    const eid = await Orders.findOne({ email: req.body.email });
    if (!eid) {
      try {
        const userr = await Orders.create({
          email: req.body.email,
          orders: [data],
        });
        res
          .status(200)
          .json(
            new ApiResponse(
              200,
              "User with Orders created successfully!",
              userr
            )
          );
      } catch (e) {
        console.log("error from fetchOrder", e);
      }
    } else {
      try {
        await Orders.findOneAndUpdate(
          { email: req.body.email },
          {
            $push: { orders: [data] },
          }
        );
        res.status(200).json(new ApiResponse(200,"Found!"))
      } catch (error) {
        console.log("Error from fetchOrder2",error);
      }
    }
  } catch (err) {
    console.log("Error from fetchOrder",err);
  }
};

export default fetchOrder