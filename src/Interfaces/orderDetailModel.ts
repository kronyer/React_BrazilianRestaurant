import menuItemModel from "./menuItemModel";

export default interface orderDetailModel {
  orderDetailsId?: number;
  orderHeaderId?: number;
  menuItemId?: number;
  menuItem?: menuItemModel;
  quantity?: number;
  itemName?: string;
  price?: number;
}
